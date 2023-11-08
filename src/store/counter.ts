import {createSlice } from '@reduxjs/toolkit'
export const counter = createSlice({
    // 切片的名称，在定位到该切片的时候需要用到
    name: 'counter', 
    initialState: {
        count: 0
    },
    reducers: {
        increment: state => {
            state.count += 1
        }
    }
})

// 将所有action导出，以供组件调用
export const { increment } = counter.actions
// 导出该切片，并在index.js中的reducer进行配置
export default counter.reducer