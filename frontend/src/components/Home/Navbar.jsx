import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../css/Navbar.css';

function Navbar() {
  const slideIn = useSpring({
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  });
   const {log,setlog}=useState("Register")
  const navigate = useNavigate();
  const role = localStorage.getItem('selectedRole');
  const isAuth = localStorage.getItem('isAuthorized');
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const  superAdmin  = isAuth && user && role=='superAdmin';
  const Admin= isAuth && user && role=='Admin' ;
  
  const student = isAuth && user && role=='student';
  
  const selectedRole = localStorage.getItem('selectedRole');

  const logout = async () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    if (isConfirmed) {
      try {
        await axios.get(`http://localhost:3000/api/${selectedRole}/v1/logout`, {
          withCredentials: true,
        });

        localStorage.removeItem('selectedRole');
        localStorage.removeItem('email');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthorized');

        toast.success('Successfully logged out');
        navigate('/');
      } catch (error) {
        toast.error('Something went wrong during logout');
        console.error(error);
      }
    }
  };
  return (
    <animated.nav style={slideIn} className="navbar" id='navbar'>
      <div className="navbar-logo">
        <img
          src="https://img.icons8.com/?size=100&id=WmJIacfzJQdz&format=png&color=000000"
          alt="Logo"
        />
      </div>

{ superAdmin &&   <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/createAdmin">CreateAdmin</a></li>
        <li><a href="/ViewAdmins">View Admin History</a></li>
        <li><a href="/AllQuizzes">View All Quizzes</a></li>
        <li><a href="/ViewStudent">View Student History</a></li>

        <li><a onClick={logout}>Logout</a></li>
      </ul>}
      { Admin &&   <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/createQuiz">Create Quiz</a></li>
        <li><a href="/AllQuizzes">View All Quizzes</a></li>
        <li><a href="/Quizzes">View My Quizzes</a></li>
        <li><a href="/ViewStudent">View Student History</a></li>
        <li><a onClick={logout}>Logout</a></li>
      </ul>}
      { student &&   <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/AllQuizzes">View All Quizzes</a></li>
        <li><a href="/Academic">Academic History</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a onClick={logout}>Logout</a></li>
      </ul>}
 {  !isAuth && <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
          <li><a href="/Register">Register</a></li>
      </ul>

}     
    </animated.nav>
  );
}

export default Navbar;
