import "./loginSignUp.css";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SignUp } from  "../../wholeComponents/signUp/SignUp";
import { Login } from "../../wholeComponents/login/Login";
import { ForgotPassword } from "../../wholeComponents/forgotPassword/ForgotPassword";

export function LoginSignUp({darkMode , setLoggedIn}){

    const history = useHistory();
    
    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        const id = sessionStorage.getItem("id");
        if(token && id){
            // console.log(token,id);
            return history.push("/");
        }
        },[history]);

    const textColorStyle = {color:(darkMode)?"black":"rgb(243, 201, 201)",
                            textShadow:"0.1vw 0.1vw 0.1vw darkred,-0.1vw -0.1vw 0.1vw darkred"}


    const [showSignUp,setShowSignUp] = useState(false);
    const signUpFormMargin = {marginLeft:(showSignUp)?"0%":"-100%"};
    const signUpButtonStyle = (showSignUp)?{background:"darkred",color:"black",fontSize:"6.6vmax"}
                                          :{};

    const [showLogin,setShowLogin] = useState(false);
    const loginFormMargin = {marginLeft:(showLogin)?"0%":"100%"}
    const loginButtonStyle = (showLogin)?{background:"darkred",color:"black",fontSize:"6.6vmax"}
                                        :{};

    const [showForgotPassword,setShowForgotPassword] = useState(false);
    const forgotPasswordFormMargin = {marginLeft:(showForgotPassword)?"0%":"100%"};

    const toLoginPage = () =>{
        setShowSignUp(false);
        setShowLogin(true);
    }

    const toSignUpPage=()=>{
        setShowSignUp(true);
        setShowLogin(false);
    }
   
    return(
        <div className="loginSignUpDiv">
     
           <div className="loginSignUpOuterDiv">

              <div  className="loginInnerDiv">

                  <div style={signUpFormMargin} className="signUpOuterForm">
                      <SignUp textColorStyle={textColorStyle} toLoginPage={toLoginPage}/>
                 
                  </div>
                  <button className="loginSelection"
                          onClick={()=>setShowLogin(true)}
                          style={{...loginButtonStyle,...textColorStyle}}
                          >
                      Login
                  </button>
              
               </div>

               <div className="signUpInnerDiv">
                 <button className="signUpSelection"
                         onClick={()=>setShowSignUp(true)}
                         style={{...signUpButtonStyle,...textColorStyle}}
                         >
                      SignUp
                 </button>
                 <div style={loginFormMargin} className="loginOuterForm">
                     <Login textColorStyle={textColorStyle} 
                            toSignUpPage={toSignUpPage}
                            setShowForgotPassword={setShowForgotPassword}
                            setLoggedIn={setLoggedIn}
                            /> 
                 </div>
                 <div style={forgotPasswordFormMargin} className="forgotPasswordOuterForm">
                     <ForgotPassword setShowForgotPassword={setShowForgotPassword}
                                     textColorStyle={textColorStyle}
                                                                  />
                 </div>
              </div>

           </div>
           
        </div>
    )
}