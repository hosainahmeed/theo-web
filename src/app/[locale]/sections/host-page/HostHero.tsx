"use client"
import AnimatedButton from '@/components/ui/animated-button'
import { IMAGE } from '@/constant/image.index'
import { Mobile } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import BrandShowcase from '../BrandShowcase'

function HostHero() {
  const [showAppQRcode, setShowAppQRcode] = useState(false)
  const t = useTranslations('home')

  const handleGetStarted = () => {
    console.log('Get started clicked!');
    // Add your navigation or action here
  }

  const handleExploreTemplate = () => {
    console.log('Explore template clicked!');
    // Add your navigation or action here
  }

  return (
    <section className="relative flex flex-col items-center max-md:px-2 bg-linear-to-b from-[#0088FF] to-transparent pb-20 pt-5">
      <div
        onMouseEnter={() => {
          setShowAppQRcode(true)
        }}
        onMouseLeave={() => {
          setShowAppQRcode(false)
        }}
        className="flex relative  flex-wrap items-center justify-center gap-2 pr-4 mt-8 rounded-full bg-white/10 border border-white/20">
        <button className='bg-[#3c44e2] animate-pulse w-8 h-8 flex items-center justify-center border border-white/20 text-white rounded-full text-xs'><HugeiconsIcon size={16} icon={Mobile} /> </button>

        <p className="text-xs text-gray-50">{t('getApp')}</p>
        {showAppQRcode && <div className="absolute top-[calc(100%+8px)] left-0 w-32 h-32 bg-white rounded-lg border border-white/20">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="w-full object-contain h-full" />
        </div>}
      </div>

      <h1 className="text-4xl md:text-7xl/20 text-center font-semibold max-w-5xl mt-5 bg-linear-to-r from-[#0B1320] to-indigo-500 text-transparent leading-tight bg-clip-text">
        {t('title')} <span className="text-indigo-500">{t('titleHighlight')}</span>
      </h1>
      <p className="text-gray-600 text-sm md:text-base/6 text-center max-w-3xl mt-3">
        {t('description')}
      </p>

      <div className="flex items-center gap-4 mt-8 text-sm">
        <AnimatedButton
          buttonText={t('getStarted')}
          onClick={handleGetStarted}
          className="text-sm"
        />

        <div className='p-[0.5px] rounded-full bg-linear-to-r from-white to-white/60'>
          <AnimatedButton
            buttonText={t('exploreTemplate')}
            onClick={handleExploreTemplate}
            variant="secondary"
            className="text-sm"
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-10 md:gap-20 mx-auto my-4 px-4 flex-wrap">
        <BrandShowcase />
      </div>
      <div className="relative h-150 md:h-146.5 overflow-hidden border-b-transparent border-b-0 rounded-bl-none rounded-br-none rounded-3xl">
        <div className="absolute bottom-0 w-full h-2/4 md:h-1/4 bg-linear-to-t to-transparent via-white/70 from-white left-0"></div>
        <Image
          placeholder="blur"
          className="h-full rounded-3xl object-contain md:object-cover object-top"
          src={IMAGE.hostPreview}
          loading="lazy"
          // blurDataURL={heroImage}
          width={1000}
          height={586}
          alt="Host Preview"
        />
      </div>
    </section>
  )
}

export default HostHero
