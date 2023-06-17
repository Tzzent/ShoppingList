'use client';

interface TitleProps {
  label?: string,
  children?: React.ReactNode,
}

export default function Title({
  label,
  children,
}: TitleProps) {
  return (
    <div
      className="
      text-[#34333A] 
      font-bold
      text-2xl
      mb-5
      "
    >
      {label || children}
    </div>
  )
}
