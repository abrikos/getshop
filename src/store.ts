import {configureStore, createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'screens',
    initialState: {
        screen: 'second',
        startTime: 0,
        phone: '',
        phoneValidated: false,
        agreement: false,
    },
    reducers: {
        setScreen: (state, action) => {
            state.screen = action.payload
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload
        },
        setPhoneNumber: (state, action) => {
            state.phone = action.payload
        },
        setAgreement: (state, action) => {
            state.agreement = action.payload
        },
        setPhoneValid: (state, action) => {
            state.phoneValidated = action.payload
        }
    },
})
export const {setScreen, setStartTime, setPhoneNumber, setPhoneValid, setAgreement} = slice.actions

const store = configureStore(slice)
export default store;

export type RootState = ReturnType<typeof store.getState>
