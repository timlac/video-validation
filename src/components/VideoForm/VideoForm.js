import { Radio } from 'antd';
import React, {useEffect, useState, useReducer} from 'react';
import { Button, Form, Tooltip } from 'antd';
import {emotionDefinitions, emotions1, emotions2} from "../../constants/Emotions";
import {putItem, getItem} from "../../services/GetAndSet";

const videoBasePath = "https://dizrdtyhmcwjf.cloudfront.net/"

function concatUrl(videoKey) {
    return videoBasePath + videoKey
}

export default function VideoForm() {

    const [currentVideoUrl, setCurrentVideoUrl] = useState("")
    const [currentItem, setCurrentItem] = useState();

    useEffect( () => {
        if(currentItem) {
            return;
        }
        getItem()
            .then(item => {
                console.log(item["Items"][0])
                setCurrentItem(item["Items"][0])
                setCurrentVideoUrl(concatUrl(item["Items"][0]["video_id"]))
            })
    })

    return (
        <div>
            {currentVideoUrl}
            <div><p>{currentVideoUrl}</p></div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <video controls width="50%" src={currentVideoUrl} />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            </div>
        </div>
    );
};