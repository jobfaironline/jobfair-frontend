import {Affix, Button, Space} from "antd";
import React from "react";

export const ControlButtonGroup = (props) => {
    const {addMoreComponentHandle, saveHandle, reviewHandle} = props;

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Affix offsetBottom={10}>
                <Space>
                    <Button type="primary" onClick={addMoreComponentHandle}>
                        Add more component
                    </Button>
                    <Button onClick={saveHandle} type="primary">
                        Save
                    </Button>
                    <Button type="primary" onClick={reviewHandle}>
                        Review
                    </Button>
                </Space>
            </Affix>
        </div>
    )
}