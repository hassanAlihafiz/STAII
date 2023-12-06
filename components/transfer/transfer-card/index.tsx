import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface TransferaCardProps {
  link?: any
  src?: any
  title?: string
  showBorder?: boolean
}
const TransferCard: React.FC<TransferaCardProps> = ({
  link,
  src,
  title,
  showBorder,
}) => {
  return (
    <div>
      <Link href={link}>
        <div className=" cursor-pointer flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-brand-green-10 dark:bg-brand-green-100 w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <Image src={src} width={40} height={40} alt="" />
            </div>
            <p className="w-full truncate sm:w-auto black-600 text-base ellip capitalize dark:text-white max-md:text-sm ">
              {title}
            </p>{" "}
          </div>
          <div>
            <ChevronRight className="w-5 h-5 text-brand-gray-50" />
          </div>
        </div>
        {showBorder && (
          <div className="my-4 bg-brand-gray-20 dark:bg-brand-gray-90 h-[2px] rounded"></div>
        )}
      </Link>
    </div>
  )
}

export default TransferCard
