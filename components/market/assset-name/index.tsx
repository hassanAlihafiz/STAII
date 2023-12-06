import { useAppDispatch } from '@/store'
import { setCurrentStockData } from '@/store/slices/stocks-slice'
import { CompanyDetails, StockDetails } from '@/types/stocks'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AssetNameComp = ({ data }: { data: StockDetails }) => {
  const dispatch = useAppDispatch();
  console.log(data)
  return (
    <div className="flex items-center gap-2 py-3">
          <Star stroke="#D7DBE0" />
          <Image
            src={
              data?.details?.branding?.icon_url ? data?.details?.branding?.icon_url +
              "?apikey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND":'/images/logo-icon.svg'
            }
            alt=""
            width={40}
            height={40}
          />
      <div 
         onClick={() => {
          console.log('----------------------------',data)
              dispatch(setCurrentStockData(data))
        }}>
        
          <Link
            href={{
              pathname: `/script/${data?.ticker}`,
              // query: { data: JSON.stringify(row?.original) },
            }}
            className="black-600 text-base dark:text-white hover:underline"
       
      >
        
            {data?.ticker}
          </Link>
            </div>
        </div>
  )
}

export default AssetNameComp