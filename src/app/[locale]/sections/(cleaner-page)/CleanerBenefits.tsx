import SectionHeader from '@/components/reusable-ui/SectionHeader'
import AnimatedButton from '@/components/ui/animated-button'
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
    <Image src={IMAGE.schedule} width={400} height={100} alt='schedule-icon' />
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('clearSchedule.title')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('clearSchedule.description')}</p>
  </div>
)
const Card2 = ({ t }: CardProps) => (
  <div className={cn(cardStyle)}>
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('noConfusion.title')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('noConfusion.description')}</p>
  </div>
)
const Card3 = ({ t }: CardProps) => (
  <div className={cn(cardStyle, "space-y-2")}>
    <Image src={IMAGE.projectCardShimmer} width={200} height={200} alt='schedule-icon' />
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('moreJobs.title')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('moreJobs.description')}</p>
  </div>
)
const Card4 = ({ t }: CardProps) => (
  <div className={cn(cardStyle)}>
    <Image src={IMAGE.map} width={200} height={200} alt='schedule-icon' />
    <h1 className="text-lg text-zinc-900 font-semibold mb-2">{t('easyCommunication.title')}</h1>
    <p className="text-sm text-zinc-600 leading-relaxed">{t('easyCommunication.description')}</p>
  </div>
)


function CleanerBenefits() {
  const t = useTranslations('cleanerBenefits');

  return (
    <div className='max-w-7xl px-2 mx-auto h-fit flex flex-col justify-center'>
      <div>
        <SectionHeader
          title={t('title')}
          subTitle={t('subtitle')}
        />

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {benefits.map((benefit, index) => (
            <div
              className='w-full flex flex-col items-start bg-white p-6 rounded-xl border border-gray-100 transition-all duration-300'
              key={index}
            >
              <div className="w-12 h-12 bg-[#0088FF]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <h3 className='text-lg text-zinc-900 font-semibold mb-2'>{benefit.title}</h3>
              <p className='text-sm text-zinc-600 leading-relaxed'>{benefit.description}</p>
            </div>
          ))}
        </div> */}
        <div
          className="grid gap-3
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3"
        >
          <div className="col-span-3 sm:col-span-1">
            <Card1 t={t} />
          </div>

          <div className="col-span-3 sm:col-span-2 lg:col-span-2">
            <Card2 t={t} />
          </div>

          <div className="col-span-3 sm:col-span-2 lg:col-span-2">
            <Card3 t={t} />
          </div>

          <div className="col-span-3 sm:col-span-3 lg:col-span-1">
            <Card4 t={t} />
          </div>
        </div>
        <div className="mt-12 text-center flex justify-center">
          <AnimatedButton buttonText={t('startEarning')} />
        </div>
      </div>
    </div>
  )
}

export default CleanerBenefits
