import DownloadAppSection from '../sections/host-page/DownloadAppSection'
import HostHero from '../sections/host-page/HostHero'
import HowItWorkForHost from '../sections/host-page/HowItWorkForHost'
import TestimonialsForHost from '../sections/host-page/TestimonialsForHost'

function page() {
  return (
    <div>
      <HostHero />
      <HowItWorkForHost />
      <DownloadAppSection />
      <TestimonialsForHost />
    </div>
  )
}

export default page
