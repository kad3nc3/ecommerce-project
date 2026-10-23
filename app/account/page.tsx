"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Account = { name: string; email: string; passwordHash: string };
type Session = Pick<Account, "name" | "email">;

const accountsKey = "archives-customer-accounts";
const sessionKey = "archives-customer-session";

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

async function hashPassword(password: string) {
  const bytes = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [session, setSession] = useState<Session | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => setSession(readJson<Session | null>(sessionKey, null)), []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readJson<Account[]>(accountsKey, []);

    if (password.length < 6) {
      setMessage("Use at least 6 characters for your password.");
      return;
    }

    const passwordHash = await hashPassword(password);
    if (mode === "create") {
      if (!name.trim()) {
        setMessage("Please enter your name.");
        return;
      }
      if (accounts.some((account) => account.email === normalizedEmail)) {
        setMessage("An account with this email already exists.");
        return;
      }
      const account = { name: name.trim(), email: normalizedEmail, passwordHash };
      window.localStorage.setItem(accountsKey, JSON.stringify([...accounts, account]));
      const nextSession = { name: account.name, email: account.email };
      window.localStorage.setItem(sessionKey, JSON.stringify(nextSession));
      setSession(nextSession);
      return;
    }

    const account = accounts.find((item) => item.email === normalizedEmail && item.passwordHash === passwordHash);
    if (!account) {
      setMessage("Email or password does not match.");
      return;
    }
    const nextSession = { name: account.name, email: account.email };
    window.localStorage.setItem(sessionKey, JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const signOut = () => {
    window.localStorage.removeItem(sessionKey);
    setSession(null);
    setPassword("");
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#f7f6f1] px-5 py-5 text-[#171b2e] sm:px-12 sm:py-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-.5px]"><span className="brand-icon grid h-7 w-7 place-items-center rounded-[10px]" />archives</Link>
        <Link href="/" className="text-xs text-[#777c91] transition-colors hover:text-[#171b2e]">← Back home</Link>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 py-20 sm:grid-cols-[.9fr_1.1fr] sm:items-center sm:gap-24 sm:py-28">
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">CUSTOMER / ARCHIVES</p>
          <h1 className="text-6xl font-semibold leading-[.92] tracking-[-4px] sm:text-8xl">Your<br /><em className="font-serif font-medium">account.</em></h1>
          <p className="mt-7 max-w-sm text-sm leading-7 text-[#777c91]">Keep your details in one place and return to your collection whenever you like.</p>
        </div>

        <div className="rounded-[26px] border border-[#1e2341]/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(49,58,101,.08)] sm:p-9">
          {session ? (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">SIGNED IN</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-2px]">Welcome, {session.name}.</h2>
              <p className="mt-3 text-sm text-[#777c91]">{session.email}</p>
              <div className="mt-10 flex flex-wrap gap-3"><Link href="/#shop" className="rounded-[14px] bg-[#171b2e] px-5 py-3.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#303653]">Continue shopping</Link><button type="button" onClick={signOut} className="rounded-[14px] border border-[#1e2341]/15 px-5 py-3.5 text-xs font-semibold transition hover:border-[#171b2e]/35">Sign out</button></div>
            </div>
          ) : (
            <>
              <div className="account-tabs mb-8 grid grid-cols-2 rounded-[14px] p-1 text-xs"><button type="button" onClick={() => { setMode("signin"); setMessage(""); }} className={`account-tab rounded-[11px] px-4 py-3 transition ${mode === "signin" ? "account-tab-active font-semibold" : ""}`}>Sign in</button><button type="button" onClick={() => { setMode("create"); setMessage(""); }} className={`account-tab rounded-[11px] px-4 py-3 transition ${mode === "create" ? "account-tab-active font-semibold" : ""}`}>Create account</button></div>
              <form onSubmit={submit} className="space-y-4">
                {mode === "create" && <label className="block text-xs font-medium">Name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="account-input mt-2 w-full rounded-[14px] px-4 py-3.5 text-sm outline-none transition" placeholder="Your name" /></label>}
                <label className="block text-xs font-medium">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="account-input mt-2 w-full rounded-[14px] px-4 py-3.5 text-sm outline-none transition" placeholder="you@example.com" /></label>
                <label className="block text-xs font-medium">Password<input required type="password" minLength={6} autoComplete={mode === "create" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} className="account-input mt-2 w-full rounded-[14px] px-4 py-3.5 text-sm outline-none transition" placeholder="At least 6 characters" /></label>
                {message && <p role="alert" className="account-message rounded-[12px] px-4 py-3 text-xs">{message}</p>}
                <button type="submit" className="liquid-button w-full rounded-[14px] px-5 py-4 text-xs font-semibold transition hover:-translate-y-0.5">{mode === "signin" ? "Sign in" : "Create account"}</button>
              </form>
              <p className="mt-5 text-center text-[10px] leading-5 text-[#9699a4]">Prototype account stored only in this browser. No raw password is saved.</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
