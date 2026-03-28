"use client";

import { Input } from '@/components/ui/input';
import { IMAGE } from '@/constant/image.index';
import { cn } from '@/lib/utils';
import { updateStep1 } from '@/redux/slices/propertySlice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
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

interface Step1Props extends WizardStepProps { }

const propertyTypes = [
  { id: 'apartment', name: 'Apartment', icon: IMAGE.apartment },
  { id: 'house', name: 'House', icon: IMAGE.house },
];

const FormField: React.FC<{
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, error, required, children }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

const PropertyTypeSelector: React.FC<{
  selectedType: string;
  onSelect: (type: string) => void;
  error?: string;
}> = ({ selectedType, onSelect, error }) => {
  return (
    <div className="space-y-3">
      <FormField label="Property Type" error={error} required>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelect(type.id)}
              className={cn(
                "p-4 rounded-lg border transition-all duration-200 text-left",
                " hover:border-blue-300",
                selectedType === type.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Image src={type.icon} alt={type.name} width={80} height={80} />
                <div>
                  <div className="font-medium text-gray-900">{type.name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </FormField>
    </div>
  );
};

const Step1: React.FC<Step1Props> = ({ isActive }) => {
  const dispatch = useDispatch();
  const step1 = useSelector((state: RootState) => state.property.step1);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof typeof step1, value: string) => {
    dispatch(updateStep1({ [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!step1.propertyType) {
      newErrors.propertyType = 'Please select a property type';
    }
    if (!step1.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Address is required';
    }
    if (!step1.propertyCity.trim()) {
      newErrors.propertyCity = 'City is required';
    }
    if (!step1.propertyState.trim()) {
      newErrors.propertyState = 'State is required';
    }
    if (!step1.propertyZip.trim()) {
      newErrors.propertyZip = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(step1.propertyZip)) {
      newErrors.propertyZip = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (isActive) {
      validateForm();
    }
  }, [step1, isActive]);

  const isFormValid = React.useMemo(() => {
    return validateForm();
  }, [step1]);

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      {/* Property Type Selection */}
      <PropertyTypeSelector
        selectedType={step1.propertyType}
        onSelect={(type) => handleInputChange('propertyType', type)}
        error={errors.propertyType}
      />

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Street Address" error={errors.propertyAddress} required>
          <Input
            type="text"
            value={step1.propertyAddress}
            onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
            placeholder="123 Main Street"
            className={cn(
              errors.propertyAddress ? "border-red-500" : "border-gray-300"

            )}
          />
        </FormField>

        <FormField label="City" error={errors.propertyCity} required>
          <Input
            type="text"
            value={step1.propertyCity}
            onChange={(e) => handleInputChange('propertyCity', e.target.value)}
            placeholder="New York"
            className={cn(
              errors.propertyCity ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormField>

        <FormField label="State" error={errors.propertyState} required>
          <Input
            type="text"
            value={step1.propertyState}
            onChange={(e) => handleInputChange('propertyState', e.target.value)}
            placeholder="NY"
            maxLength={2}
            className={cn(
              errors.propertyState ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormField>

        <FormField label="ZIP Code" error={errors.propertyZip} required>
          <Input
            type="text"
            value={step1.propertyZip}
            onChange={(e) => handleInputChange('propertyZip', e.target.value)}
            placeholder="10001"
            maxLength={10}
            className={cn(
              errors.propertyZip ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormField>
      </div>

      {/* Address Preview */}
      {step1.propertyAddress && step1.propertyCity && step1.propertyState && step1.propertyZip && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Address Preview</span>
          </div>
          <p className="text-gray-700">
            {step1.propertyAddress}, {step1.propertyCity}, {step1.propertyState} {step1.propertyZip}
          </p>
        </div>
      )}
    </div>
  );
};

export default Step1;
