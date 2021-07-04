import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import AppProvider, { AppContext } from '../Context/AppProvider';
import { addDocument } from '../../Firebase/services';
import { AuthContext } from '../Context/AuthProvider';

function AddRoomModal(props) {
    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext)
    const {user:{uid}} = useContext(AuthContext)
    const [form] = Form.useForm();
    const handleOk = () =>{

        console.log({formData: form.getFieldValue()});
        addDocument('rooms', {...form.getFieldValue(), members: [uid]})
        //reset form value
        form.resetFields();
        setIsAddRoomVisible(false);
    };
    const handleCancel = () =>{
        setIsAddRoomVisible(false);
    }

    return (
        <div>
            <Modal
                title="Create Room"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Room Name" name="name">
                        <Input placeholder="Enter Room Name..."/>
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Enter Description..."/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;