import React from 'react';
import { Avatar, Typography, Button } from 'antd';
import styled from 'styled-components';
import { auth, db } from '../../Firebase/config';
import { AuthContext } from '../Context/AuthProvider';
const WapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

function UserInfo(props) {

    // React.useEffect(()=>{
    //     db.collection('rooms').onSnapshot((snapshot)=>{
    //         const data = snapshot.docs.map(doc =>({
    //             ...doc.data(),
    //             id:doc.id
    //         }))
    //         console.log({data, snapshot, docs: snapshot.docss});
    //     })
    // },[])

    const { user: {
        displayName,
        photoURL
    }} = React.useContext(AuthContext)

    return (
        <div>
            <WapperStyled>
                <div>
                    <Avatar src={photoURL}>
                         {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography.Text className="username">{displayName}</Typography.Text>
                </div>
                <Button ghost onClick={() => {
                // clear state in App Provider when logout
                // clearState();
                auth.signOut();
        }}>LogOut</Button>
            </WapperStyled>
        </div>
    );
}

export default UserInfo;