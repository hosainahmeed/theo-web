"use client";

import { Checkbox } from '@/components/ui/checkbox';
import DatePickerTime from '@/components/ui/DatePickerTime';
import { cn } from '@/lib/utils';
import { addCleaningTask, removeCleaningTask, updateStep3 } from '@/redux/slices/propertySlice';
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

interface Step3Props extends WizardStepProps { }

const commonCleaningTasks = [
  // Kitchen & Dining
  { id: 'dishes', name: 'Washing Dishes', icon: '🍽️' },
  { id: 'fridge', name: 'Fridge Deep Clean', icon: '🧊' },
  { id: 'oven', name: 'Oven Cleaning', icon: '🍕' },
  { id: 'microwave', name: 'Microwave Clean', icon: '🍿' },
  { id: 'pantry', name: 'Pantry Organizing', icon: '🥫' },
  { id: 'cabinets', name: 'Cabinet Wiping', icon: '📂' },
  { id: 'dishwasher', name: 'Clean Dishwasher', icon: '🧼' },

  // Living & Common Areas
  { id: 'upholstery', name: 'Couch/Sofa Cleaning', icon: '🛋️' },
  { id: 'surfaces', name: 'Surface Wiping', icon: '🧽' },
  { id: 'electronics', name: 'Sanitize Electronics', icon: '💻' },
  { id: 'baseboards', name: 'Baseboard Scrubbing', icon: '🪵' },
  { id: 'walls', name: 'Wall Spot Cleaning', icon: '🖼️' },
  { id: 'clutter', name: 'Decluttering', icon: '📦' },
  { id: 'ceiling_fans', name: 'Ceiling Fan Dusting', icon: '🌀' },
  { id: 'blinds', name: 'Blind/Shutter Cleaning', icon: '🪜' },

  // Bedroom
  { id: 'bedding', name: 'Changing Linens', icon: '🛏️' },
  { id: 'mattress', name: 'Mattress Vacuuming', icon: '☁️' },
  { id: 'closet', name: 'Closet Organization', icon: '👗' },
  { id: 'under_bed', name: 'Under-bed Cleaning', icon: '🔦' },

  // Bathroom & Wellness
  { id: 'mirror', name: 'Mirror Polishing', icon: '🪞' },
  { id: 'toilet', name: 'Toilet Sanitizing', icon: '🚽' },
  { id: 'grout', name: 'Tile & Grout Scrub', icon: '🦷' },
  { id: 'cabinets_bath', name: 'Medicine Cabinet Clean', icon: '💊' },
  { id: 'towels', name: 'Fresh Towel Swap', icon: '🧖' },

  // Utility & Deep Clean
  { id: 'dryer_vent', name: 'Dryer Lint Removal', icon: '🔥' },
  { id: 'air_filters', name: 'AC Filter Change', icon: '🍃' },
  { id: 'light_fixtures', name: 'Light Fixture Dusting', icon: '💡' },
  { id: 'doorknobs', name: 'Sanitizing Handles', icon: '🚪' },
  { id: 'recycling', name: 'Recycling Sort', icon: '♻️' },
  { id: 'sweeping', name: 'Floor Sweeping', icon: '🧹' },

  // Outdoor & Specialized
  { id: 'patio', name: 'Patio/Deck Sweep', icon: '⛱️' },
  { id: 'garage', name: 'Garage Tidying', icon: '🚗' },
  { id: 'car_interior', name: 'Car Interior Vacuum', icon: '🚘' },
  { id: 'pet_area', name: 'Pet Area Cleaning', icon: '🐾' },
  { id: 'plants', name: 'Plant Care/Dusting', icon: '🪴' },
  { id: 'gutters', name: 'Gutter Cleaning', icon: '🍂' },
  { id: 'pressure_wash', name: 'Pressure Washing', icon: '🔫' },
  { id: 'ironing', name: 'Ironing Clothes', icon: '💨' },
  { id: 'grocery_bags', name: 'Grocery Bag Storage', icon: '🛍️' },
  { id: 'carpet_shampoo', name: 'Carpet Shampooing', icon: '🧴' }
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


interface TaskSuggestionProps {
  tasks: typeof commonCleaningTasks;
  onSelect: (task: typeof commonCleaningTasks[0]) => void;
  selectedTasks: string[];
}

const TaskSuggestions: React.FC<TaskSuggestionProps> = ({ tasks, onSelect, selectedTasks }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tasks.map((task) => {
          const isSelected = selectedTasks.includes(task.id);
          return (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                "hover:border-blue-300",
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              )}
              onClick={() => onSelect(task)}
            >
              <Checkbox
                checked={isSelected}
                onChange={() => onSelect(task)}
                className="pointer-events-none"
              />
              <span className="text-xl">{task.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{task.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Step3: React.FC<Step3Props> = ({ isActive }) => {
  const dispatch = useDispatch();
  const step3 = useSelector((state: RootState) => state.property.step3);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof typeof step3, value: string) => {
    console.log(`Step3: Updating ${field} with value:`, value);
    dispatch(updateStep3({ [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleToggleTask = (task: typeof commonCleaningTasks[0] | { name: string; id?: string }) => {
    const taskId = task.id || `custom-${Date.now()}`;
    const taskExists = step3.cleaningTask.some(t => t.id === taskId);

    if (taskExists) {
      // Remove task if it exists
      dispatch(removeCleaningTask(taskId));
    } else {
      // Add task if it doesn't exist
      dispatch(addCleaningTask({
        id: taskId,
        name: task.name
      }));
    }
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

  // Format time for display
  const formatTime = (time: string) => {
    if (!time) return 'Not set';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    console.log('Step3: Validating form with values:', {
      checkInTime: step3.checkInTime,
      checkOutTime: step3.checkOutTime
    });

    if (!step3.checkInTime) {
      newErrors.checkInTime = 'Check-in time is required';
    }
    if (!step3.checkOutTime) {
      newErrors.checkOutTime = 'Check-out time is required';
    }

    // Validate that check-out is after check-in
    if (step3.checkInTime && step3.checkOutTime) {
      const checkInTimeStr = extractTimeFromValue(step3.checkInTime);
      const checkOutTimeStr = extractTimeFromValue(step3.checkOutTime);

      console.log('Step3: Extracted times:', {
        checkInTimeStr,
        checkOutTimeStr
      });

      if (checkInTimeStr && checkOutTimeStr) {
        const checkIn = new Date(`2000-01-01T${checkInTimeStr}`);
        const checkOut = new Date(`2000-01-01T${checkOutTimeStr}`);

        console.log('Step3: Date objects for comparison:', {
          checkIn,
          checkOut,
          checkOutTime: checkOut.toTimeString(),
          checkInTime: checkIn.toTimeString()
        });

        if (checkOut <= checkIn) {
          newErrors.checkOutTime = 'Check-out time must be after check-in time';
        }
      }
    }

    console.log('Step3: Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (isActive) {
      validateForm();
    }
  }, [step3, isActive]);

  const isFormValid = React.useMemo(() => {
    return validateForm();
  }, [step3]);

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <DatePickerTime
          checkIn={step3.checkInTime}
          checkOut={step3.checkOutTime}
          onChange={(data) => {
            handleInputChange('checkInTime', data.checkIn)
            handleInputChange('checkOutTime', data.checkOut)
          }}
        />
      </div>

      {/* Cleaning Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Cleaning Tasks</h3>
          <div className="text-sm text-gray-500">
            {step3.cleaningTask.length} task{step3.cleaningTask.length !== 1 ? 's' : ''} selected
          </div>
        </div>

        {/* Task Suggestions */}
        <TaskSuggestions
          tasks={commonCleaningTasks}
          onSelect={handleToggleTask}
          selectedTasks={step3.cleaningTask.map(t => t.id)}
        />
      </div>

      {/* Schedule Summary */}
      {(step3.checkInTime && step3.checkOutTime) && (
        <div className="bg-linear-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-purple-700 mb-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Schedule Summary</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Check-in:</span>
              <span className="ml-2 font-semibold text-gray-900">{formatTime(extractTimeFromValue(step3.checkInTime))}</span>
            </div>
            <div>
              <span className="text-gray-600">Check-out:</span>
              <span className="ml-2 font-semibold text-gray-900">{formatTime(extractTimeFromValue(step3.checkOutTime))}</span>
            </div>
            <div>
              <span className="text-gray-600">Cleaning Tasks:</span>
              <span className="ml-2 font-semibold text-gray-900">{step3.cleaningTask.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3;
