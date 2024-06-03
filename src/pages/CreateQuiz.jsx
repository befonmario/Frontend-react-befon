import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Select, Card } from 'antd';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

const { Option } = Select;

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    name: '',
    data: {
      questions_list: [],
      answer: {}
    },
    isPublished: false
  });

  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: 1 }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctOption: 1 }
    ]);
  };

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token JWT tidak ditemukan.');
        return;
      }

      const data = {
        questions_list: questions.map(({ question, options, correctOption }) => ({
          question,
          options: options.reduce((acc, option, index) => {
            acc[index + 1] = option;
            return acc;
          }, {}),
          correctOption
        }))
      };

      const newQuizData = { ...quizData, data };

      const response = await axios.post(
        'http://localhost:3000/quizzes',
        newQuizData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Kuis berhasil dibuat:', response.data);
      Swal.fire({
        title: "Success!",
        text: "Succesfully made quiz!",
        icon: "success",
        timer: 2000,
        timerProgressBar: true
      });
    } catch (error) {
      console.error('Error saat membuat kuis:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Card title="Buat Kuis Baru">
          <label>Nama Kuis:</label>
          <Input
            placeholder="Masukkan Nama Kuis"
            value={quizData.name}
            onChange={(e) => setQuizData({ ...quizData, name: e.target.value })}
          />
          <br />
          {questions.map((question, index) => (
            <Card key={index} style={{ marginTop: '20px' }} title={`Soal ${index + 1}`}>
              <label>Pertanyaan:</label>
              <Input
                placeholder="Masukkan Pertanyaan"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(index, 'question', e.target.value)
                }
              />
              <br />
              {[1, 2, 3, 4].map((optionIndex) => (
                <div key={optionIndex} style={{ marginTop: '10px' }}>
                  <label>{`Opsi ${optionIndex}:`}</label>
                  <Input
                    placeholder={`Masukkan Opsi ${optionIndex}`}
                    value={question.options[optionIndex - 1]}
                    onChange={(e) =>
                      handleOptionChange(
                        index,
                        optionIndex - 1,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
              <Select
                value={question.correctOption}
                onChange={(value) =>
                  handleQuestionChange(index, 'correctOption', value)
                }
                style={{ width: '100%', marginTop: '10px' }}
              >
                {[1, 2, 3, 4].map((optionIndex) => (
                  <Option key={optionIndex} value={optionIndex}>
                    {`Pilihan Jawaban Benar: ${optionIndex}`}
                  </Option>
                ))}
              </Select>
            </Card>
          ))}
          <Button type="primary" onClick={addQuestion} style={{ marginTop: '20px' }}>
            Tambah Pertanyaan
          </Button>
          <br />
          <Button
            type="primary"
            onClick={handleCreateQuiz}
            style={{ marginTop: '20px' }}
          >
            Buat Kuis
          </Button>
        </Card>
      </div>
    </>
  );
};

export default CreateQuiz;
