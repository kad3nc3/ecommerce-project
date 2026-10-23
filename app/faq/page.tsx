import Link from "next/link";

const questions = [
  {
    question: "How do Archives pieces fit?",
    answer: "Most pieces have a relaxed, everyday fit. Choose your usual size for the intended shape, size down for a closer fit, or size up for a more oversized look.",
  },
  {
    question: "What sizes are available?",
    answer: "Our apparel is currently offered from S to 2XL. Available sizes appear on each product page and must be selected before adding an item to your cart.",
  },
  {
    question: "How should I care for my clothes?",
    answer: "Wash cold with similar colors, turn printed pieces inside out, and use a gentle cycle. Air drying is best for preserving the fabric, fit, and artwork.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Same-day delivery may be arranged depending on stock and rider availability. Choose your item and size, then message us on Instagram or Facebook with your order, name, contact number, and pinned drop-off location. Once payment is verified, we can coordinate a local rider.",
  },
  {
    question: "How long does delivery take?",
    answer: "Metro Manila deliveries usually take 1–3 business days, while provincial deliveries usually take 3–5 business days after dispatch. Timing can vary by courier and location.",
  },
  {
    question: "Where should I send proof of payment?",
    answer: "Send your proof of payment through our official Instagram or Facebook account. Keep it in the same message thread as your name and order details so we can verify it quickly.",
  },
  {
    question: "How will I know my order went through?",
    answer: "Use an active email address and phone number at checkout so you can receive confirmation and order updates. If no confirmation arrives, message us on Instagram or Facebook with your name and order details.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Message us before placing an international order. We will confirm availability and provide a shipping quote based on the destination and total parcel weight.",
  },
  {
    question: "Can I change, cancel, return, or exchange an order?",
    answer: "Contact us as soon as possible with your order details and request. We will confirm what is still possible based on the order status and guide you through the next steps.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] px-5 py-5 text-[#171b2e] sm:px-12 sm:py-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-.5px]">
          <span className="brand-icon grid h-7 w-7 place-items-center rounded-[10px]" />
          archives
        </Link>
        <Link href="/" className="text-xs text-[#777c91] transition-colors hover:text-[#171b2e]">← Back home</Link>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 py-20 sm:grid-cols-[.75fr_1.25fr] sm:gap-20 sm:py-28">
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">HELP / ARCHIVES</p>
          <h1 className="text-6xl font-semibold tracking-[-4px] sm:text-7xl">Questions,<br /><em className="font-serif font-medium">answered.</em></h1>
          <p className="mt-7 max-w-sm text-sm leading-7 text-[#777c91]">Everything you need to know about fit, care, shipping, and orders.</p>
        </div>

        <div className="border-t border-[#1e2341]/10">
          {questions.map((item, index) => (
            <details key={item.question} className="group border-b border-[#1e2341]/10 py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium marker:hidden">
                <span><span className="mr-4 font-serif text-sm text-[#9da3d8]">{String(index + 1).padStart(2, "0")}</span>{item.question}</span>
                <span className="text-xl font-light text-[#8a8e9e] transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-6 pl-10 pr-10 text-sm leading-7 text-[#777c91]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-8 flex max-w-6xl flex-col gap-5 rounded-[24px] bg-[#171b2e] px-7 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div><p className="text-[10px] font-bold uppercase tracking-[1.8px] text-white/50">STILL NEED HELP?</p><h2 className="mt-2 text-2xl font-semibold tracking-[-1px]">Talk to Archives.</h2></div>
        <Link href="/contact" className="liquid-button w-fit rounded-[14px] px-5 py-3 text-xs font-semibold transition hover:-translate-y-0.5">Contact us</Link>
      </section>
    </main>
  );
}
