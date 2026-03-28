import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CleaningTask {
  id: string;
  name: string;
}

interface Step1 {
  propertyType: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
}

interface Step2 {
  propertyName: string;
  propertySize: string;
  numberOfLivingRooms: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfKitchens: number;
}

interface Step3 {
  checkInTime: string;
  checkOutTime: string;
  cleaningTask: CleaningTask[];
}

interface Step4 {
  propertyImages: string[];
}

interface PropertyState {
  currentStep: number;
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step4: Step4;
}


const initialState: PropertyState = {
  currentStep: 1,

  step1: {
    propertyType: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
  },

  step2: {
    propertyName: "",
    propertySize: "",
    numberOfLivingRooms: 0,
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    numberOfKitchens: 0,
  },

  step3: {
    checkInTime: "",
    checkOutTime: "",
    cleaningTask: [],
  },

  step4: {
    propertyImages: [],
  },
};


export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    nextStep: (state) => {
      state.currentStep += 1;
    },

    prevStep: (state) => {
      state.currentStep -= 1;
    },

    updateStep1: (state, action: PayloadAction<Partial<Step1>>) => {
      state.step1 = { ...state.step1, ...action.payload };
    },

    updateStep2: (state, action: PayloadAction<Partial<Step2>>) => {
      state.step2 = { ...state.step2, ...action.payload };
    },

    updateStep3: (state, action: PayloadAction<Partial<Step3>>) => {
      state.step3 = { ...state.step3, ...action.payload };
    },

    updateStep4: (state, action: PayloadAction<Partial<Step4>>) => {
      state.step4 = { ...state.step4, ...action.payload };
    },

    addPropertyImage: (state, action: PayloadAction<string>) => {
      state.step4.propertyImages.push(action.payload);
    },

    removePropertyImage: (state, action: PayloadAction<number>) => {
      state.step4.propertyImages = state.step4.propertyImages.filter(
        (_, index) => index !== action.payload
      );
    },

    addCleaningTask: (state, action: PayloadAction<CleaningTask>) => {
      state.step3.cleaningTask.push(action.payload);
    },

    removeCleaningTask: (state, action: PayloadAction<string>) => {
      state.step3.cleaningTask = state.step3.cleaningTask.filter(
        (task) => task.id !== action.payload
      );
    },

    clearProperty: () => initialState,
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  updateStep1,
  updateStep2,
  updateStep3,
  updateStep4,
  addPropertyImage,
  removePropertyImage,
  addCleaningTask,
  removeCleaningTask,
  clearProperty,
} = propertySlice.actions;

export default propertySlice.reducer;