import { ReactNode, useState } from "react";
import { cn } from "../../lib/utils";

interface BentoCardProps {
  className?: string;
  title?: string;
  description?: string;
  header?: ReactNode;
  icon?: ReactNode;
  image?: string;
  imageAlt?: string;
  size?: "default" | "wide" | "tall" | "large";
  gradient?: string;
  children?: ReactNode;
}

const sizeClasses = {
  default: "col-span-1 row-span-1",
  wide: "col-span-1 md:col-span-2 row-span-1",
  tall: "col-span-1 row-span-1 md:row-span-2",
  large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
};

export const BentoCard = ({
  className,
  title,
  description,
  header,
  icon,
  image,
  imageAlt,
  size = "default",
  gradient = "from-[#0d7ff2]/10 via-purple-500/5 to-pink-500/5",
  children,
}: BentoCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br",
        gradient,
        "p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl",
        sizeClasses[size],
        className
      )}
    >
      {/* Background Image */}
      {image && !imageError && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title || ""}
            className="h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-80"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        {header || (
          <div className="mb-4 flex items-start justify-between">
            {icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
                {icon}
              </div>
            )}
          </div>
        )}

        {/* Title and Description */}
        {(title || description) && (
          <div className="flex-1 relative">
            {/* Полупрозрачный фон для лучшей читаемости */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-transparent rounded-xl -m-2" />
            <div className="relative z-10">
              {title && (
                <h3 className="mb-2 text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm leading-relaxed text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] group-hover:text-white/95">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Children */}
        {children}
      </div>

      {/* Shine effect */}
      <div className="pointer-events-none absolute inset-0 -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[200%] group-hover:opacity-100" />
    </div>
  );
};

