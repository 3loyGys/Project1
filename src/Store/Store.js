import { configureStore } from '@reduxjs/toolkit'
import patientsReducer from './slices/patientsSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    auth: authReducer,
  },
})