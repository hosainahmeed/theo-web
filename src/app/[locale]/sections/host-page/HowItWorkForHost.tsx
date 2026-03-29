
import FeaturesCard from '@/components/reusable-ui/FeatureCard';
import { IMAGE } from '@/constant/image.index';
import { useTranslations } from 'next-intl';

function HowItWorkForHost() {
  const t = useTranslations('hostFeatures');

  const featuresData = [
    {
      image: IMAGE.feature1,
      title: t('createAccount'),
      description: t('createAccountDesc'),
    },
    {
      image: IMAGE.feature2,
      title: t('addProperty'),
      description: t('addPropertyDesc'),
    },
    {
      image: IMAGE.feature3,
      title: t('manageListings'),
      description: t('manageListingsDesc'),
    },
    {
      image: IMAGE.feature4,
      title: t('assignCleaners'),
      description: t('assignCleanersDesc'),
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {featuresData.map((item, idx) => (
          <FeaturesCard key={idx} index={idx} {...item} />
        ))}
      </div>
    </div>
  )
}

export default HowItWorkForHost;