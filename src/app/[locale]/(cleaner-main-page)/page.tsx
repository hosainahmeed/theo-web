import CleanerBenefits from '../sections/(cleaner-page)/CleanerBenefits';
import CleanerHero from '../sections/(cleaner-page)/CleanerHero';
import HowItWorkForCleaner from '../sections/(cleaner-page)/HowItWorkForCleaner';
import Faq from '../sections/Faq';
import DownloadAppSection from '../sections/host-page/DownloadAppSection';
import TestimonialsForHost from '../sections/host-page/TestimonialsForHost';

function ForClnears() {
  return (
    <div className='space-y-24'>
      <CleanerHero />
      <CleanerBenefits />
      <HowItWorkForCleaner />
      <DownloadAppSection />
      <TestimonialsForHost />
      <Faq />
    </div>
  );
}

export default ForClnears;