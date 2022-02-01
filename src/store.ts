import {configureStore, createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'screens',
    initialState: {
        screen: 'video',
        startTime: 0,
    },
    reducers: {
        setScreen: (state, action) => {
            state.screen = action.payload
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload
        }
    },
})
export const {setScreen, setStartTime} = slice.actions

const store = configureStore(slice)
export default store;

export type RootState = ReturnType<typeof store.getState>
