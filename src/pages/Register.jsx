import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import api from '../axios/api';
import { useNavigate} from 'react-router-dom'
import Swal from '../utils/sweetAlert.js';


const Register = () => {
    const navigate = useNavigate()
    const [defaultRole, setDefaultRole] = useState('user');
    const onFinish = async (values) => {
        try {
            const response = await api.post('/auth/register',{
                username : values.username,
                name : values.name,
                email : values.email,
                password : values.password,
                role: defaultRole
            })
            if(response.status == 200){
                Swal.fire({
                    title: "Success!",
                    text: "Successfully Registered!",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true
                  });
                  setTimeout(() => {
                    navigate('/login')
                  }, 2000)


            }
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error.response.data.message,
                icon: "error",
                timer: 2000,
                timerProgressBar: true
              });
            console.log(error.response.data.message)
        }
    };
    return (
        <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
            <Col span={20}>
                <Card>
                    <Title level={2} style={{marginTop: 0}}>Register</Title>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                            size="large" 
                            placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                            size="large" 
                            placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message: 'Input a valid Email!',
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                            size="large" 
                            placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                size="large"
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{marginBottom:2}} block>
                                Sign Up
                            </Button>
                            Already have an account? <Link to='/login'>Login here</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default Register