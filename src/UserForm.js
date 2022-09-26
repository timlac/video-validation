import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Form, Input, Select } from 'antd';
import VideoPage from "./VideoPage";
import {useNavigate} from "react-router-dom";
import { UserContext } from "./Context";
import { emotions1 } from './constants'


const { Option } = Select;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 16,
    },
};


const UserForm = () => {
    const {user, setUser} = useContext(UserContext);

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values) => {
        setUser(values)
        navigate('/VideoPage', {state: {"emotions": emotions1}});
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input
                />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                    },
                ]}
            ><Select
                placeholder="Select a option and change input text above"
                allowClear
            >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
            </Select>

            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserForm;