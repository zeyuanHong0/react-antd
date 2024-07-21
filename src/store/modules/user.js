import { createSlice } from "@reduxjs/toolkit";
import { http, setToken as _setToken, getToken, removeToken } from "@/utils";
import { fetchUserLogin, fetchGetUserInfo } from "@/api/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken(),
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    removeUser(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

export const { setToken, setUserInfo, removeUser } = userStore.actions;

export const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await fetchUserLogin(loginForm);
    dispatch(setToken(res.data.token));
  };
};

export const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await fetchGetUserInfo();
    dispatch(setUserInfo(res.data));
  };
};

export default userStore.reducer;
