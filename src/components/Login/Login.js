import {useEffect, useState} from "react";
import {Alert, Button, Checkbox, Form, Input, Space, Spin} from 'antd';
import React from 'react';
import './Login.css'


async function verifyUser() {
    return fetch('https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items')
        .then(data => data.json())
}


export default function Login({setToken})  {

    const [alert, setAlert] = useState(false)
    const [checking, setChecking] = useState(false)

    useEffect(() => {
        if(checking) {
            setAlert(false)
        }
    }, [checking])


    const onFinish = async (values) => {
        setChecking(true)
        const data = await verifyUser()
        const items = data["Items"]
        const unique = [...new Set(items.map(item => item.alias))];

        console.log(values.username)

        if (unique.includes(values.username)){
            setChecking(false)
            console.log("setting username")
            console.log(values.username)
            setToken({"token": values.username})
        } else {
            setChecking(false)
            setAlert(true)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="loginForm">
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',

                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                {checking &&
                  <div className="spinner">
                    <Spin />
                  </div>
            }
                {alert &&  <Alert
                              message="Invalid username"
                              description="The username you've entered appears to be invalid"
                              type="error"
                            />}
            </Form.Item>
        </Form>
            </div>
    );
};