import React from 'react';
import '../../App.css'; // Import CSS for styling
import Header from './Header'
import Footer from './Footer';
import Navbar from './Navbar';
import Card from './Card';
import HeroSection from './HeroSection';
import FeedbackPage from './FeedbackPage';

function Home() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <Navbar /> */}
      <HeroSection></HeroSection>
      <section className="main-content">
        {/* <div className="hero-section">
          <h1>Welcome to Beautiful Landing Page</h1>
          <p>This is a demo landing page with React.</p>
        </div> */}
        <div className="card-container">
          <Card
            title="4000+"
           text="Registered Students"
          logo="https://img.icons8.com/?size=100&id=XKedzxVhRNPR&format=png&color=000000"
          />
          <Card
            title="179+"
           text="   Mentors"
          logo="https://img.icons8.com/?size=100&id=mBzT9ySeO_go&format=png&color=000000"
          />
          <Card
            title="700+"
           text="Number Of Quizzes"
          logo="https://img.icons8.com/?size=100&id=UqbuvrrVAwTO&format=png&color=000000"
          />
          
          <Card
            title="230+"
           text="5 rating quizzes"
          logo="https://img.icons8.com/?size=100&id=MhJkWoOW6dEp&format=png&color=000000"
          />
          <Card
            title="89+"
           text="Phd Mentors"
          logo="https://img.icons8.com/?size=100&id=kmUrp7YjifpP&format=png&color=000000"
          />
            <Card
            title="539+"
           text="Quizzes Attempted"
          logo="https://img.icons8.com/?size=100&id=UqbuvrrVAwTO&format=png&color=000000"
          />
        </div>
        <div className="info-section">
          <h2>Learn More About Us</h2>
          <p>Here you can add more detailed information about your product or service.</p>
        </div>
        Add more sections and content as needed
       </section>
       <FeedbackPage/>
      <Footer /> 
    </div> 
  );
}

export default Home;
