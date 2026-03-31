import TestimonialsForCleaner from '../sections/(cleaner-page)/TestimonialsForCleaner'
import DownloadAppSection from '../sections/host-page/DownloadAppSection'
import HostHero from '../sections/host-page/HostHero'
import HowItWorkForHost from '../sections/host-page/HowItWorkForHost'

function page() {
  return (
    <div className='space-y-16'>
      <HostHero />
      <HowItWorkForHost />
      <DownloadAppSection />
      <TestimonialsForCleaner />
    </div>
  )
}

export default page
