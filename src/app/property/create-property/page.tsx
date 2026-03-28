"use client";

import PropertyWizard from '@/components/property/PropertyWizard';
import Step1 from '@/components/property/steps/Step1';
import Step2 from '@/components/property/steps/Step2';
import Step3 from '@/components/property/steps/Step3';
import Step4 from '@/components/property/steps/Step4';
import Step5 from '@/components/property/steps/Step5';
import FloatLayout from '@/components/reusable-ui/FloatLayout';
import { IMAGE } from '@/constant/image.index';
import { cn } from '@/lib/utils';
import { clearProperty } from '@/redux/slices/propertySlice';
import { RootState } from '@/redux/store';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CreatePropertyPage = () => {
  const dispatch = useDispatch();
  const propertyData = useSelector((state: RootState) => state.property);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Step information for dynamic sidebar content
  const stepInfo = {
    1: {
      title: "Tell us about<br className='lg:hidden' />your property",
      description: "Share basic details about your property to get started on your hosting journey."
    },
    2: {
      title: "Make your property<br className='lg:hidden' />stand out",
      description: "Add detailed information about amenities, bedrooms, and features that make your property special."
    },
    3: {
      title: "Set your schedule<br className='lg:hidden' />and requirements",
      description: "Define check-in/out times and cleaning requirements to ensure a smooth experience for guests."
    },
    4: {
      title: "Add photos of<br className='lg:hidden' />your property",
      description: "Upload high-quality images that showcase your property's best features and attract potential guests."
    },
    5: {
      title: "Review and publish<br className='lg:hidden' />your property",
      description: "Double-check all of the details and get your property ready to welcome your first guests."
    }
  };

  const currentStepInfo = stepInfo[propertyData.currentStep as keyof typeof stepInfo] || stepInfo[1];

  // Clear form data on unmount
  React.useEffect(() => {
    return () => {
      dispatch(clearProperty());
    };
  }, [dispatch]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would make your actual API call
      // const response = await fetch('/api/properties', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     step1: propertyData.step1,
      //     step2: propertyData.step2,
      //     step3: propertyData.step3
      //   })
      // });

      console.log('Property created successfully:', {
        step1: propertyData.step1,
        step2: propertyData.step2,
        step3: propertyData.step3
      });

      // Show success message or redirect
      alert('Property created successfully!');

      // Clear form and reset to first step
      dispatch(clearProperty());

    } catch (error) {
      console.error('Error creating property:', error);
      setSubmitError('Failed to create property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FloatLayout>
      <div
        onClick={() => {
          router.push('/')
        }}
        className="absolute hidden md:flex top-8 left-10 items-center gap-2 cursor-pointer w-fit bg-white/80 px-4 py-2 rounded-full border border-border">
        <ArrowLeft />
        <h1>Get Back to Home</h1>
      </div>
      <div className="w-full h-full flex bg-gray-50">
        {/* Sidebar */}
        <div
          style={{
            backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 50px)
        `,
            backgroundSize: "40px 40px",
          }}
          className="hidden border-r border-[#cdcdcd]/30 lg:flex lg:w-1/3 bg-gray-100 items-center justify-center p-6 lg:p-8">
          <div className="max-w-md w-full">
            <h1
              className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight"
              dangerouslySetInnerHTML={{ __html: currentStepInfo.title }}
            />
            <p className="text-sm lg:text-base my-4 text-gray-600">
              {currentStepInfo.description}
            </p>
            <div className="w-48 mt-12 h-48 border border-[#cdcdcd] rounded-2xl bg-gray-300 overflow-hidden">
              <Image
                src={IMAGE.propertyCreateHero}
                alt="Property Create Hero"
                width={1000}
                height={1000}
                className="w-full h-full object-cover scale-150 opacity-80 rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full py-12 pb-20 px-2 lg:w-2/3 xl:w-3/5 overflow-auto">
          <div className="flex items-center mb-4 gap-2">
            <div
              onClick={() => router.back()}
              className="w-8 flex md:hidden h-8 rounded-full bg-gray-200 items-center justify-center cursor-pointer">
              <ArrowLeft size={12} />
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden relative bg-gray-400">
              <div className={cn("absolute bg-black top-0 left-0 h-full")}
                style={{
                  width: `${(propertyData.currentStep / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="w-full h-full">
            <PropertyWizard
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              canNavigateToStep={true}
            >
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
              <Step5 />
            </PropertyWizard>
          </div>
        </div>

        {/* Error Display */}
        {submitError && (
          <div className="fixed bottom-0 left-0 right-0 bg-red-50 border-t border-red-200 px-4 py-3 lg:px-6 z-50">
            <div className="flex items-center gap-2 text-red-700 max-w-4xl mx-auto">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Error:</span>
              <span className="text-sm">{submitError}</span>
            </div>
          </div>
        )}

        {/* Debug Info (Remove in production) */}
        {process.env.NODE_ENV === 'production' && (
          <div className="hidden lg:block fixed bottom-12 right-0 bg-gray-100 border-t border-gray-200 px-6 py-3 z-40">
            <details className="text-xs text-gray-600">
              <summary className="cursor-pointer font-medium">Debug Info</summary>
              <pre className="mt-2 overflow-auto max-w-xs">
                {JSON.stringify(propertyData, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </FloatLayout >
  );
};

export default CreatePropertyPage;