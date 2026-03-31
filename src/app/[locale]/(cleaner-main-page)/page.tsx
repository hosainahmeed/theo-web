import CleanerBenefits from '../sections/(cleaner-page)/CleanerBenefits';
import CleanerHero from '../sections/(cleaner-page)/CleanerHero';
import HowItWorkForCleaner from '../sections/(cleaner-page)/HowItWorkForCleaner';
import BrandShowcase from '../sections/BrandShowcase';
import Faq from '../sections/Faq';

function ForClnears() {
  return (
    <div>
      <CleanerHero />
      <BrandShowcase />
      <CleanerBenefits />
      <HowItWorkForCleaner />
      <Faq />
    </div>
  );
}

export default ForClnears;