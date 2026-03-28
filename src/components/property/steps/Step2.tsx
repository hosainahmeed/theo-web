"use client";

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { updateStep2 } from '@/redux/slices/propertySlice';
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

interface Step2Props extends WizardStepProps { }

const propertySizes = [
  { id: 'studio', name: 'Studio', sqft: '0-400', icon: '🏠' },
  { id: 'small', name: 'Small', sqft: '400-800', icon: '🏡' },
  { id: 'medium', name: 'Medium', sqft: '800-1500', icon: '🏘️' },
  { id: 'large', name: 'Large', sqft: '1500-2500', icon: '🏢' },
  { id: 'xlarge', name: 'Extra Large', sqft: '2500+', icon: '🏰' }
];

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, required, children }) => {
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

interface RoomCounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  description?: string;
  index?: number;
}

const RoomCounter: React.FC<RoomCounterProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  description,
  index = 0
}) => {
  return (
    <div className="bg-white py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-gray-900">{label}</div>
            {description && (
              <div className="text-xs text-gray-500">{description}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange(Math.max(min, value - 1))}
            disabled={value <= min}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
              "border border-[#cdcdcd] cursor-pointer hover:border-[#cdcdcd]",
              value <= min && "opacity-50 cursor-not-allowed"
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          <div className="w-12 text-center">
            <span className="text-lg font-semibold text-gray-900">{value}</span>
          </div>

          <button
            type="button"
            onClick={() => onChange(Math.min(max, value + 1))}
            disabled={value >= max}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
              "border border-[#cdcdcd] cursor-pointer hover:border-[#cdcdcd]",
              value >= max && "opacity-50 cursor-not-allowed"
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const PropertySizeSelector: React.FC<{
  selectedSize: string;
  onSelect: (size: string) => void;
  error?: string;
}> = ({ selectedSize, onSelect, error }) => {
  return (
    <FormField label="Property Size" error={error} required>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {propertySizes.map((size) => (
          <button
            key={size.id}
            type="button"
            onClick={() => onSelect(size.id)}
            className={cn(
              "p-4 rounded-lg cursor-pointer hover:bg-gray-50 border transition-all duration-200 text-center",
              selectedSize === size.id
                ? "border-black/50 bg-blue-50"
                : "border-gray-200 bg-white"
            )}
          >
            <div className="text-2xl mb-2">{size.icon}</div>
            <div className="font-medium text-gray-900 text-sm">{size.name}</div>
            <div className="text-xs text-gray-500 mt-1">{size.sqft} sqft</div>
          </button>
        ))}
      </div>
    </FormField>
  );
};

const Step2: React.FC<Step2Props> = ({ isActive }) => {
  const dispatch = useDispatch();
  const step2 = useSelector((state: RootState) => state.property.step2);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof typeof step2, value: string | number) => {
    dispatch(updateStep2({ [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!step2.propertyName.trim()) {
      newErrors.propertyName = 'Property name is required';
    }
    if (!step2.propertySize) {
      newErrors.propertySize = 'Please select a property size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (isActive) {
      validateForm();
    }
  }, [step2, isActive]);

  const isFormValid = React.useMemo(() => {
    return validateForm();
  }, [step2]);

  if (!isActive) return null;

  const data = [
    {
      label: "Living Room",
      value: step2.numberOfLivingRooms,
      onChange: (value: number) => handleInputChange('numberOfLivingRooms', value),
      description: "Common living areas"
    },
    {
      label: "Bedroom",
      value: step2.numberOfBedrooms,
      onChange: (value: number) => handleInputChange('numberOfBedrooms', value),
      description: "Private sleeping areas"
    },
    {
      label: "Bathroom",
      value: step2.numberOfBathrooms,
      onChange: (value: number) => handleInputChange('numberOfBathrooms', value),
      description: "Private bathing areas"
    },
    {
      label: "Kitchen",
      value: step2.numberOfKitchens,
      onChange: (value: number) => handleInputChange('numberOfKitchens', value),
      description: "Cooking and food preparation area"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Property Name */}
      <FormField label="Property Name" error={errors.propertyName} required>
        <Input
          type="text"
          value={step2.propertyName}
          onChange={(e) => handleInputChange('propertyName', e.target.value)}
          placeholder="Cozy Downtown Apartment"
          className={cn(
            errors.propertyName ? "border-red-500" : "border-[#cdcdcd]"
          )}
        />
      </FormField>

      {/* Property Size */}
      <PropertySizeSelector
        selectedSize={step2.propertySize}
        onSelect={(size) => handleInputChange('propertySize', size)}
        error={errors.propertySize}
      />

      {/* Room Counters */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Configuration</h3>

        <div className="grid grid-cols-1 divide-y divide-[#cdcdcd] rounded-2xl overflow-hidden border border-[#cdcdcd]">
          {
            data.map((item, index) => (
              <div className='' key={index}>
                <RoomCounter
                  label={item.label}
                  value={item.value}
                  onChange={item.onChange}
                  description={item.description}
                  index={index}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Step2;
