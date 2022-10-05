import { Radio, Button, Form, Tooltip, Spin } from 'antd';
import React, {useEffect, useState, useReducer} from 'react';
import './VideoForm.css'

import {emotionDefinitions, emotions1, emotions2, emotiontypes} from "../../constants/Emotions";
import {putItem, getItem} from "../../services/GetAndSet";
import useToken from "../App/useToken";

const videoBasePath = "https://dizrdtyhmcwjf.cloudfront.net/"

function concatUrl(videoKey) {
    return videoBasePath + videoKey
}

export default function VideoForm() {

    const { token, setToken } = useToken();

    const [emotionType, setEmotionType] = useState()
    const [reply, setReply] = useState()
    const [dataItem, setDataItem] = useState()
    const [currentVideoUrl, setCurrentVideoUrl] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = event => {
        setSubmitting(true);
        console.log("submitting data item ", dataItem)
        putItem(dataItem)
            .then(setSubmitting(false))
            .then(setDataItem())
            // .then(setDataItem())
    }

    const handleChange = event => {
        const myReply = event.target.value

        setReply(myReply)
        console.log(myReply)
        setDataItem({...dataItem, ["reply"]: myReply, ["processed_status"]: 1})

        console.log(dataItem)
    }

    useEffect( () => {
        if(dataItem) {
            return;
        }
        getItem(token)
            .then(item => {
                setDataItem(item["Items"][0])
                setCurrentVideoUrl(concatUrl(item["Items"][0]["video_id"]))
                setEmotionType(item["Items"][0]["emotion_type"])
            })
    })

    if (dataItem === undefined){
        return <div>Loading...</div>
    }

    return (
        <div>
            {/*<div>{emos.map(emo => <p>{emo}</p>)}</div>*/}
            <div><p>{currentVideoUrl}</p></div>
            <div className="video">
                <video controls width="50%" src={currentVideoUrl} />
            </div>
            <div className="form">
                <Form onFinish={handleSubmit}>
                    <Form.Item>
                        <Radio.Group name="reply"
                                     disabled={submitting}
                                     onChange={handleChange}
                                     style={{ marginTop: 16 }}
                                     size="large"
                                     buttonStyle="solid"
                                     >
                            {emotiontypes[dataItem["emotion_type"]].map((emotion) => (
                                <Tooltip title={emotionDefinitions[emotion]} color={"blue"} key={emotion}>
                                    <Radio.Button value={emotion}>{emotion}</Radio.Button>
                                </Tooltip>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={submitting} type="primary" htmlType="submit">
                            Submit
                        </Button>
                        {submitting &&
                            <div>Submitting form...</div>
                        }
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};