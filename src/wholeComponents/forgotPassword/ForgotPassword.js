import * as React from "react";
import "./ForgotPassword.css";
import { useState } from "react";
import { Input } from "../../individualComponents/inputFieldComponent/inputField";
 import { API } from "../../API/API";
import toast from "react-hot-toast";

export function ForgotPassword({setShowForgotPassword,textColorStyle}){


    const [recoveryMail,setRecoveryMail] = useState("");

    const [invalidMail,setInvalidMail] = useState(false);

    const [sentMessage,setSentMessage] = useState(false);

    let [timer,setTimer] = useState(20);

    const regExp = {email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"};

const Inputs = [{name:"recoveryEmail",
                 type:"email",
                 label:"Email",
                 placeholder:"please enter Email associated with your account",
                 errorMessage:"Enter a Valid Email",
                 required:true,
                 pattern:regExp.email,
                 autoComplete:"email"}]

const handleChange = (e)=>{
    setInvalidMail(false);
    setRecoveryMail({[e.target.name]:e.target.value});
}

const handleSubmit = (e)=>{
    e.preventDefault();

    if(!(new RegExp(regExp.email).test(recoveryMail.recoveryEmail))){
        return setInvalidMail(true);
    }
    toast.loading("sending request for password reset!")
    fetch(`${API}/forgot_Password`,
           {method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(recoveryMail)})
    .then((response)=>{
        toast.remove();
        if(response.status === 400){
            toast.error("please enter the mail associated with your account")
            setInvalidMail(true);
        }
        else if(response.status === 200){
             toast.success("successfully sent link to the mail👍")
               setSentMessage(true);
               setTimeout(()=>{
                   let i = 0;
                   const redirectionTime = setInterval(()=>{                
                         i++;
                         //console.log(timer,i);
                         setTimer(timer - i);
                         if(i===20){
                          //console.log("stopped");
                          clearInterval(redirectionTime);
                          setShowForgotPassword(false);
                          setSentMessage(false);
                          setTimer(20);
                      }
                   },1000);
               },1000);
            }
    })
}


    return(
        <>
        {(sentMessage)
        
        ?<div className="forgotPasswordSentDiv">
            <b style={textColorStyle} className="forgotPasswordSentInfo">{"link sent to your mail"}</b><br/><br/>
            <b style={textColorStyle} className="forgotPasswordSentInfo">This section will be closed in {timer} seconds, and you can see the login section where you have to login after successful password reset</b>
            <br/><br/>
            <a style={textColorStyle} className="forgotPasswordAnchors" target="_blank" rel="noreferrer" href="https://www.gmail.com">CHECK INBOX</a>
        </div>
    
        :
          <form onSubmit={handleSubmit} className="forgotPasswordForm">
              <h1 style={textColorStyle} className="forgotPasswordHeading">Forgot Password??</h1>
              {Inputs.map((input,index)=><Input key={index} textColorStyle={textColorStyle} {...input} typing={handleChange}/>)}
            
            {invalidMail 
               ?<span className="forgotPasswordError">
                   No account with such Email
                </span>
               :""}
               
              <button className="forgotPasswordSubmit">Verify User</button>
              <div className="forgotPasswordAnchorsDiv">
                 <button style={textColorStyle} className="forgotPasswordAnchors" type="button" onClick={()=>setShowForgotPassword(false)}>Cancel</button>
              </div>
          </form>}
        </>
    )
}