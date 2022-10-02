import {useState} from "react";
import {UserContext} from "../../Context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserForm from "../../UserForm";
import VideoPage from "../../VideoPage";

// export default function App() {
//
//     const [user, setUser] = useState({
//         email: "",
//         gender: ""
//     });
//
//     return (
//         <UserContext.Provider value={{user, setUser}}>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<UserForm/>}/>
//                     <Route path="/VideoPage" element={<VideoPage/>}/>
//                 </Routes>
//             </BrowserRouter>
//         </UserContext.Provider>
//     );
// }