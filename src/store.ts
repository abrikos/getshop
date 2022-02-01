import {configureStore, createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'screens',
    initialState: {
        screen: 'first',
        startTime: 0,
        phone: ''
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
        }
    },
})
export const {setScreen, setStartTime, setPhoneNumber} = slice.actions

const store = configureStore(slice)
export default store;

export type RootState = ReturnType<typeof store.getState>
