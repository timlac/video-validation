import { Radio } from 'antd';
import React, {useContext, useState} from 'react';
import {useLocation} from "react-router-dom";
import {UserContext} from "./Context";

export default function VideoPage({}){

    const {user, setUser} = useContext(UserContext);

    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        console.log(user)

        fetch('http://127.0.0.1:5100/add_response',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "user": user,
                    "response": e
                })
            }).then(res => {
                return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('error'))
    };

    fetch('http://127.0.0.1:5100/name/A55_mix_ang_disg_5050.mp4', {mode: 'cors'})
          .then((response) => response.json())
          .then((data) => console.log(data));

    const video_url = 'http://127.0.0.1:5100/A55_mix_ang_disg_5050.mp4'


    return (
        <div>
            <div>
                <video controls width="50%">
                    <source src={video_url} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>
            <div>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </Radio.Group>
            </div>
        </div>
    );
};


