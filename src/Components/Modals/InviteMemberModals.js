import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import { debounce } from 'lodash';
import { db } from '../../Firebase/config';

function DebounceSelect({fetchOptions, debounceTimeout = 300, ...props}){
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debounceFetcher = React.useMemo(()=>{
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);
            fetchOptions(value, props.curMembers).then((newOptions) =>{
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout)
    },[debounceTimeout, fetchOptions]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> :null}
            {...props}
        >
            {options.map((  opt) => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size="small" src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}
async function fetchUserList(search, curMembers) {
    return db
      .collection('users')
      .where('keywords', 'array-contains', search?.toLowerCase())
      .orderBy('displayName')
      .limit(20)
      .get()
      .then((snapshot) => {
        return snapshot.docs
          .map((doc) => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL,
          }))
          .filter((opt) => !curMembers.includes(opt.value));
      });
  }
function InviteMemberModal(props) {
    const [value, setValue] = useState([]);
    const {isInviteMemberVisible, setIsInviteMemberVisible,selectedRoomId,selectedRoom} = useContext(AppContext)
    const {user:{uid}} = useContext(AuthContext)
    const [form] = Form.useForm();
    const handleOk = () =>{

        //update
        const roomRef = db.collection('rooms').doc(selectedRoomId);

            roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });
                //reset form value
        form.resetFields();
        setIsInviteMemberVisible(false);
    };
    const handleCancel = () =>{
        setIsInviteMemberVisible(false);
    }
    console.log({value});
    return (
        <div>
            <Modal
                title="Invite Members"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Members Name"
                        value={value}
                        placeholder="Enter member name..."
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{width:'100%'}}
                        curMembers={selectedRoom.members}
                    />
                        
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberModal;