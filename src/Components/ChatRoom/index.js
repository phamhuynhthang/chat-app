import React from 'react';
import { Row, Col } from 'antd' ;
import Sidebar from './Sidebar';
import Chatwindow from './Chatwindow'

function ChatRoom(props) {
    return (
        <Row>
            <Col span={6}><Sidebar /></Col>
            <Col span={18}><Chatwindow /></Col>
        </Row>
    );
}

export default ChatRoom;