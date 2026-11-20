import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  patients: [
    { id: '1', name: 'Иванов Иван', diagnosis: 'ОРВИ', ward: 101, status: 'Лечится' },
    { id: '2', name: 'Петрова Анна', diagnosis: 'Пневмония', ward: 102, status: 'Лечится' },
    { id: '3', name: 'Сидоров Пётр', diagnosis: 'Гастрит', ward: 103, status: 'Выписан' },
    { id: '4', name: 'Кузнецова Мария', diagnosis: 'Ангина', ward: 101, status: 'Лечится' },
  ],
  loading: false,
  error: null,
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: {
      reducer(state, action) {
        state.patients.push(action.payload)
      },
      prepare({ name, diagnosis, ward, status }) {
        return {
          payload: {
            id: nanoid(),
            name,
            diagnosis,
            ward: Number(ward),
            status: status || 'Лечится',
          },
        }
      },
    },
    deletePatient(state, action) {
      state.patients = state.patients.filter(p => p.id !== action.payload)
    },
    updatePatient(state, action) {
      const { id, ...changes } = action.payload
      const patient = state.patients.find(p => p.id === id)
      if (patient) Object.assign(patient, changes)
    },
    dischargePatient(state, action) {
      const patient = state.patients.find(p => p.id === action.payload)
      if (patient) patient.status = 'Выписан'
    },
  },
})

export const { addPatient, deletePatient, updatePatient, dischargePatient } = patientsSlice.actions

// Селекторы
export const selectAllPatients = state => state.patients.patients
export const selectPatientsByWard = (state, ward) =>
  state.patients.patients.filter(p => p.ward === ward)
export const selectPatientsCount = state => state.patients.patients.length

export default patientsSlice.reducer