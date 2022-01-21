import { authenticationActions } from "./authentication-slice";
import { TOKEN_KEY, USER_STORAGE } from "../../constants/AppConst";

export const SigninHandler = (data) => {
  return (dispatch) => {
    localStorage.setItem(USER_STORAGE, JSON.stringify(data));
    dispatch(authenticationActions.fetchingLoginSuccess(data));
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    localStorage.removeItem(USER_STORAGE);
    dispatch(authenticationActions.logout());
  };
};
