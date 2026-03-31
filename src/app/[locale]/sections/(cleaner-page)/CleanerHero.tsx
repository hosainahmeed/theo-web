import AnimatedButton from '@/components/ui/animated-button';
import { IMAGE } from '@/constant/image.index';
import Image from "next/image";
import BrandShowcase from '../BrandShowcase';
import { useTranslations } from 'next-intl';

function CleanerHero() {
  const t = useTranslations('cleanerHero');

  return (
    <div
      className="w-full bg-linear-to-b from-[#0088FF] to-transparent">
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center justify-between px-2 gap-10 md:gap-16">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6 text-left">
          <h1 className="text-3xl sm:text-4xl text-center md:text-start md:text-5xl font-semibold leading-tight">
            {t('title')}
          </h1>
          <p className="text-base text-center md:text-start sm:text-lg text-gray-600">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 space-y-2 sm:space-y-0">
            <AnimatedButton variant='secondary' buttonText={t('joinAsCleaner')} />
            <div className="w-2 hidden sm:block"></div>
            <AnimatedButton buttonText={t('howItWorks')} />
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <Image
            className="max-w-full h-auto object-cover"
            src={IMAGE.cleaner}
            width={1200}
            height={1200}
            alt="sampli"
            priority
          />
        </div>
      </div>
      <BrandShowcase />
    </div>
  )
}

export default CleanerHero
