import React from 'react';
import {Form, notification} from "antd";
import LoginComponent from "../../components/login/Login.component";
import {signInAPI} from "../../services/userService";
import {useDispatch} from "react-redux";
import {SigninHandler} from "../../redux-flow/authentication/authentication-action";
import {useHistory} from "react-router-dom";

const LoginContainer = props => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onFinish = (values) => {
        const body = {
            email: values.email,
            password: values.password
        }
        signInAPI(body)
                .then((res) => {
                    notification['success']({
                        message: `Login successfully.`,
                    })
                    dispatch(SigninHandler(res.data))
                    history.push("/map/aa887cc1-240a-41de-99b4-5ffe26075279")
                })
                .catch((err) => {
                    notification['error']({
                        message: `Login failed - Invalid email or password.`,
                    })
                })
    }

    return (
        <>
            <LoginComponent form={form} onFinish={onFinish}/>
        </>
    );
};



export default LoginContainer;