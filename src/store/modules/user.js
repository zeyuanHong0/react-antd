import { createSlice } from "@reduxjs/toolkit";
import { http } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: "",
  },
  reducers: {
    setToken(state, action) {
      state.userInfo = action.payload;
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
