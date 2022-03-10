import * as React from "react";
import "./passwordReset.css";
import { useState,useEffect } from "react";
import { Input } from "../../individualComponents/inputFieldComponent/inputField";
import { useHistory, useParams } from "react-router-dom";
import { API } from "../../API/API";
import toast from "react-hot-toast";

export function PasswordReset(){

const history = useHistory();
const {id} = useParams();
    
const params = id.split("&");
const [_id,token] = params;


const [newPassword,setNewPassword] = useState(false);

const [passwordUpdated,setPasswordUpdated] = useState(false);

useEffect(()=>{
   toast.loading("verifying user...");
    fetch(`${API}/password_Reset`,
        {method:"POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify({_id,token}) })
    .then((response)=>{
          
        if(response.status === 400){
            toast.error("couldnt verify the link,please try again!")
           return history.push("/loginAndSignUp");
        }else if(response.status === 200){ 
            toast.success("user verified");
            setNewPassword({status:true});
            // setTimeout(()=>{

            // },1000);
        } })
},[history,_id,token]);

//-----to get details as query instead of param in route
// const query = useLocation();
// console.log(query.search,new URLSearchParams(query.search).get('check1'));
//--------------------------------------------


const regExp = { password:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"};

const Inputs = [
                {name:"newPassword",
                 type:"password",
                 label:"New Password",
                 placeholder:"Enter your password Here",
                 errorMessage:"Password should be minimum 8 letters with atleast(1 capital , 1 small ,1 number , 1 special character)",
                 required:true,
                 pattern:regExp.password,
                 autoComplete:"current-password"},
                 
                 {name:"confirm-Password",
                 type:"password",
                 label:"Confirm New Password",
                 placeholder:"please confirm your password",
                 errorMessage:"Passwords does not match",
                 required:true,
                 pattern:newPassword.newPassword,
                 autoComplete:"current-password"}];

const handleChange=(e)=>{
    setNewPassword({...newPassword,[e.target.name]:e.target.value});
}

const handleSubmit=(e)=>{
    e.preventDefault();

   if(!(new RegExp(regExp.password).test(newPassword.newPassword))
       ||
      !(newPassword.newPassword === newPassword["confirm-Password"])){

         setNewPassword({status:false});
        return setPasswordUpdated(false);
      }
  
    toast.loading("updating your password");
    fetch(`${API}/password_Reset`,
         {method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({_id,newPassword:newPassword.newPassword})})
    .then((response)=>{
        toast.remove();
        setNewPassword({status:false})
        if(response.status === 400){
            
              return toast.error("couldn't update password!!!, please try again later");
        }
        else if(response.status === 200){
                 toast.success("Successfully updated the passords");
            return setPasswordUpdated(true)
        }
    })
}
    return(
        <>
    {(!newPassword)
      ?""
      :(newPassword.status)
         ?
         <form className="passwordResetForm" onSubmit={handleSubmit}> 
            <h1  className="passwordResetHeading">Password Reset Section</h1>

            {/* to avoid warning error for user name input */}
            {/* ----------------------- */}
            <input name="userName" type="text" autoComplete="username" hidden/>
            {/* ----------------------- */}

            {Inputs.map((input,index)=><Input key={index} {...input} typing={handleChange}/>)}

            <button className="passwordResetSubmit">update Passwords</button>

            {/* <div className="passwordResetAnchorsDiv">
                <b className="passwordResetAnchorText">Got the Old Pssword</b>
                <button className="passwordResetAnchors" type="button" onClick={()=>history.push("/login")}>Login</button>
            </div> */}

         </form>
        :(passwordUpdated)
             ? <div className="passwordResetUpdationDiv">
                <b className="passwordResetUpdationInfo">password succesfully updated!!!😀 </b> <br/> <br/>
                you can login either in this tab or from the previous tab <br/><br/>
               </div>
             : <div className="passwordResetUpdationDiv">
                 <b className="passwordResetUpdationInfo">password is not updated!!!☹️</b> <br/> <br/>
                  please try again after sometime
                  <br/><br/>
               </div>}
        </>
    )
}