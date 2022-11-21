import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {Link} from "react-router-dom";

function NavBar() {

  function handleClick(name) {
    return () => {
      document.getElementByClassName(name).style.color="#3F4E4F";
    }
  }

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
    <div style={{backgroundColor: "rgb(217, 235, 243)"}} className="position-sticky pt-3 sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link onClick={handleClick("dashboard")} className="dashboard nav-link nav-link.active" aria-current="page" to="/dashboard">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home align-text-bottom" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> */}
            <DashboardIcon style={{marginRight:"3px", marginBottom:"2px"}} />
            Dashboard
          </Link>
          <hr/>
        </li>
        
        <li className="nav-item">
            <Link onClick={handleClick("qr-code")} className="qr-code nav-link" to="/generateQR">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file align-text-bottom" aria-hidden="true"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg> */}
            <QrCodeIcon style={{marginRight:"3px"}}/>
            Generate QR Code
          </Link>
          <hr/>
        </li>
        
        <li className="nav-item">
          <Link id='navLink' className="nav-link" to="/createAdmin">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart align-text-bottom" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> */}
              <PersonAddAltIcon style={{marginRight:"3px"}}/>
            Create Admin
          </Link>
          <hr/>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="/report">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2 align-text-bottom" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> */}
              <AssessmentIcon style={{marginRight:"3px"}}/>
            Report
          </Link>
          <hr/>
        </li>
        
        <li className="nav-item">
            {localStorage.getItem('token') ? <Link className="nav-link" onClick={()=>{localStorage.removeItem('token')}} to='/login'>
            <LogoutIcon style={{marginRight:"3px"}}/>
            Log Out
            </Link> : ""}
          <hr/>
        </li>
        
      </ul>

      
    </div>
  </nav>
    )
}

export default NavBar

