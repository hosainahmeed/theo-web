"use client";

import { addPropertyImage, removePropertyImage } from '@/redux/slices/propertySlice';
import { RootState } from '@/redux/store';
import React, { useRef } from 'react';
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

interface Step4Props extends WizardStepProps { }

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

const Step4: React.FC<Step4Props> = ({ isActive, onNext, onPrev, onSubmit, isSubmitting, currentStep, totalSteps }) => {
  const dispatch = useDispatch();
  const step4 = useSelector((state: RootState) => state.property.step4);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          dispatch(addPropertyImage(result));
        };
        reader.readAsDataURL(file);
      }
    });

    // Clear the input value to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    dispatch(removePropertyImage(index));
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext?.();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step4.propertyImages.length === 0) {
      newErrors.images = 'At least one property image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (isActive) {
      validateForm();
    }
  }, [step4.propertyImages, isActive]);

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <FormField label="Property Images" error={errors.images} required>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Click to upload images
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </label>
        </div>
      </FormField>

      {/* Image Preview Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Uploaded Images ({step4.propertyImages.length})
        </h3>
        {step4.propertyImages.length === 0 ? (
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No images uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">Upload images to showcase your property</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {step4.propertyImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={image}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/50 to-transparent p-2 rounded-b-lg">
                  <p className="text-white text-xs font-medium">Image {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simple Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="font-medium">Upload Guidelines</h4>
        </div>
        <div className="text-sm text-blue-600">
          <p className="mb-2">• Upload at least 1 image to continue</p>
          <p className="mb-2">• Show your property's best features</p>
          <p>• Include both exterior and interior shots</p>
        </div>
      </div>
    </div>
  );
};

export default Step4;
