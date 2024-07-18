import { createSlice } from "@reduxjs/toolkit";
import { http, setToken as _setToken, getToken, removeToken } from "@/utils";

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
    const res = await http.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
};

export const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await http.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
};

export default userStore.reducer;
