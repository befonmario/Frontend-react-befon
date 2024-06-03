import React, { useEffect, useState } from 'react';
import { List, Card, Spin, Alert } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

const HistoryQuiz = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await axios.get('http://localhost:3000/quizzes/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401 || 500) {
            Swal.fire({
                title: "Failed!",
                text: error.response.data.message,
                icon: "error",
                timer: 2000,
                timerProgressBar: true
              });
        } else {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [navigate]);

  if (error) {
    return <Alert message="Error" description="Failed to load data" type="error" />;
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>History of Quizzes Taken</h2>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={`Nama: ${item.nama}`}>
                <p>Kuis yang sudah dikerjakan: {item["kuis yang sudah dikerjakan"]}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default HistoryQuiz;
