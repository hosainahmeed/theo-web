import SectionHeader from '@/components/reusable-ui/SectionHeader'
import AnimatedButton from '@/components/ui/animated-button'

function CleanerBenefits() {
  const benefits = [
    {
      title: "Clear daily schedule",
      description: "View all your cleaning jobs organized by date and time. Never miss an appointment with our intuitive calendar system.",
      icon: "📅"
    },
    {
      title: "No confusion",
      description: "Get detailed job instructions, property information, and client requirements all in one place. Everything you need to know.",
      icon: "✓"
    },
    {
      title: "More jobs",
      description: "Connect with property owners and Airbnb hosts looking for reliable cleaners. Expand your client base and increase earnings.",
      icon: "📈"
    },
    {
      title: "Easy communication",
      description: "Message clients directly through the app. Ask questions, send updates, and build professional relationships.",
      icon: "💬"
    },
    {
      title: "Track earnings",
      description: "Monitor your income in real-time. See completed jobs, pending payments, and total earnings with detailed reports.",
      icon: "💰"
    }
  ]

  return (
    <div className='container mx-auto h-fit flex flex-col justify-center'>
      <div>
        <SectionHeader
          title="Why Cleaners Love Gestlio"
          subTitle="Join thousands of cleaners who've transformed their business with our platform. Discover the tools that make cleaning work simple and profitable."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
        </div>

        <div className="mt-12 text-center">
          <AnimatedButton buttonText="Start Earning Today" />
        </div>
      </div>
    </div>
  )
}

export default CleanerBenefits
