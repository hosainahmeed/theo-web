import SectionHeader from '@/components/reusable-ui/SectionHeader'
import { IMAGE } from '@/constant/image.index'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

function HowItWorkForCleaner() {
  const t = useTranslations('howItWorkForCleaner');

  const data = [
    {
      title: t('steps.createAccount.title'),
      description: t('steps.createAccount.description'),
      image: IMAGE.login_step,
    },
    {
      title: t('steps.connectWithHosts.title'),
      description: t('steps.connectWithHosts.description'),
      image: IMAGE.connection,
    },
    {
      title: t('steps.receiveTasks.title'),
      description: t('steps.receiveTasks.description'),
      image: IMAGE.receivingTask,
    },
    {
      title: t('steps.completeAndGetPaid.title'),
      description: t('steps.completeAndGetPaid.description'),
      image: IMAGE.payment,
    },
  ]
  return (
    <div className='container mx-auto h-fit flex flex-col justify-center'>
      <div>
        <SectionHeader title={t('title')} subTitle={t('subtitle')} highlightText='4' />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {data.map((item, index) => (
            <div className='w-full flex flex-col items-start' key={index}>
              <div className="w-full h-58 md:h-64">
                <Image className='w-full aspect-video h-full object-contain' src={item.image} alt={item.title} width={400} height={300} />
              </div>
              <div className="px-4">
                <h2 className='text-lg text-zinc-900 font-semibold'>{item.title}</h2>
                <p className='text-sm text-zinc-600'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorkForCleaner
