import React from "react";
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Login from '../src/Pages/login/login';
import Learnmore from "../src/Pages/Learnmore/Learnmore";
import School from "../src/Pages/AboutUs/AboutUs";
import Patent from "../src/Pages/Patent/Patent";
import Policy from "../src/Pages/Policy/Policy";
import AboutUs from "../src/Pages/School/School";
import Staff from "../src/Pages/Staff/Staff";


function App() {
  return (
    
      <div className="App">
          <Router>
            <div >
            <Routes>
                
                <Route path="/" element={<Login/>}/>
                <Route path="/Learnmore" element={<Learnmore/>}/>
                <Route path="/School" element={<School/>}/>
                <Route path="/Patent" element={<Patent/>}/>
                <Route path="/Policy" element={<Policy/>}/>
                <Route path="/AboutUs" element={<AboutUs/>}/>
                <Route path="/Staff" element={<Staff/>}/>
                
            </Routes>
            </div>
          </Router>
      </div>
     
      
    );
  }

export default App;