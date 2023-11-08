import { configureStore } from '@reduxjs/toolkit'
import counter from './counter'
import userinfo from './userinfo'
export default configureStore({
    reducer: {
        counter,
        userinfo
    }
})