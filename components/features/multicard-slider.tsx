import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.min.css"
import Link from "next/link"
import { MoveLeft, MoveRight } from "lucide-react"

interface MultiCardSliderProps {
  data: null | any[]
  cardComponent: React.ComponentType<any>
  seeAllLink?: string
  showButtons?: boolean
  heading: string
  subHeading?: string
  responsiveness?: {
    [key: number]: {
      spaceBetween: number
      slidesPerView: number
    }
  }
}

const MultiCardSlider: React.FC<MultiCardSliderProps> = ({
  data,
  cardComponent: CardComponent,
  showButtons = true,
  seeAllLink,
  heading,
  subHeading,
  responsiveness,
}) => {
  const swiperRef = React.useRef<any>(null)

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  return (
    <div className="relative mb-6 mt-4 w-full max-w-full">
      <div className="my-5 flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <div className="text-lg font-semibold text-[#2B2D42] dark:text-white ">
            {heading}
          </div>
          <div className="text-xs  font-normal text-[#6A7381] dark:text-[#D7DBE0] ">
            {subHeading}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {seeAllLink && (
            <span className="mr-4 cursor-pointer text-sm text-primary-foreground hover:underline min-w-max">
              <Link href={seeAllLink}>See all</Link>
            </span>
          )}
          {showButtons && (
            <div className="flex items-center">
              <div
                className="swiper-button-prev mr-2 grid cursor-pointer rounded-lg border border-[#EFEFEF] p-[7px] dark:border-[#2D374E]"
                onClick={goPrev}
              >
                <MoveLeft size={14} />
              </div>
              <div
                className="swiper-button-next grid cursor-pointer rounded-lg border border-[#EFEFEF] p-[7px] dark:border-[#2D374E]"
                onClick={goNext}
              >
                <MoveRight size={14} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Swiper
        breakpoints={responsiveness}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // loop={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {data?.map((card, index) => (
          <SwiperSlide key={index}>
            <CardComponent key={index} item={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MultiCardSlider
