function FAQ() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our products, add items to your cart, and proceed to checkout. You can pay using various methods including credit/debit cards, UPI, and net banking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, UPI payments, net banking, and popular digital wallets. All payments are processed securely through encrypted channels."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-7 business days depending on your location. Express delivery (1-2 days) is available in major cities. You'll receive a tracking number once your order is shipped."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy. Items must be unused, in original condition with tags attached. Return shipping is free for defective items."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order in the 'My Orders' section of your account."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We're working on expanding to international markets soon. Stay tuned for updates!"
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via phone at +91 98765 43210, email at support@vinora.com, or use our live chat feature. We're available Mon-Sat, 9 AM to 7 PM."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement if they haven't been processed. Contact our support team immediately for assistance."
    },
    {
      question: "Do you have physical stores?",
      answer: "Yes, we have a flagship store in Mumbai at 123 Fashion Street. We're planning to expand to other cities soon."
    },
    {
      question: "How do I find my size?",
      answer: "Check our detailed size guide available on each product page. If you're unsure, our customer support team can help you choose the right size."
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f2' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-amber-700/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-amber-200/50 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-bold text-amber-900 mb-3 tracking-tight">
                  {faq.question}
                </h3>
                <p className="text-amber-700/85 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 pt-8 border-t border-amber-200/50 text-center">
            <h3 className="text-xl font-bold text-amber-900 mb-4">Still have questions?</h3>
            <p className="text-amber-700/85 mb-6 font-medium">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                Contact Support
              </a>
              <a
                href="tel:+919876543210"
                className="bg-white/80 text-amber-800 font-bold py-3 px-8 rounded-xl border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300 hover:scale-105"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
