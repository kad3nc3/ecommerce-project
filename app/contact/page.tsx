"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const socialLinks = [
  { name: "Instagram", handle: "@archives.apparel", description: "Quick questions about products, sizing, availability, and orders.", href: "https://www.instagram.com/archives.apparel/?hl=en" },
  { name: "Facebook", handle: "Archives Apparel", description: "Order support, delivery questions, and payment verification.", href: "https://www.facebook.com/archives.apparel/" },
  { name: "TikTok", handle: "@archivesclothing", description: "Latest drops, styling clips, and behind-the-scenes updates.", href: "https://www.tiktok.com/@archivesclothing" },
];

const initialForm = { name: "", email: "", phone: "", topic: "", message: "" };
const contactEmail = "ossaslego@gmail.com";

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `${form.topic.trim()} from ${form.name.trim()}`;
    const body = [`Name: ${form.name.trim()}`, `Email: ${form.email.trim()}`, `Contact number: ${form.phone.trim()}`, `Topic: ${form.topic.trim()}`, "", form.message.trim()].join("\n");
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f6f1] px-5 py-5 text-[#171b2e] sm:px-12 sm:py-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-.5px]"><span className="brand-icon grid h-7 w-7 place-items-center rounded-[10px]" />archives</Link>
        <Link href="/" className="text-xs text-[#777c91] transition-colors hover:text-[#171b2e]">← Back home</Link>
      </header>

      <section className="mx-auto max-w-6xl py-20 sm:py-28">
        <div data-reveal className="reveal grid gap-8 sm:grid-cols-[1fr_.8fr] sm:items-end">
          <div><p className="mb-5 text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">CONTACT / ARCHIVES</p><h1 className="text-6xl font-semibold leading-[.92] tracking-[-4px] sm:text-8xl">Start a<br /><em className="font-serif font-medium">conversation.</em></h1></div>
          <p className="max-w-md text-sm leading-7 text-[#777c91]">Have a question about a piece or an existing order? Send us a note and our team will get back to you as soon as we can.</p>
        </div>

        <div data-reveal className="reveal mt-16 grid gap-8 sm:grid-cols-[.78fr_1.22fr]" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
          <aside className="rounded-[24px] bg-[#171b2e] p-7 text-white sm:p-9"><p className="text-[10px] font-bold uppercase tracking-[1.8px] text-white/50">WE ARE HERE TO HELP</p><h2 className="mt-4 max-w-xs text-3xl font-semibold leading-tight tracking-[-1.5px]">Good questions make better pieces.</h2><p className="mt-5 text-sm leading-7 text-white/65">For order support, include your order details and contact number so we can find the right thread quickly.</p><div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/80"><p className="text-[10px] uppercase tracking-[1.5px] text-white/45">REPLY WINDOW</p><p className="mt-2">Monday to Friday, 9:00 AM to 6:00 PM</p></div></aside>

          <form onSubmit={handleSubmit} className="rounded-[24px] border border-[#1e2341]/10 bg-white/70 p-7 shadow-[0_15px_40px_rgba(49,58,101,.05)] sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-xs font-medium">Name <span className="text-[#9b4a42]">*</span><input required maxLength={80} placeholder=" " value={form.name} onChange={(event) => updateField("name", event.target.value)} className="contact-input" name="name" autoComplete="name" /></label>
              <label className="block text-xs font-medium">Email <span className="text-[#9b4a42]">*</span><input required type="email" maxLength={254} placeholder=" " value={form.email} onChange={(event) => updateField("email", event.target.value)} className="contact-input" name="email" autoComplete="email" /></label>
              <label className="block text-xs font-medium">Contact number <span className="text-[#9b4a42]">*</span><input required type="tel" inputMode="tel" maxLength={20} pattern="[0-9+()\-\s]{7,20}" title="Enter a valid contact number" placeholder=" " value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="contact-input" name="phone" autoComplete="tel" /></label>
              <label className="block text-xs font-medium">What can we help with? <span className="text-[#9b4a42]">*</span><select required value={form.topic} onChange={(event) => updateField("topic", event.target.value)} className="contact-input" name="topic"><option value="" disabled>Select a topic</option><option>Order support</option><option>Product question</option><option>Sizing and fit</option><option>Partnership</option><option>Something else</option></select></label>
            </div>
            <label className="mt-5 block text-xs font-medium">Message <span className="text-[#9b4a42]">*</span><textarea required minLength={10} maxLength={2000} value={form.message} onChange={(event) => updateField("message", event.target.value)} className="contact-input min-h-[140px] resize-y" name="message" placeholder="Tell us a little about what you need..." /></label>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-[11px] text-[#8a8e9e]">Fields marked * are required.</p><button type="submit" className="liquid-button rounded-[14px] px-6 py-4 text-xs font-semibold transition duration-300 hover:-translate-y-0.5 active:translate-y-0">Send message</button></div>
            {submitted && <p role="status" className="mt-5 rounded-[14px] bg-[#e4eee1] px-4 py-3 text-sm text-[#36553c]">Thanks, {form.name.split(" ")[0] || "there"}. Your message is ready for the Archives team.</p>}
          </form>
        </div>

        <div data-reveal className="reveal mt-5 grid gap-5 sm:grid-cols-3" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
          {socialLinks.map((social, index) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="group rounded-[24px] border border-[#1e2341]/10 bg-white/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#1e2341]/25 hover:bg-white"><div className="flex items-start justify-between"><span className="font-serif text-sm text-[#9da3d8]">0{index + 1}</span></div><h2 className="mt-10 text-2xl font-semibold tracking-[-1.2px]">{social.name}</h2><p className="mt-2 text-sm font-medium text-[#4f5466]">{social.handle}</p><p className="mt-4 text-sm leading-7 text-[#777c91]">{social.description}</p></a>)}
        </div>
      </section>
    </main>
  );
}
