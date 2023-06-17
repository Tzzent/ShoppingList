'use client';

interface AsideMainProps {
  children: React.ReactNode,
}

export default function AsideMain({
  children,
}: AsideMainProps) {
  return (
    <div
      className="
      flex-1 
      overflow-y-auto
      scrollbar
      scrollbar-w-[0.3rem]
      scrollbar-h-[0.3rem]
      scrollbar-thumb-[#F9A109]
      scrollbar-thumb-rounded-xl
      scrollbar-track-slate-500/[0.30]
      scrollbar-track-rounded-xl
      "
    >
      {children}
    </div>
  )
}
