import SectionHeader from '@/components/reusable-ui/SectionHeader'
import { IMAGE } from '@/constant/image.index'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface CardProps {
  t: (key: string) => string
}

const cardStyle = "p-8 border border-border rounded-2xl h-full"

const Card1 = ({ t }: CardProps) => (
  <div className={cn(cardStyle, "space-y-4")}>
    <Image src={IMAGE.feature1} width={200} height={200} alt='schedule-icon' />
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('createAccount')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('createAccountDesc')}</p>
  </div>
)
const Card2 = ({ t }: CardProps) => (
  <div className={cn(cardStyle)}>
    <Image src={IMAGE.feature2} width={200} height={200} alt='schedule-icon' />
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('addProperty')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('addPropertyDesc')}</p>
  </div>
)
const Card3 = ({ t }: CardProps) => (
  <div className={cn(cardStyle, "space-y-2")}>
    <Image src={IMAGE.feature3} width={200} height={200} alt='schedule-icon' />
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('manageListings')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('manageListingsDesc')}</p>
  </div>
)
const Card4 = ({ t }: CardProps) => (
  <div className={cn(cardStyle)}>
    <Image src={IMAGE.feature4} width={200} height={200} alt='schedule-icon' />
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('assignCleaners')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('assignCleanersDesc')}</p>
  </div>
)


function CleanerBenefits() {
  const t = useTranslations('hostFeatures');

  return (
    <div className='max-w-7xl px-2 mx-auto h-fit flex flex-col justify-center'>
      <div>
        <SectionHeader
          title={t('title')}
          subTitle={t('subtitle')}
        />

        <div
          className="grid gap-3
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3"
        >
          <div className="col-span-3 sm:col-span-2 lg:col-span-2">
            <Card1 t={t} />
          </div>

          <div className="col-span-3 sm:col-span-1">
            <Card2 t={t} />
          </div>

          <div className="col-span-3 sm:col-span-3 lg:col-span-1">
            <Card3 t={t} />
          </div>

          <div className="col-span-3 sm:col-span-2 lg:col-span-2">
            <Card4 t={t} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CleanerBenefits
