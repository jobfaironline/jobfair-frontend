import {Button, Result} from "antd";
import {useHistory, useLocation} from "react-router-dom";

export const ResultSuccessPage = () => {
    const location = useLocation();
    const history = useHistory();
    // const {title, subTitle} = location.state;

    return <Result
        status="success"
        title="Submitted successfully"
        subTitle="Your action has been submitted"
        extra={[
            <Button type="primary" key="console" onClick={() => history.push("/jobfair-list")}>
                Back to home page
            </Button>,
        ]}
    />;
}