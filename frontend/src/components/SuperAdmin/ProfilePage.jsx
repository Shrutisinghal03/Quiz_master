import React, { useEffect, useState } from 'react';
import '../../css/ProfilePage.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

const ProfilePage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log(user._id);
        const response = await axios.get(`http://localhost:3000/api/Admin/v1/MentorQuiz/${user._id}`, {
          withCredentials: true, // This will include cookies in the request
        });
        console.log('Response:', response.data);
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    console.log('Quizzes state:', quizzes);
  }, [quizzes]);


  let totalQuiz = 0;
  let easy = 0;
  let moderate = 0;
  let hard = 0;
  {
    quizzes.map((q) => {
      if (q.difficultyLevel == "Moderate")
        moderate++;
      else if (q.difficultyLevel == "Easy")
        easy++;
      else if (q.difficultyLevel == "Hard")
        hard++;
      totalQuiz++;
    })
  }
  const data = [
    { id: 0, value: totalQuiz, label: 'TotalQuiz' },
    { id: 1, value: easy, label: 'Easy' },
    { id: 2, value: moderate, label: 'Moderate' },
    { id: 3, value: hard, label: 'Hard' },
  ];
  return (
    <div className="container-fluid" style={{ marginTop: '200px', zIndex: '10000' }}>
      <div className="main-body">

        <div className="row gutters-sm" style={{ display: "flex" }}>
          <div className="col-md-4 mb-3" >
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h4 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10">
                    </circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3
                     15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>PortFolio</h4>
                  <span className="text-secondary">https://bootdey.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h4 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h4>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h4 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h4>
                  <span className="text-secondary">@bootdey</span>
                </li>

              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h4 className="mb-0">Full Name</h4>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h4 className="mb-0">Email</h4>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h4 className="mb-0">Phone</h4>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    (239) 816-9029
                  </div>
                </div>
                <hr />



              </div>
            </div>

            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100" >
                  <div className="card-body">
                    <PieChart
                      series={[
                        {
                          data,
                          highlightScope: { faded: 'global', highlighted: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          label: {
                            offset: 20, // Adjust offset as needed
                            style: { fontSize: '14px', color: '#000', paddingLeft: '20px' }, // Customize label style
                          },
                        },
                      ]}
                      width={350} // Set an appropriate width (e.g., 300px)
                      height={200}
                    />






                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
