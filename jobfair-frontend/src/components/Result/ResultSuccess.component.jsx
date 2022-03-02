import React from 'react';
import {Button, Result, Typography} from "antd";
import {useHistory} from "react-router-dom";
import {CloseCircleOutlined} from "@ant-design/icons";


const ResultSuccessComponent = () => {
    const history = useHistory();

    return (
        <>
            <Result
                status="success"
                title="Your submission was successfully"
                subTitle="Please wait until admin evaluate your form. Thank you 😊"
                extra={[
                    <Button type="primary" key="console" onClick={() => history.push("/")}>
                        Back to home page
                    </Button>,
                ]}
            />,
        </>
    );
};

export default ResultSuccessComponent;