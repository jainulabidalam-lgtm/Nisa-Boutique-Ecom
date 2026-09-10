import React from "react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#111111] text-[#c6a15b] border-b border-[#222222] py-2 px-4 text-center text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.18em] uppercase">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c6a15b] opacity-75"></span>
        <span>Physical Boutique Since 2008 &bull; Bespoke Fitting Inquiries via WhatsApp</span>
        <span className="hidden md:inline-block text-[#666666]">&bull;</span>
      </div>
    </div>
  );
}
