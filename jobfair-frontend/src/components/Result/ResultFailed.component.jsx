import React from 'react';
import {Button, Result, Typography} from "antd";
import {useHistory} from "react-router-dom";
import {CloseCircleOutlined} from "@ant-design/icons";

const ResultFailedComponent = () => {
    const { Paragraph, Text } = Typography;
    const history = useHistory();

    return (
        <>
            <Result
                status="error"
                title="Submission Failed"
                subTitle="Please check and modify the following information before resubmitting."
                extra={[
                    <Button type="primary" key="console" onClick={() => history.push("/")}>
                        Back to home page
                    </Button>
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            The content you submitted has the following error:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
                        frozen. <a>Contact with admin&gt;</a>
                    </Paragraph>
                </div>
            </Result>,
        </>
    );
};

export default ResultFailedComponent;