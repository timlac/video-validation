import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

import VideoPage from "./VideoPage";
import UserForm from "./UserForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/VideoPage" element={<VideoPage />} />
          <Route path="/UserForm" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);







// import React from 'react';
// // import ReactDOM from 'react-dom/client';
//
// import ReactDOM from 'react-dom'
//
// import './index.css';
// import UserForm from './UserForm';
// import reportWebVitals from './reportWebVitals';
//
// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <UserForm />
// //   </React.StrictMode>
// // );
//
// ReactDOM.render(
//     <UserForm />,
//     document.getElementById('root'),
// );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();