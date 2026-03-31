import SectionHeader from '@/components/reusable-ui/SectionHeader'
import { IMAGE } from '@/constant/image.index'
import Image from 'next/image'

function HowItWorkForCleaner() {
  const data = [
    {
      title: "Create Account",
      description: "Get started in minutes , Sign up and set up your cleaner profile quickly.",
      image: IMAGE.login_step,
    },
    {
      title: "Connect with Hosts",
      description: "Get matched with property owners , Connect with hosts who need cleaning services.",
      image: IMAGE.connection,
    },
    {
      title: "Receive Tasks",
      description: "Start getting cleaning jobs , Get notified when new tasks are assigned to you.",
      image: IMAGE.receivingTask,
    },
    {
      title: "Complete & Get Paid",
      description: "Finish jobs and track earnings , Complete tasks, upload proof, and receive payments easily.",
      image: IMAGE.payment,
    },
  ]
  return (
    <div className='container mx-auto h-fit py-12 md:py-28 flex flex-col justify-center'>
      <div>
        <SectionHeader title="Start Cleaning in 4 Simple Steps" subTitle="Join Gestlio and start receiving cleaning jobs in minutes." highlightText='4' />
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
