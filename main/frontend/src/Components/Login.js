import React, {useState} from 'react'
import "../Login.css"
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
  let navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  
  
  const handleSubmit= async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/admin/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();


    if (json.success) {
      // Save the auth token and redirect it
      localStorage.setItem('token', json.authtoken);
      alert("Login Successfully");
      // props.showAlert("Login Successfully", "success");
      navigate('/dashboard');
    } else {
      alert("Invalid credentials");
      // props.showAlert("Invalide details", "danger")
    }
  }
  
  
    return (
    <main className="form-signin">
    
        <form action="/dashboard"onSubmit={handleSubmit} >
            <div className='image'>
                <img  className="mb-4" src="/images/Gujarat_Police_Logo.png" alt="logo" width="130"/>
            </div>
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>e-Pratikriya</h2>
            <div className="form-floating">
                <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
           
            <button className="sign-in w-100 btn btn-lg btn-secondary" type="submit">Sign in</button>
            
        </form>
    </main>
  )
}

export default Login;