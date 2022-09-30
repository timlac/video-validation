import { Radio } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
// import {Form, useLocation} from "react-router-dom";
import {UserContext} from "./Context";
import { Button, Form, Tooltip } from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {emotionDefinitions, emotions1, emotions2} from './constants'
import {type} from "@testing-library/user-event/dist/type";


export default function VideoPage({emotions}){
    const location = useLocation();
    console.log(location.state.emotions)

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [value, setValue] = useState(1);
    const [dbItem, setDbItem] = useState();
    const [videoUrl, setVideoUrl] = useState("empty video url");

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

    useEffect(() => {
        if(!dbItem) {
            fetch("https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items/tim", {mode: 'cors'})
            .then((response => response.json()))
            .then((response) => setDbItem(response["Items"][0]));
        }
    }, [dbItem]);

    useEffect(() => {
        if(videoUrl === "empty video url"){
            console.log("video url is null")
            if (dbItem) {
                console.log("db item exists")
                setVideoUrl("https://dizrdtyhmcwjf.cloudfront.net/" + dbItem["video_id"])
            }
        }
    })


    // useEffect(() => {
    //     if(dbItem) {
    //         video_url = "https://dizrdtyhmcwjf.cloudfront.net/" + dbItem["video_id"]
    //     }
    // }, [video_url]);

    console.log("logging db item: ", dbItem);
    console.log(videoUrl)

    // useEffect(() => {
    //     fetch("https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items/tim", {mode: 'cors'})
    //         .then((response => response.json()))
    //         .then((response) => setDbItem(response["Items"][0]))
    // })

    // fetch('http://127.0.0.1:5100/A72_ang_p_4.mov', {mode: 'cors'})
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));

    // const video_url = 'http://127.0.0.1:5100/A220_ang_v_3.mov'

    // console.log(video_url + dbItem["video_id"])

    if (videoUrl === "empty video url"){
        return <div>Loading...</div>
    }

    return (
        <div>
            <div><p>{videoUrl}</p></div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <video controls width="50%">
                    <source src={videoUrl} type="video/mp4" />
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
            {/*<div>*/}
            {/*    <p>{dbItem["video_id"]}</p>*/}
            {/*    <p>"hej"</p>*/}
            {/*</div>*/}
        </div>
    );
};