import { Radio, Button, Form, Tooltip, Spin } from 'antd';
import React, {useEffect, useState, useReducer} from 'react';
import './VideoForm.css'

import {emotionDefinitions, emotions1, emotions2} from "../../constants/Emotions";
import {putItem, getItem} from "../../services/GetAndSet";

const videoBasePath = "https://dizrdtyhmcwjf.cloudfront.net/"

function concatUrl(videoKey) {
    return videoBasePath + videoKey
}


export default function VideoForm() {

    const [dataItem, setDataItem] = useState()
    const [currentVideoUrl, setCurrentVideoUrl] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = event => {
        setSubmitting(true);
        putItem(dataItem)
            .then(setSubmitting(false))
    }

    const handleChange = event => {
        setDataItem({...dataItem, ["reply"]: event.target.value})
    }


    useEffect( () => {
        if(dataItem) {
            return;
        }
        getItem()
            .then(item => {
                console.log("setting form data...")
                console.log(item["Items"][0])
                setDataItem(item["Items"][0])
                setCurrentVideoUrl(concatUrl(item["Items"][0]["video_id"]))
                console.log("item data ", dataItem)
                console.log("done in then")
            })
        console.log("now we're out of then")
        console.log(dataItem)
        console.log(currentVideoUrl)
    })

    return (
        <div>
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
        </div>
    );
};