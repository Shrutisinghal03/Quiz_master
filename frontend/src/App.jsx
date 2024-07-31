import { useState } from 'react'
  import './App.css'
import { ToastContainer} from 'react-toastify';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Login2 from './components/Auth/Login2'
import Navbar from './components/Home/Navbar';
import Home from './components/Home/Home';
import Forgot from './components/Auth/Forgot';
import ResetPassword from './components/Auth/ResetPassword';
import CreateAdmin from "./components/SuperAdmin/CreateAdmin"
import ProfilePage from './components/SuperAdmin/ProfilePage';
import ViewAdmins from './components/SuperAdmin/ViewAdmins';
import AddQuiz from './components/Admin/AddQuiz';
import Publish from './components/Admin/Publish';
import Quizzes from './components/Admin/Quizzes';
import Admin from './components/SuperAdmin/Admin';
import ViewStudents from './components/SuperAdmin/ViewStudents';
import BasicPie from './components/SuperAdmin/BasicPie';
import EditQuiz from './components/Admin/EditQuiz';
import AttemptQuiz from './components/Student/AttemptQuiz';
import QuizPage from './components/Student/QuizPage';
import Timer from './components/Student/Timer';
import Result from './components/Student/Result';
import Academic from './components/Student/Academic';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
       <Navbar></Navbar>
        <Routes>
          <Route path="/Register" element={<Login />} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/ResetPassword" element={<ResetPassword/>} />
          <Route path="/Login" element={<Login2/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/createAdmin" element={<CreateAdmin/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/ViewAdmins" element={<ViewAdmins/>} />
          <Route path="/createQuiz" element={<AddQuiz/>} />
          <Route path="/Quizzes" element={<Publish/>} />
          <Route path="/AllQuizzes" element={<Quizzes/>} />
          <Route path="/ViewStudent" element={<ViewStudents/>} />
          <Route path="/Update" element={<EditQuiz/>} />
          <Route path="/Result" element={<Result />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/Pie" element={<BasicPie/>} />
          <Route path="/AttemptQuiz" element={<QuizPage/>} />
          <Route path="/timer" element={<Timer/>} />
          <Route path="/Academic" element={<Academic/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
