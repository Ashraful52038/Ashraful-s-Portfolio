import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactFormData } from '@/types';

interface ContactState {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorMessage: string | null;
  lastSubmittedData: ContactFormData | null;
}

const initialState: ContactState = {
  isSubmitting: false,
  submitStatus: 'idle',
  errorMessage: null,
  lastSubmittedData: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    submitStart: (state, action: PayloadAction<ContactFormData>) => {
      state.isSubmitting = true;
      state.submitStatus = 'idle';
      state.errorMessage = null;
      state.lastSubmittedData = action.payload;
    },
    submitSuccess: (state) => {
      state.isSubmitting = false;
      state.submitStatus = 'success';
      state.errorMessage = null;
    },
    submitFailure: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.submitStatus = 'error';
      state.errorMessage = action.payload;
    },
    resetSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.errorMessage = null;
    },
  },
});

export const { submitStart, submitSuccess, submitFailure, resetSubmitStatus } = contactSlice.actions;
export default contactSlice.reducer;
