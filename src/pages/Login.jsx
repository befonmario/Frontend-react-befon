import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import api from '../axios/api';
import { useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';


const Login = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await api.post('/auth/login',{
                username : values.username,
                password : values.password
            })
            console.log(response)
            localStorage.setItem('token', response.data.token)
            navigate('/')
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
                    <Title level={2} style={{marginTop: 0}}>Login</Title>
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
                                Log in
                            </Button>
                            Or <Link to='/register'>register now!</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default Login