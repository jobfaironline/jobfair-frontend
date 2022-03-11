import React from 'react'
import ForgotPasswordContainer from '../../containers/ForgotPassword/ForgotPassword.container'
import {PageHeader} from "antd";
import {useHistory} from "react-router-dom";

const ForgotPasswordPage = () => {
    const history = useHistory()
    return (
        <div className="page">
            <PageHeader
                className="site-page-header"
                onBack={() => history.goBack()}
                title="Forgot password page"
                subTitle="Reset your password"
            />
            <ForgotPasswordContainer/>
        </div>
    )
}
export default ForgotPasswordPage
