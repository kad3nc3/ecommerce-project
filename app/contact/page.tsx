import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@archives.apparel",
    description: "Best for quick questions about products, sizing, availability, and orders.",
    href: "https://www.instagram.com/archives.apparel/?hl=en",
  },
  {
    name: "Facebook",
    handle: "Archives Apparel",
    description: "Message our official page for order support, delivery questions, and payment verification.",
    href: "https://www.facebook.com/archives.apparel/",
  },
  {
    name: "TikTok",
    handle: "@archivesclothing",
    description: "Follow our latest drops, styling clips, and behind-the-scenes updates.",
    href: "https://www.tiktok.com/@archivesclothing",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] px-5 py-5 text-[#171b2e] sm:px-12 sm:py-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-.5px]">
          <span className="brand-icon grid h-7 w-7 place-items-center rounded-[10px]" />
          archives<span className="font-normal text-[#9da1af]">/store</span>
        </Link>
        <Link href="/" className="text-xs text-[#777c91] transition-colors hover:text-[#171b2e]">← Back home</Link>
      </header>

      <section className="mx-auto max-w-6xl py-20 sm:py-28">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">CONTACT / ARCHIVES</p>
        <div className="grid gap-8 sm:grid-cols-[1fr_.8fr] sm:items-end">
          <h1 className="text-6xl font-semibold leading-[.92] tracking-[-4px] sm:text-8xl">Start a<br /><em className="font-serif font-medium">conversation.</em></h1>
          <p className="max-w-md text-sm leading-7 text-[#777c91]">Questions about a piece or an existing order? Reach us through either official account below. We’ll reply as soon as we can.</p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {socialLinks.map((social, index) => (
            <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="group rounded-[24px] border border-[#1e2341]/10 bg-white/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#1e2341]/25 hover:bg-white sm:p-9">
              <div className="flex items-start justify-between"><span className="font-serif text-sm text-[#9da3d8]">0{index + 1}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-[#1e2341]/15 transition group-hover:bg-[#171b2e] group-hover:text-white">↗</span></div>
              <h2 className="mt-12 text-3xl font-semibold tracking-[-1.5px]">{social.name}</h2>
              <p className="mt-2 text-sm font-medium text-[#4f5466]">{social.handle}</p>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#777c91]">{social.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-5 grid gap-8 rounded-[24px] bg-[#171b2e] px-7 py-9 text-white sm:grid-cols-[.7fr_1.3fr] sm:px-10">
          <div><p className="text-[10px] font-bold uppercase tracking-[1.8px] text-white/50">ORDER SUPPORT</p><h2 className="mt-3 text-3xl font-semibold tracking-[-1.5px]">Help us find it faster.</h2></div>
          <div><p className="text-sm leading-7 text-white/65">When messaging about an order, include:</p><ul className="mt-4 grid gap-2 text-sm text-white/90 sm:grid-cols-2"><li>Item and size</li><li>Full name</li><li>Contact number</li><li>Order details or location pin</li></ul><Link href="/faq" className="mt-7 inline-flex text-xs font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white">Read the FAQ</Link></div>
        </div>
      </section>
    </main>
  );
}
