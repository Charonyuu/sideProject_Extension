import { createSlice } from "@reduxjs/toolkit";

export interface MessageState {
  message: {
    accountId: string;
    isLogin: boolean;
    socket: any; // 根据实际情况定义 socket 的类型
  };
}

const initialState = {
  accountId: "",
  isLogin: false,
  socket: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.accountId = action.payload;
    },
    setLogout: (state) => {
      return initialState;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket, setLogin, setLogout } = messageSlice.actions;

export default messageSlice.reducer;
