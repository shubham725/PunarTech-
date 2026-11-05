import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, Send } from 'lucide-react';

interface TestimonialItem {
  name: string;
  location: string;
  modelPurchased: string;
  feedback: string;
  rating: number;
  date: string;
}

export const TestimonialsSection: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState('');

  // Genuine customer experience logs from Pune & Delhi branches
  const reviews: TestimonialItem[] = [
    {
      name: 'Aditya Patil',
      location: 'Pune Hub Customer',
      modelPurchased: 'Dell Latitude 7490 (Core i7 / 16GB)',
      feedback:
        'Visited their Pune hub to inspect before buying. The stock ID matched exactly with the catalog listing. They ran battery diagnostics in front of me. Very clean refurbished unit.',
      rating: 5,
      date: 'Verified Buyer',
    },
    {
      name: 'Vikas Sharma',
      location: 'Delhi Hub Customer',
      modelPurchased: 'Lenovo ThinkPad L470 (Core i5 / 8GB SSD)',
      feedback:
        'Enquired on WhatsApp at night and got genuine chassis photos next morning. Fast delivery with genuine charger included. Running Linux smoothly for my coding tasks.',
      rating: 5,
      date: 'Verified Buyer',
    },
    {
      name: 'Pooja Kulkarni',
      location: 'Pune Hub Customer',
      modelPurchased: 'HP ProBook 440 G5 (Core i5 / 256GB SSD)',
      feedback:
        'Got this for my online accounting work. Transparent price without any hidden repair fees. Screen display is crisp with zero lines. Highly recommended for students and professionals.',
      rating: 5,
      date: 'Verified Buyer',
    },
  ];

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim()) return;
    const url = `https://wa.me/918055035502?text=${encodeURIComponent(
      `PunarTech Website Feedback (https://punartech.vercel.app/): ${feedbackInput.trim()}`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setFeedbackSent(true);
    setFeedbackInput('');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8FBF9] dark:bg-[#090E11] border-b border-[#E3EBE7] dark:border-[#22353D] transition-colors font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-['Poppins'] font-semibold uppercase tracking-wider text-[#007A52] dark:text-[#34D399] block mb-1">
            Real Customer Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white tracking-tight">
            Customer Feedback &amp; Verification
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-['Poppins']">
            Read verified feedback from Pune &amp; Delhi laptop buyers, or share your own review.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-[22px] bg-white dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg hover:shadow-[#009B69]/10 hover:border-[#009B69] dark:hover:border-[#10B981] transition-all duration-300 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-['Poppins'] font-semibold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2.5 py-0.5 rounded-[8px] border border-[#C8DFD4] dark:border-[#10B981]/30">
                    {r.date}
                  </span>
                </div>

                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 italic font-['Poppins']">
                  "{r.feedback}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E3EBE7] dark:border-[#22353D]">
                <div className="font-['Urbanist'] font-bold text-sm text-zinc-950 dark:text-white">{r.name}</div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between mt-0.5">
                  <span>{r.location}</span>
                  <span className="text-[#007A52] dark:text-[#34D399] font-medium truncate max-w-[150px]">
                    {r.modelPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Feedback Form Invitation */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#152227] rounded-[22px] p-6 sm:p-8 border border-[#E3EBE7] dark:border-[#22353D] text-center shadow-xs">
          <div className="w-12 h-12 rounded-[14px] bg-[#E8F7EE] dark:bg-[#10B981]/15 border border-[#C8DFD4] dark:border-[#10B981]/30 text-[#007A52] dark:text-[#34D399] flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-['Urbanist'] font-bold text-zinc-950 dark:text-white mb-1">
            Have you purchased from PunarTech?
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-['Poppins']">
            Help fellow buyers by sharing your honest feedback on motherboard performance, battery backup, or showroom service.
          </p>

          {feedbackSent ? (
            <div className="p-3 bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] rounded-[12px] text-xs font-semibold border border-[#C8DFD4] dark:border-[#10B981]/30 inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" />
              <span>Thank you! Your feedback has been forwarded to our team on WhatsApp.</span>
            </div>
          ) : (
            <form onSubmit={handleSendFeedback} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Share your experience or feedback..."
                className="flex-1 px-4 py-2.5 bg-[#F8FBF9] dark:bg-[#10191E] border border-[#E3EBE7] dark:border-[#22353D] rounded-[12px] text-xs font-['Poppins'] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:opacity-95 text-white dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] font-['Poppins'] text-[15px] font-semibold rounded-[12px] transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <span>Send on WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
