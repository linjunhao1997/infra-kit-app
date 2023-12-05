import { configureStore } from '@reduxjs/toolkit'
import counter from './counter'
import userinfo from './userinfo'
const store =  configureStore({
    reducer: {
        counter,
        userinfo
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>
