'use client';

export interface PercentageBarProps {
  label: string,
  value: number | null,
  maxValue: number,
  color: string,
}

export default function PercentageBar({
  label,
  value = 1,
  maxValue,
  color = '#000000',
}: PercentageBarProps) {

  const calculatePercentage = (value: number) => {
    const percentage = (value / maxValue) * 100;
    return percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(1);
  };

  return (
    <div>
      <div
        className="
        flex 
        items-center
        justify-between
        gap-5
        mb-2
        "
      >
        <span
          className="
          text-base
          font-semibold
          w-full
          truncate
          "
        >
          {label}
        </span>
        <span
          className="
          font-bold
          text-lg
          "
        >
          {calculatePercentage(value!)}%
        </span>
      </div>
      <div
        className="
        bg-[#E0E0E0] 
        w-full 
        rounded-full 
        h-2
        "
      >
        <span className="sr-only">ProgressTrack</span>
        <div
          className="
          h-2 
          rounded-full 
          "
          style={{
            width: `${calculatePercentage(value!)}%`,
            backgroundColor: color,
          }}
        >
          <span className="sr-only">ProgressThumb</span>
        </div>
      </div>
    </div>
  )
}
