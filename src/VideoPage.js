import { Radio } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
// import {Form, useLocation} from "react-router-dom";
import {UserContext} from "./Context";
import { Button, Form, Tooltip } from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {emotionDefinitions, emotions1, emotions2} from './constants'
import {type} from "@testing-library/user-event/dist/type";


export default function VideoPage({emotions}){
    // TODO: Make it impossible to submit without picking alternative
    // TODO: check for when all videos have been processed

    const location = useLocation();
    console.log(location.state.emotions)

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [reply, setReply] = useState(1);
    const [dbItem, setDbItem] = useState();
    const [videoUrl, setVideoUrl] = useState("empty video url");

    const onFinish = () => {

        fetch('https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items',
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dbItem)
            }).then(res => {
                console.log(res.json())
            return res
        })
            .then(data => console.log(data))
            .catch(error => console.log(error))

        setDbItem(undefined)

    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setDbItem({...dbItem, ["reply"]: e.target.value , ["processed_status"]: 1})
        // setDbItem({...dbItem, ["processed_status"]: 1})
        setReply(e.target.value);
    };

    useEffect(() => {
        if(!dbItem) {
            console.log("db item is undefined")
            fetch("https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items/tim", {mode: 'cors'})
                .then((response => response.json()))
                .then((response) => setDbItem(response["Items"][0]));
            setVideoUrl("empty video url")
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
        </div>
    );
};