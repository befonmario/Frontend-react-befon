import { Button, Card, Col, Row, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import api from '../axios/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Meta } = Card;

const Home = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/quizzes/exam', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuizzes(response.data);
        console.log(response)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error("Error fetching quizzes:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [navigate]);

  const startQuiz = (quizId) => {
    navigate(`/quizzes/exam/${quizId}`);
  };

  const publishQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/quizzes/publish/${quizId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuizzes(prevQuizzes => 
        prevQuizzes.map(quiz => 
          quiz.id === quizId ? {...quiz, isPublished: true} : quiz
        )
      );
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };
  
  return (
    <>
    <Navbar /> 
      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Col style>
          <Title level={2} span={24} style={{ marginBottom: '30px'}} >Available Quiz</Title>
        </Col>
      </Row>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        quizzes.length > 0 && (
          <Row gutter={[16, 16]}>
            {quizzes.map((quiz, index) => (
              <Col span={8} key={index}>
                <Card
                  style={{ border: '1px solid #ddd' }}
                  hoverable
                >
                  <Meta
                    title={<h2>{quiz.name}</h2>}
                    description={
                      <>
                        <p><strong>ID:</strong> {quiz.id}</p>
                        <p><strong>Jumlah Pertanyaan:</strong> {quiz.questions_list.length}</p>
                      </>
                    }
                  />
                  <Button type="primary" onClick={() => startQuiz(quiz.id)}>Mulai</Button>
                  {!quiz.isPublished && (
                    <Button style={{ marginTop: '10px' }} onClick={() => publishQuiz(quiz.id)}>Publish</Button>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        )
      )}
    </>
  );
}

export default Home;
