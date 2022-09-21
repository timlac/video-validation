import { Radio } from 'antd';
import React, {useContext, useState} from 'react';
import {useLocation} from "react-router-dom";
//import {UserContext} from "./UserForm";

// export const UserContext = React.createContext();


export default function VideoPage({props}){

    const [value, setValue] = useState(1);

    const location = useLocation();
    console.log(location.state);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    // const postTheThing = () => {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url: 'http://localhost:8080/post',
    //             type: 'POST',
    //             data: {
    //                 email: location.state.email,
    //                 gender: location.state.gender
    //             },
    //             success: function(data) {
    //                 console.log("HURRA");
    //             },
    //             error: function(data) {
    //                 console.log("skit också");
    //             }
    //         })
    //     })
    // }
    //
    // postTheThing().then()



    return (
        // <UserContext.Consumer>

            // {value => <div> {value} </div>}

            <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </Radio.Group>



    );
};


