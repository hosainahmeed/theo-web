"use client";

import { setStep } from '@/redux/slices/propertySlice';
import { RootState } from '@/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface WizardStepProps {
  isActive?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

interface Step5Props extends WizardStepProps { }

const propertyTypeNames: Record<string, string> = {
  apartment: 'Apartment',
  house: 'House',
  villa: 'Villa',
  condo: 'Condo',
  studio: 'Studio',
  townhouse: 'Townhouse'
};

const propertySizeNames: Record<string, string> = {
  studio: 'Studio (0-400 sqft)',
  small: 'Small (400-800 sqft)',
  medium: 'Medium (800-1500 sqft)',
  large: 'Large (1500-2500 sqft)',
  xlarge: 'Extra Large (2500+ sqft)'
};

interface SummaryCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, icon, children, onEdit }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string; icon?: string }> = ({ label, value, icon }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
};

const Step5: React.FC<Step5Props> = ({ isActive, onNext, onPrev, onSubmit, isSubmitting }) => {
  const dispatch = useDispatch();
  const { step1, step2, step3, step4 } = useSelector((state: RootState) => state.property);

  const handleEditStep = (stepNumber: number) => {
    dispatch(setStep(stepNumber));
  };

  // Helper function to extract time from date+time string
  const extractTimeFromValue = (value: string): string => {
    if (!value) return "";
    const parts = value.split(' ');
    // Return the last part that contains a colon (time format)
    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].includes(':')) {
        return parts[i];
      }
    }
    return "";
  };

  const formatTime = (time: string) => {
    if (!time) return 'Not set';
    const extractedTime = extractTimeFromValue(time);
    if (!extractedTime) return 'Not set';

    const [hours, minutes] = extractedTime.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isFormValid = React.useMemo(() => {
    // Check if all required fields are filled
    return (
      step1.propertyType &&
      step1.propertyAddress &&
      step1.propertyCity &&
      step1.propertyState &&
      step1.propertyZip &&
      step2.propertyName &&
      step2.propertySize &&
      step3.checkInTime &&
      step3.checkOutTime &&
      step4.propertyImages.length > 0
    );
  }, [step1, step2, step3, step4]);

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review & Confirm
        </h2>
        <p className="text-gray-600">
          Please review your property details before creating
        </p>
      </div>

      {/* Validation Warning */}
      {!isFormValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-700 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="font-medium">Incomplete Information</span>
          </div>
          <p className="text-sm text-yellow-700">
            Some required information is missing. Please go back and complete all fields before proceeding.
          </p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="space-y-4">
        {/* Location & Type */}
        <SummaryCard
          title="Location & Type"
          icon="📍"
          onEdit={() => handleEditStep(1)}
        >
          <div className="space-y-2">
            <DetailRow
              label="Property Type"
              value={propertyTypeNames[step1.propertyType] || 'Not selected'}
              icon="🏠"
            />
            <DetailRow
              label="Address"
              value={`${step1.propertyAddress}, ${step1.propertyCity}, ${step1.propertyState} ${step1.propertyZip}`}
              icon="🏢"
            />
          </div>
        </SummaryCard>

        {/* Property Details */}
        <SummaryCard
          title="Property Details"
          icon="🏡"
          onEdit={() => handleEditStep(2)}
        >
          <div className="space-y-2">
            <DetailRow
              label="Property Name"
              value={step2.propertyName || 'Not set'}
              icon="📝"
            />
            <DetailRow
              label="Size"
              value={propertySizeNames[step2.propertySize] || 'Not selected'}
              icon="📏"
            />
            <DetailRow
              label="Total Rooms"
              value={String(step2.numberOfLivingRooms + step2.numberOfBedrooms + step2.numberOfBathrooms + step2.numberOfKitchens)}
              icon="🚪"
            />
            <DetailRow
              label="Bedrooms"
              value={String(step2.numberOfBedrooms)}
              icon="🛏️"
            />
            <DetailRow
              label="Bathrooms"
              value={String(step2.numberOfBathrooms)}
              icon="🚿"
            />
            <DetailRow
              label="Living Rooms"
              value={String(step2.numberOfLivingRooms)}
              icon="🛋️"
            />
            <DetailRow
              label="Kitchens"
              value={String(step2.numberOfKitchens)}
              icon="🍳"
            />
          </div>
        </SummaryCard>

        {/* Schedule & Tasks */}
        <SummaryCard
          title="Schedule & Cleaning"
          icon="⏰"
          onEdit={() => handleEditStep(3)}
        >
          <div className="space-y-2">
            <DetailRow
              label="Check-in Time"
              value={formatTime(step3.checkInTime)}
              icon="🔑"
            />
            <DetailRow
              label="Check-out Time"
              value={formatTime(step3.checkOutTime)}
              icon="🚪"
            />
            <DetailRow
              label="Cleaning Tasks"
              value={`${step3.cleaningTask.length} task${step3.cleaningTask.length !== 1 ? 's' : ''}`}
              icon="🧹"
            />

            {step3.cleaningTask.length > 0 && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">Tasks:</div>
                <div className="flex flex-wrap gap-2">
                  {step3.cleaningTask.map((task) => (
                    <span
                      key={task.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {task.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SummaryCard>

        {/* Property Images */}
        <SummaryCard
          title="Property Images"
          icon="📸"
          onEdit={() => handleEditStep(4)}
        >
          <div className="space-y-2">
            <DetailRow
              label="Total Images"
              value={`${step4.propertyImages.length} image${step4.propertyImages.length !== 1 ? 's' : ''}`}
              icon="🖼️"
            />

            {step4.propertyImages.length > 0 && (
              <div className="mt-3">
                <div className="grid grid-cols-4 gap-2">
                  {step4.propertyImages.slice(0, 8).map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {step4.propertyImages.length > 8 && (
                    <div className="aspect-square rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <span className="text-sm text-gray-600 font-medium">
                        +{step4.propertyImages.length - 8}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </SummaryCard>
      </div>

      {/* Final Confirmation */}
      <div className="bg-linear-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready to Create Property
          </h3>
          <p className="text-gray-600 mb-4">
            By clicking "Create Property", you confirm that all the information above is accurate.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your information is secure and will be handled according to our privacy policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
