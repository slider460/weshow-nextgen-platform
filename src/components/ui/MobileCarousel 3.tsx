import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"
import { cn } from "../../lib/utils"

interface MobileCarouselProps {
  children: React.ReactNode[]
  className?: string
  showOnMobile?: boolean
  showOnDesktop?: boolean
  itemsPerSlide?: number
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  className,
  showOnMobile = true,
  showOnDesktop = false,
  itemsPerSlide = 1
}) => {
  return (
    <div className={cn(
      "w-full",
      showOnMobile ? "block md:hidden" : "hidden",
      showOnDesktop ? "md:block" : "",
      className
    )}>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {children.map((child, index) => (
            <CarouselItem key={index} className={`pl-2 md:pl-4 basis-${itemsPerSlide === 1 ? 'full' : `${100/itemsPerSlide}%`}`}>
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
}

export default MobileCarousel
