import apartmentImage from '@/assets/apartment.svg';
import appPreview from '@/assets/app-preview.png';
import appStoreBadge from '@/assets/apple-play-badge.svg';
import connectionImage from '@/assets/conntection.png';
import propertyCreateHero from '@/assets/create-prop.webp';
import feature1 from '@/assets/feature-1.png';
import feature2 from '@/assets/feature-2.png';
import feature3 from '@/assets/feature-3.png';
import feature4 from '@/assets/feature-4.png';
import cleanerImage from '@/assets/for-cleaner.png';
import googlePlayBadge from '@/assets/google-play-badge.svg';
import hostPreview from '@/assets/host-preview.png';
import houseImage from '@/assets/house.svg';
import login_step from '@/assets/login-step.png';
import paymentGif from '@/assets/payment.gif';
import receivingTaskImage from '@/assets/reciveing-task.png';

export const IMAGE = {
  apartment: apartmentImage,
  house: houseImage,
  propertyCreateHero: propertyCreateHero,
  hostPreview: hostPreview,
  cleaner: cleanerImage,
  feature1: feature1,
  feature2: feature2,
  feature3: feature3,
  feature4: feature4,
  googlePlayBadge: googlePlayBadge,
  appStoreBadge: appStoreBadge,
  appPreview: appPreview,
  connection: connectionImage,
  receivingTask: receivingTaskImage,
  login_step,
  payment: paymentGif
} as const;
