import { Radio } from 'antd';
import React, {useContext, useState} from 'react';
// import {Form, useLocation} from "react-router-dom";
import {UserContext} from "./Context";
import { Button, Form, Tooltip } from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {emotionDefinitions, emotions1, emotions2} from './constants'


export default function VideoPage({emotions}){
    const location = useLocation();
    console.log(location.state.emotions)

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [value, setValue] = useState(1);

    const onFinish = () => {
        fetch('http://127.0.0.1:5100/add_response',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "user": user,
                    "response": value
                })
            }).then(res => {
            return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('error'))

        navigate('/VideoPage', {state: {"emotions": emotions2}})
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        console.log(user)
    };

    fetch('http://127.0.0.1:5100/name/A55_mix_ang_disg_5050.mp4', {mode: 'cors'})
        .then((response) => response.json())
        .then((data) => console.log(data));

    const video_url = 'http://127.0.0.1:5100/A55_mix_ang_disg_5050.mp4'


    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <video controls width="50%">
                    <source src={video_url} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Form name="control-hooks" onFinish={onFinish}>
                    <Form.Item>
                        <Radio.Group onChange={onChange} onFinish={onFinish} style={{ marginTop: 16 }} size="large" buttonStyle="solid">
                            {location.state.emotions.map((emotion) => (
                            <Tooltip title={emotionDefinitions[emotion]} color={"blue"} key={emotion}>
                              <Radio.Button value={emotion}>{emotion}</Radio.Button>
                            </Tooltip>
                          ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
};