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
    };

    return (
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
    );
};


