import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


interface Userinfo {
  userSession: UserSession
}

interface UserSession {
  orgCode: string
  name: string
  userId: string
  accessToken: string
}

const initialState: Userinfo = {
  userSession: {
    orgCode: "",
    name: "",
    userId: "",
    accessToken: ""
  },
}
export const userinfo = createSlice({
  // 切片的名称，在定位到该切片的时候需要用到
  name: "userinfo",
  initialState,
  reducers: {
   /*  setPermissons: (state, action: PayloadAction<Permisson[]>) => {
      console.log("setPermissons", action)
      state.permissons = action.payload
    }, */
    setUserSession: (state) => {
      const accessToken = Cookies.get("Access-Token")
      const orgCode = Cookies.get("Org-Code")
      state.userSession.accessToken = accessToken ?? ""
      state.userSession.orgCode = orgCode ?? ""
    },
  },
});

// 将所有action导出，以供组件调用
export const { setUserSession } = userinfo.actions;
// 导出该切片，并在index.js中的reducer进行配置
export default userinfo.reducer;

