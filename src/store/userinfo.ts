import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Userinfo = {
  permissons :Permisson[]
  userSession: UserSession
}

const initialState: Userinfo = {
  permissons: [],
  userSession: {
    org: "",
    name: "",
    userId: "",
    authToken: ""
  },
}
export const userinfo = createSlice({
  // 切片的名称，在定位到该切片的时候需要用到
  name: "userinfo",
  initialState,
  reducers: {
    setPermissons: (state, action: PayloadAction<Permisson[]>) => {
      console.log("setPermissons", action)
      state.permissons = action.payload
    },
    setUserSession: (state, action: PayloadAction<UserSession>) => {
      console.log("setUserSession", action)
      state.userSession = action.payload
      localStorage.setItem("authToken", state.userSession.authToken)
    },
  },
});

// 将所有action导出，以供组件调用
export const { setUserSession, setPermissons } = userinfo.actions;
// 导出该切片，并在index.js中的reducer进行配置
export default userinfo.reducer;
