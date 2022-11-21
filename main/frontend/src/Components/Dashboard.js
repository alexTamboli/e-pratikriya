import React, { useState } from 'react'
import NavBar from './NavBar'
import '../Dashboard.css'
import Header from './Header'

// import Parameters from './Parameters';

const Dashboard = () => {

  const [feedbacks, setFeedbacks] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [subdivision, setsubdivision] = useState("");
  let q1 = ["", "Through a person known to a police officer", "With a neighbour/local leader", "On your own"];
  let q2 = ["", "More than 15 minutes", "15 minutes", "10  minutes", "5 minutes", "Immediately"];
  const handleClick = async () => {

    document.getElementById("outputs").style.display = "block";
    // API CALL
    const response = await fetch(`http://localhost:8000/admin/getFeedback`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });

    const json = await response.json();
    setFeedbacks(json);

    console.log(feedbacks);
  }

  return (
    <div >

      <Header></Header>
      <div className="container-fluid">
        <div className="row">

          <NavBar></NavBar>
          <main style={{ backgroundColor: "rgb(250, 250, 250)" }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2" >Dashboard</h1>
            </div>

            <div className="form-floating">
              <div className="row g-3 align-items-center">
                <div className="container">
                  <div className="row row-cols-2">
                    <div className="col entry">
                      <div className="col-auto">
                        <label htmlFor="" class="col-form-label">
                          Enter City
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" value={city} onChange={(e) => { setCity(e.target.value) }} />
                      </div>
                    </div>

                    <div className="col entry">
                      <div className="col-auto">
                        <label htmlFor="" class="col-form-label">
                          Enter District
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" value={district} onChange={(e) => { setDistrict(e.target.value) }} />
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols-2">
                    <div className="col entry">
                      <div className="col-auto">
                        <label htmlFor="" class="col-form-label">
                          Enter Sub-Division/Area
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" value={subdivision} onChange={(e) => { setsubdivision(e.target.value) }} />
                      </div>
                    </div>

                    <div className="col entry">
                      <div className="col-auto">
                        <label htmlFor="" class="col-form-label">
                          Enter Police Station
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols-2">
                    <div className="col entry">
                      <div className="col-auto">
                        <label htmlFor="" class="col-form-label">
                          Select Date
                        </label>
                      </div>
                      <div className="col-auto">
                        <label htmlFor="" class="">
                          From
                        </label>
                        <input className="form-control" type="date" />
                      </div>
                    </div>

                    <div className="col entry">
                      <div className="col-auto">
                        <br />
                        <label htmlFor="" class="col-form-label">
                          To
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="date" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="result d-grid gap-2 col-4 mx-auto">
              <button type='submit' style={{ marginTop: "50px" }} className='btn w-5px btn-outline-primary' onClick={handleClick}>Get Feedbacks</button>
            </div>

            <div id='outputs'>
              <h2 style={{ marginTop: "40px" }}>Feedbacks</h2>
              <div className="tables table-responsive">

                <table className="table table-striped table-sm">
                  <thead >
                    <tr>
                      <th scope="col">options</th>
                      <th scope="col">question-1</th>
                      <th scope="col">question-2</th>
                      <th scope="col">question-3</th>
                      <th scope="col">Date</th>
                      <th scope="col">City</th>
                      <th scope="col">District</th>
                      <th scope="col">Police Station</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      feedbacks.filter((feedback) => (feedback.fbcity === city || feedback.fbdistrict === district)).map((feedback) => {
                        return (<tr key={feedback._id}>
                          <td>option</td>
                          <td>{q1[feedback.question1]}</td>
                          <td>{q2[feedback.question2]}</td>
                          <td>{feedback.question3}</td>
                          <td>{feedback.date}</td>
                          <td>{feedback.fbcity}</td>
                          <td>{feedback.fbdistrict}</td>
                          <td>{feedback.fbpoliceStation}</td>
                        </tr>
                        )
                      })}
                  </tbody>

                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* 
      <script src="/docs/5.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossOrigin="anonymous"></script>

      <script src="httsubdivision://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossOrigin="anonymous"></script><script src="httsubdivision://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossOrigin="anonymous"></script><script src="dash.js"></script> */}


    </div>

  )
}

export default Dashboard;