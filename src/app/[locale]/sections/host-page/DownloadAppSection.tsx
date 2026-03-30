"use client"
import { IMAGE } from '@/constant/image.index'
import Image from 'next/image'
import Link from 'next/link'

function DownloadAppSection() {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-200px)]'>
      <div className="bg-[#1070B7] flex justify-between items-center p-8 rounded-[2rem] container max-w-6xl">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-bold text-white">Get your intarest with our app</h1>
          <p className="text-white">Download our app to get started</p>
          <div
            className="flex  items-center md:items-start gap-4 justify-center lg:justify-start"
          >
            <div
              className="cursor-pointer"
              onClick={() => alert('coming soon')}
            >
              <Image
                src={IMAGE.googlePlayBadge}
                alt="Get it on Google Play"
                width={180}
                height={60}
                className="w-auto h-8 md:h-10 lg:h-12"
                priority
              />
            </div>
            <Link
              href="https://apps.apple.com/us/app/VetBetspicks/id6747808426"
              target="_blank"
            >
              <div
                className="cursor-pointer"
              >
                <Image
                  src={IMAGE.appStoreBadge}
                  alt="Download on the App Store"
                  width={180}
                  height={60}
                  className="w-auto h-8 md:h-10 lg:h-12"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadAppSection
