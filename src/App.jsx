import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Quiz from './pages/Quiz'
import './App.css'
import Profile from './pages/Profile'
import HistoryQuiz from './pages/HistoryQuiz'
import DataUser from './pages/DataUser'
import CreateQuiz from './pages/CreateQuiz'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/quizzes/exam/:id' element={<Quiz />} />
      <Route path='/users/profile/:name' element={<Profile />} />
      <Route path='/quizzes/dashboard' element={<HistoryQuiz />} />
      <Route path='/quizzes' element={<CreateQuiz />} />
      <Route path='/users' element={<DataUser />} />
    </Routes>
  )
}

export default App
