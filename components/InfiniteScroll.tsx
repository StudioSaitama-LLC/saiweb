import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const items = [
  { ja: "サイ", en: "Rhino" },
  { ja: "再", en: "Rebirth" },
  { ja: "差異", en: "Difference" },
  { ja: "彩", en: "Enrich" },
  { ja: "祭", en: "Frenzy" },
  { ja: "宰", en: "Ownership" },
  { ja: "砕", en: "Breakthrough" },
  { ja: "SAI", en: "S＋AI" },
  { ja: "細", en: "Detail" },
  { ja: "才", en: "Talent" },
  { ja: "最", en: "Top" },
]

export function InfiniteScroll() {
  const isMobile = useIsMobile()

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-12">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll {
          animation: scroll 8s linear infinite;
          width: calc(100% * 3);
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 5s linear infinite;
          }
          .mobile-tight-space {
            margin-left: 10rem;
            margin-right: 10rem;
          }
        }
      `}</style>
      <div className="flex animate-scroll items-center whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${isMobile ? 'mobile-tight-space' : 'mx-20'}`}
          >
            <span className={`${isMobile ? "text-[3.5rem]" : "text-[120px]"} font-bold text-[#3B82F6]`}>
              {item.ja}
            </span>
            <span className={`${isMobile ? "text-lg" : "text-[24px]"} mt-1 text-[#3B82F6] font-bold`}>
              {item.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 