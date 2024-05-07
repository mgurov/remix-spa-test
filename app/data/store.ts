import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import fetcherSlice, { newActionsDetectedMiddleware } from './fetcherSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetcher: fetcherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(newActionsDetectedMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch