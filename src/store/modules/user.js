import { createSlice } from "@reduxjs/toolkit";
import { http, setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken(),
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
  },
});

export const { setToken } = userStore.actions;

export const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
};

export default userStore.reducer;
