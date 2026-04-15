import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './features/contactSlice';

export const store = () => {
  return configureStore({
    reducer: {
      contact: contactReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
