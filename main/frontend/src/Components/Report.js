import React,{useState} from "react";
import NavBar from './NavBar'
import Header from './Header'

function Report() {

    const [feedbacks, setFeedbacks] = useState([]);

    const handleClick = async () => {

        // document.getElementByClassName("file-images").style.display = "block";
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

        const resp = await fetch('http://localhost:8000/admin/report',{
            method:"POST",
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbacks)
        })

 	    
    }


    return (
        <div>
 
            <Header />
            <div className="container-fluid">
                <div className="row">

                    <NavBar/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Report</h1>
                <button type='submit' onClick={handleClick} className="btn btn-primary">Click me</button>
              </div>
              <div className="file-images">
                            <div>
                                <h4>Question 1</h4>
                                <img className="mb-4" src="/images/file2.jpeg" alt="logo" width="500" />
                            </div>
              <div>
              <h4>Question 2</h4>
                <img style={{marginLeft: "30px"}}  className="file-image mb-4" src="/images/file.jpeg" alt="logo" width="500"/>
              </div>
              
                </div>
                </main>
                </div>
            </div>
        </div>
    )
}

export default Report;