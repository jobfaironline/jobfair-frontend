import React from 'react';
import {Form, notification} from "antd";
import LoginComponent from "../../components/login/Login.component";
import {signInAPI} from "../../services/userService";
import {useDispatch} from "react-redux";
import {SigninHandler} from "../../redux-flow/authentication/authentication-action";

const LoginContainer = props => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

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