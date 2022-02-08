import { resetPasswordActions } from "./reset-password-slice";

export const generateOtpHandler = (data) => {
    return (dispatch) => {
        dispatch (resetPasswordActions.fetchingGenerateOtpSuccess(data));
    }
};

export const resetPasswordHandler = (data) => {
    return (dispatch) => {
        dispatch (resetPasswordActions.fetchingResetPasswordSuccess(data));
    }
};