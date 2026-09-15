export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-amber-800/70 mb-2">
        Get in touch
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-8">
        Contact
      </h1>

      <div className="text-stone-700 leading-relaxed space-y-4 text-[15px] md:text-base">
        <p>
          Adhyatma is built and maintained by one person. If you have questions,
          feedback, or just want to say hello, feel free to reach out directly.
        </p>

        <div className="bg-[#FAF7F2] border border-stone-200 rounded-2xl p-6 mt-6">
          <p className="text-sm text-stone-500 mb-1">Name</p>
          <p className="text-lg font-bold text-amber-900 mb-4">Srijan Jha</p>

          <p className="text-sm text-stone-500 mb-1">Email</p>

          <a
            href="mailto:srijan1636@gmail.com"
            className="text-lg font-medium text-amber-800 hover:underline"
          >
            srijan1636@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
