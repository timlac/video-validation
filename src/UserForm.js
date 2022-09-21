import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Form, Input, Select } from 'antd';
import VideoPage from "./VideoPage";
import {useNavigate} from "react-router-dom";

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

//export const UserContext = React.createContext();

const UserForm = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();


    const [user, setUser] = useState({
        email: "",
        gender: ""
    });

    console.log(user)

    const onFinish = (values) => {
        const user = values;

        console.log(values);
        console.log(user);
        navigate('/VideoPage', {state: {user: user}});
    };

    const onReset = () => {
        form.resetFields();
    };

    return (

        // <UserContext.Provider value={user.email}>

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

        // </UserContext.Provider>
    );
};

export default UserForm;