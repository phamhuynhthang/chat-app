import React from 'react';
import { Row, Col,Button, Typography } from 'antd';
import firebase, { auth, db } from '../../Firebase/config';

import { addDocument, generateKeywords } from '../../Firebase/services';


const fbProvider = new firebase.auth.FacebookAuthProvider();
// const googleProvider = new firebase.auth.GoogleAuthProvider();

const {Title} = Typography;
function Login(props) {
    
    const handleLogin = async() => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(fbProvider);
            console.log(user);
    
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase()),
              });
                
        }
      };
      
    
    return (
        <Row justify='center' >
            <Col span={8}>
                <Title style={{textAlign:'center'}} level={3}>Fun Chat</Title>

                <Button style={{marginBottom:5, width:"100%"}}>
                    Login by Google
                </Button>

                <Button style={{ width:'100%'}} onClick={handleLogin}>
                    Login by Facebook
                </Button>
            </Col>
        </Row>
    );
}

export default Login;