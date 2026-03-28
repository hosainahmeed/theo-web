"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { nextStep, prevStep, setStep } from '@/redux/slices/propertySlice';
import { RootState } from '@/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  onStepClick
}) => {
  return (
    <div className="flex items-center justify-between mb-8 relative">
      {/* Progress Line */}
      <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 -z-10" />
      <div
        className="absolute left-0 top-5 h-0.5 bg-blue-500 -z-10 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      />

      {/* Steps */}
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <button
            key={stepNumber}
            onClick={() => onStepClick?.(stepNumber)}
            className={cn(
              "relative flex flex-col items-center group cursor-pointer transition-all",
              onStepClick && "hover:scale-105"
            )}
            disabled={!onStepClick}
          >
            {/* Step Circle */}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                isActive && "bg-blue-500 text-white shadow-lg scale-110",
                isCompleted && "bg-green-500 text-white",
                !isActive && !isCompleted && "bg-white border-2 border-gray-300 text-gray-500"
              )}
            >
              {isCompleted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                stepNumber
              )}
            </div>

            {/* Step Label */}
            <span
              className={cn(
                "absolute top-12 text-xs font-medium whitespace-nowrap transition-colors",
                isActive && "text-blue-500",
                isCompleted && "text-green-500",
                !isActive && !isCompleted && "text-gray-500"
              )}
            >
              {stepNumber === 1 && "Location"}
              {stepNumber === 2 && "Details"}
              {stepNumber === 3 && "Schedule"}
              {stepNumber === 4 && "Images"}
              {stepNumber === 5 && "Review"}
            </span>
          </button>
        );
      })}
    </div>
  );
};

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrev?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  canProceed?: boolean;
  isSubmitting?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  canProceed = true,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-between py-4 px-2">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 1}
        className="px-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </Button>

      {currentStep === totalSteps ? (
        <Button
          onClick={onSubmit}
          disabled={!canProceed || isSubmitting}
          className="px-6 bg-green-500 hover:bg-green-600"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Creating Property...
            </>
          ) : (
            <>
              Create Property
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6"
        >
          Next
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      )}
    </div>
  );
};

interface PropertyWizardProps {
  children: React.ReactNode;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  canNavigateToStep?: boolean;
}

const PropertyWizard: React.FC<PropertyWizardProps> = ({
  children,
  onSubmit,
  isSubmitting = false,
  canNavigateToStep = false
}) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.property.currentStep);
  const totalSteps = React.Children.count(children);

  const handleStepClick = (step: number) => {
    if (canNavigateToStep) {
      dispatch(setStep(step));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      dispatch(prevStep());
    }
  };

  return (
    <div className="w-full h-full">
      {/* Step Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-8 min-h-100 lg:min-h-125">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              isActive: index + 1 === currentStep,
              onNext: handleNext,
              onPrev: handlePrev,
              onSubmit,
              isSubmitting,
              currentStep,
              totalSteps
            });
          }
          return child;
        })}
      </div>

      {/* Navigation */}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export { NavigationButtons, PropertyWizard, StepIndicator };
export default PropertyWizard;
