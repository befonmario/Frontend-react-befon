import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Button } from 'antd';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {

        const token = localStorage.getItem('token');

        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const url = `http://localhost:3000/quizzes/exam/${id}`;
        const response = await axios.get(url, axiosConfig);
        const data = response.data;
        console.log('Quiz data:', data);
        
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [id]);

  if (!quizData) return <div>Kuis masih private...</div>;

  return (
    <>
      <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <h1>{quizData.name}</h1>
        </Col>
      </Row>
      {quizData.questions_list.map((question, index) => (
        <React.Fragment key={question.question_number}>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <h3>{`${index + 1}. ${question.question}`}</h3>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <Button block>{question.options[1]}</Button>
            </Col>
            <Col span={12}>
              <Button block>{question.options[2]}</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <Button block>{question.options[3]}</Button>
            </Col>
            <Col span={12}>
              <Button block>{question.options[4]}</Button>
            </Col>
          </Row>
        </React.Fragment>
      ))}
    </>
  );
};

export default Quiz;
