import './App.css';
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Alert from './Components/Alert';
import React,{useState} from "react";
import GenerateQR from "./Components/GenerateQR"
import Report from './Components/Report';
import CreateAdmin from './Components/CreateAdmin';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <BrowserRouter>
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard/> } />
          <Route exact path="/generateQR" element={<GenerateQR showAlert={showAlert} />}/>        
          <Route exact path="/" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/report" element={<Report showAlert={showAlert}/>}/>
          <Route exact path="/createAdmin" element={<CreateAdmin showAlert={showAlert}/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
