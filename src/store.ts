import {configureStore, createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'screens',
    initialState: {
        screen: 'video',
    },
    reducers: {
        setScreen: (state, action) => {
            console.log(action)
            state.screen = action.payload
        }
    },
})
export const {setScreen} = slice.actions

const store = configureStore(slice)
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
