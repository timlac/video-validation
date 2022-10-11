import {Radio, Button, Form, Tooltip, Spin, Alert, message, PageHeader} from 'antd';
import React, {useEffect, useState, useReducer, useRef} from 'react';
import './VideoForm.css'

import {emotionDefinitions, emotions1, emotions2, emotiontypes} from "../../constants/Emotions";
import {putItem, getItem} from "../../services/GetAndSet";
import useToken from "../App/useToken";

const videoBasePath = "https://dizrdtyhmcwjf.cloudfront.net/"

function concatUrl(videoKey) {
    return videoBasePath + videoKey
}

export default function VideoForm() {


    const info = () => {
      message.info('Choose the emotion that you think is portrayed in the video');
    };

    const { token, setToken } = useToken();

    const [videoEnded, setVideoEnded] = useState(false)

    const [outOfVideos, setOutOfVideos] = useState(false)
    const [reply, setReply] = useState();
    const [dataItem, setDataItem] = useState();
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async event => {
        setSubmitting(true);
        console.log("submitting data item ", dataItem)
        await putItem(dataItem)
        setSubmitting(false)
        setDataItem()
        setReply()
        setVideoEnded(false)

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
                if (item["Items"].length === 0){
                    setOutOfVideos(true)
                } else {
                    setDataItem(item["Items"][0])
                    setCurrentVideoUrl(concatUrl(item["Items"][0]["video_id"]))
                }
            })
    })

    if (outOfVideos) {
        return <div>
            <Alert
      message="All done!"
      description="No more videos left to evaluate. Thank you for your participation!"
      type="success"
      showIcon
    /></div>
    }

    if (dataItem === undefined){
        return <div className="spinner">
                    <Spin size="large"/>
                  </div>
    }

    return (
        <div>
            <div className="info">
                  <PageHeader
                className="site-page-header"
                title="Känsla"
                subTitle="Välj den känsla som stämmer bäst överens med videon och tryck på submit!"
              />

            </div>
            <div className="video">
                <video controls width="50%" src={currentVideoUrl} autoPlay onEnded={() => setVideoEnded(true)}/>
            </div>
            <div className="form">
                <Form onFinish={handleSubmit}>
                    <Form.Item>
                        <Radio.Group name="reply"
                                     disabled={submitting}
                                     onChange={handleChange}
                                     style={{ marginTop: 36 }}
                                     size="large"
                                     buttonStyle="solid"
                                     >
                            {emotiontypes[dataItem["emotion_type"]].map((emotion) => (
                                <Tooltip title={emotionDefinitions[emotion]} color={"blue"} key={emotion} placement="top" >
                                    <Radio.Button value={emotion}>{emotion}</Radio.Button>
                                </Tooltip>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={submitting || !reply || !videoEnded} type="primary" htmlType="submit">
                            Submit
                        </Button>
                        {submitting &&
                            <div>Submitting...</div>
                        }
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};