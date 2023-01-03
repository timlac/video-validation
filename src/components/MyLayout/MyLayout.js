import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import {Link, Route, Router, Routes} from "react-router-dom";
import Help from "../Help/Help";
import VideoForm from "../VideoForm/VideoForm";
import TestPage from "../Test/Test";

const { Header, Content, Footer } = Layout;


const MyLayout = () => (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                }}
            >

                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Help']}>
                    <Menu.Item key="Help">
                        <Link to="/Help">Intro</Link>
                    </Menu.Item>
                    <Menu.Item key="Experiment">
                        <Link to="/Experiment">Experiment</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <Routes>
                    <Route path="/Help" element={<Help/>} />
                    <Route path="/Experiment" element={<VideoForm/>} />
                    <Route path="/Test" element={<TestPage/>} />
                </Routes>
            </Content>
            <Footer></Footer>
        </Layout>

);
export default MyLayout;