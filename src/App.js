import { useState } from 'react';
import './App.css';
import {Toaster} from "react-hot-toast";


import {Route,Switch} from "react-router-dom";
import {Menu} from "./wholeComponents/MenuBar/menuBar";
import { LoginSignUp } from "./pages/Login&SignUp/loginSignUp";
import {MarkDown} from "./pages/markDown/markdown";
import {PasswordReset} from "./wholeComponents/passwordReset/passwordReset";

function App() {

 
  const [inputValue , setInputValue] = useState(); //for markup input

  const [menuBar,setMenuBar] = useState(false); // for menu open and close

  const [loggedIn,setLoggedIn] = useState(false); // for checking logged in status

  const [updation,setUpdation] = useState(false); // to check for data stored by users;

  const [darkMode,setDarkMode] = useState(false);  // for darkMode and light mode switch

  //for color change based on darkmode and light mode
  const backgroundStyle = {background:(darkMode)?"black":"rgb(243, 201, 201)"};
  const textColorStyle  = {color:(darkMode)?"black":"rgb(243, 201, 201)"}

  const toastStyle = {style:{background:(darkMode)?"black":"rgb(243, 201, 201)",
                             color:"darkred",
                             fontSize:"2.5vmin",
                             width:"minContent",
                             height:"5vh",
                             textTransform:"capitalize",
                             padding:"1%",
                             border:"0.5vw solid darkred",
                             borderRadius:"5vmax"}}

  return (
    <div style={backgroundStyle} className="App">
      
      {/* for toast messages */}
      <Toaster position="bottom-right" toastOptions={toastStyle}/> 
      <button className='menuBar' onClick={()=>setMenuBar(!menuBar)}>
          📖
      </button>
       <button style={{background:(darkMode)?"rgb(243, 201, 201)":"black"}} onClick={()=>setDarkMode(!darkMode)} 
               className='themeButton'>
                {(darkMode)?"🔥":"🪔"}
       </button>

             <Menu status={menuBar} 
                   closeMenu={setMenuBar}
                   setInputValue={setInputValue}
                   textColorStyle={textColorStyle}
                   backgroundStyle={backgroundStyle}
                   loggedIn={loggedIn}
                   setLoggedIn={setLoggedIn}
                   updation={updation}
                   setUpdation={setUpdation}
                                         />
      <Switch>

        <Route exact path="/">
            <MarkDown darkMode={darkMode}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      updation={updation}
                      setUpdation={setUpdation} /> 
        </Route>

        <Route exact path="/loginAndSignUp">
            <LoginSignUp darkMode={darkMode} setLoggedIn={setLoggedIn} />
        </Route>

        <Route exact path="/password_Reset/:id">
             <PasswordReset  textColorStyle={textColorStyle}
                             backgroundStyle={backgroundStyle}/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
