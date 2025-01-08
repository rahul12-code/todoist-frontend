import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    projects: projectSlice,
  },
});

export default store;
