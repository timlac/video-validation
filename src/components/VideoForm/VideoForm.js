import { Radio, Button, Form, Tooltip, Spin } from 'antd';
import React, {useEffect, useState, useReducer} from 'react';


import {emotionDefinitions, emotions1, emotions2} from "../../constants/Emotions";
import {putItem, getItem} from "../../services/GetAndSet";

const videoBasePath = "https://dizrdtyhmcwjf.cloudfront.net/"

function concatUrl(videoKey) {
    return videoBasePath + videoKey
}



export default function VideoForm() {

    const [itemData, setItemData] = useState()
    const [currentVideoUrl, setCurrentVideoUrl] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = event => {
        console.log("submitting: ", itemData)
        setSubmitting(true);
        putItem(itemData)
            .then(setSubmitting(false))
    }

    const handleChange = event => {
        setItemData({...itemData, ["reply"]: event.target.value})
    }

    useEffect( () => {
        if(itemData) {
            return;
        }
        getItem()
            .then(item => {
                console.log("setting form data...")
                console.log(item["Items"][0])
                setItemData(item["Items"][0])
                setCurrentVideoUrl(concatUrl(item["Items"][0]["video_id"]))
            })
    })

    return (
        <div>
            <div><p>{currentVideoUrl}</p></div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <video controls width="50%" src={currentVideoUrl} />
            </div>
            <Form onFinish={handleSubmit}>
                <Form.Item>
                    <Radio.Group name="reply"
                                 disabled={submitting}
                                 onChange={handleChange}
                                 style={{ marginTop: 16 }}
                                 size="large"
                                 buttonStyle="solid">
                        {emotions1.map((emotion) => (
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
    );
};