const TOKEM_KEY = "token_key";

const setToken = (token) => {
  sessionStorage.setItem(TOKEM_KEY, token);
};

const getToken = () => {
  return sessionStorage.getItem(TOKEM_KEY) || "";
};

const removeToken = () => {
  sessionStorage.removeItem(TOKEM_KEY);
};

export { setToken, getToken, removeToken };
