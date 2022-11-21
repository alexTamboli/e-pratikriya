import {useState} from 'react'
import NavBar from './NavBar'
import Header from './Header'
import {useNavigate} from "react-router-dom";


function CreateAdmin(props) {
    let navigate = useNavigate();

    const [admin, setAdmin] = useState({email:"",name:"",password:"",dob:""})

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const { name, email, password } = admin;

        const response = await fetch("http://localhost:8000/admin/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/dashboard');
            alert("Admin added Successfully");
        } else {
            alert("Invalid credentials");
        }
    }

    const onChange=(e)=>{
        setAdmin({...admin,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">

                    <NavBar />
                    <form className="col-md-9 ms-sm-auto col-lg-10 px-md-4" onSubmit={handleSubmit}><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>

                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Create Admin</h1>
                        </div>

                        <div class="col  row row-cols-2">
                            <div class="entry form-floating mb-3">
                                <input type="text" className="form-control" id="name" value={admin.name} onChange={onChange} name="name"/>
                                <label style={{marginLeft: "6px"}} htmlFor="name">Name</label>
                            </div>
                            <div class="entry form-floating mb-3">
                                <input type="date" className="form-control" id="dob"  value={admin.dob} onChange={onChange} name="dob"/>
                                <label style={{marginLeft: "6px"}} htmlFor="dob">Date of Birth</label>
                            </div>
                        </div>

                        <div class="col  row row-cols-2">
                            <div class="entry form-floating mb-3">
                                <input type="email" className="form-control" id="email"  value={admin.email} onChange={onChange} name="email"/>
                                <label style={{marginLeft: "6px"}} htmlFor="email">Email address</label>
                            </div>
                            <div class="entry form-floating">
                                <input type="password" className="form-control" id="password" value={admin.password} onChange={onChange} name="password"/>
                                <label style={{marginLeft: "6px"}} htmlFor ="password">Password</label>
                            </div>
                        </div>
                        <div className="result d-grid gap-2 col-4 mx-auto">
                            <button type='submit' style={{marginTop:"30px"}} className='btn w-5px btn-outline-primary'>Add</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAdmin;


