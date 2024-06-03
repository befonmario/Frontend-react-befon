import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Space, Table, Tag, Button, message } from 'antd';
import Title from 'antd/es/typography/Title';
import Navbar from '../components/Navbar';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary" danger onClick={() => handleDelete(record.id)}>Delete</Button>
            </Space>
        ),
    },
];

const handleDelete = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        setData(data.filter(user => user.id !== userId));
        message.success('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        message.error('Failed to delete user');
    }
};


const DataUser = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <Row span={20}>
                <Col>
                    <Title>Data User</Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey="id"
                    />
                </Col>
            </Row>
        </>
    );
};

export default DataUser;
