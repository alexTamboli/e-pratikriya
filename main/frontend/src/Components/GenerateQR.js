import React,{useState} from 'react'
import Header from './Header'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

const GenerateQR = (props) => {
    const [source, setSource] = useState("");

    const [PS, setPS] = useState({name:"",city:"",subdivision:"",district:""});

    let navigate = useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(PS);
        const{name,city,subdivision,district} = PS
        const response = await fetch("http://localhost:8000/admin/getPID", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, city, subdivision, district })
        });
        const json = await response.json();

        setSource(json.src);
        if (json.success) {
            // Save the auth token and redirect it
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login Successfully", "success");
            navigate('/dashboard');
        } else {
            props.showAlert("Invalide details", "danger")
        }
    }

  

    const onChange=(e)=>{
        setPS({...PS,[e.target.name]:e.target.value})
    }

    
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">

          <NavBar></NavBar>
          <form className="col-md-9 ms-sm-auto col-lg-10 px-md-4" method='POST' onSubmit={handleSubmit}>
          <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Generate QR Code</h1>
            </div>
            
            
              
              <div className="row g-3 align-items-center">
                <div className="container">
                  <div className="row row-cols-2">
                    <div className="col entry">
                    <div className="col-auto">
                        <label for="" className="col-form-label">
                          Enter City
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" id="floatingInput" name='city' value={PS.city}onChange={onChange}/>
                     
      
                      </div>
                    </div>

                    <div className="col entry">
                      <div className="col-auto">
                        <label for="" className="col-form-label">
                          Enter District
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" name='district' value={PS.district}onChange={onChange}/>
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols-2">
                    <div className="col entry">
                      <div className="col-auto">
                        <label for="" className="col-form-label">
                          Enter Sub-Division/Area
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" name='subdivision' value={PS.subdivision}onChange={onChange}/>
                      </div>
                    </div>

                    <div className="col entry">
                      <div className="col-auto">
                        <label for="" className="col-form-label">
                          Enter Police Station
                        </label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" name='name' value={PS.nam} onChange={onChange}/>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              
   
              <div className="result d-grid gap-2 col-4 mx-auto">
                <button style={{marginTop:"30px"}} className='btn btn-outline-primary'>Generate QR Code</button>
                 
               {source &&  <div className="container-fluid text-center">
                <hr/>
                <img className='mx-auto' src={source} width="300px" height="300px" />
               
                <button style={{ marginTop: "10px", marginBottom: "20px" }} className='btn btn-dark d-grid gap-2 col-7 mx-auto' href={source} download><a style={{ color: "white" ,textDecoration:"none"}} href={source} download>Download</a></button>
                 </div>}
                
            </div>
       
            
          </form>
          
        </div>
        
      </div>

    </div>
  )
}

export default GenerateQR
