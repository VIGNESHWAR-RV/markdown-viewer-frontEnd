import * as React from "react";
import "./SignUp.css";
import { useState } from "react";
import { Input } from "../../individualComponents/inputFieldComponent/inputField";
import { API } from "../../API/API"
import toast from "react-hot-toast";

export function SignUp({textColorStyle,toLoginPage}){


    //useState to get values
   const [values,setValues] = useState({
       firstName:"",
       lastName:"",
       userName:"",
       email:"",
       password:"",
   });

 //regex patterns to check
   const regExp = {
                   userName:"^[a-zA-Z0-9@#]{4,16}$",
                   email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                   password:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                   };

    //Input fields for signup
   const Inputs = [

       {name:"newUserName",
        type:"text",
        label:"User Name",
        placeholder:"user Name should be unique",
        errorMessage:"Enter a User Name with 4-16 characters with no special characters or spaces",
        required:true,
        pattern:regExp.userName,
        autoComplete:"name"},

        {name:"email",
        type:"email",
        label:"Email",
        placeholder:"Enter your Email Here",
        errorMessage:"Enter a Valid Email",
        required:true,
        pattern:regExp.email,
        autoComplete:"email"},

       {name:"newPassword",
        type:"password",
        label:"Password",
        placeholder:"Enter your password Here",
        errorMessage:"Password should be minimum 8 letters with atleast(1 capital , 1 small ,1 number , 1 special character)",
        required:true,
        pattern:regExp.password,
        autoComplete:"current-password"},
        
        {name:"confirm-Password",
        type:"password",
        label:"Confirm Password",
        placeholder:"please confirm your password",
        errorMessage:"Passwords does not match",
        required:true,
        pattern:values.newPassword,
        autoComplete:"current-password"}
   ];

   
   //to update the changes when field is edited
   const onChange=(e)=>{
       setValues({...values,[e.target.name]:e.target.value})
   }

   //function to handle and perform form submission
   const handleSubmit = (e)=>{
     e.preventDefault();

     //checking again since changes can be made in HTML attributes using INSPECT
     if(
       !(new RegExp(regExp.userName).test(values.newUserName))
       ||
       !(new RegExp(regExp.email).test(values.email))
       ||
       !(new RegExp(regExp.password).test(values.newPassword))
       ||
       !(values.newPassword === values["confirm-Password"])
     ){
        return alert("details are incorrect");
      }

      toast.loading("please wait until signing up!")
     fetch(`${API}/signup`,
           {method:"POST",
           headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                                 userName:values.newUserName,
                                 email:values.email,
                                 password:values.newPassword})})
     .then((response)=>{
       toast.remove();
         if(response.status === 400){
             
             const message = async()=>{
                 const reply = await response.json();
                 return toast.error(reply.message);
             }
             message();
         }
         else if(response.status === 200){
          toast.success("signup successfull!! , please login");
            return toLoginPage();
         }
     })
    
    //can use formData to get the data from inputs too
    //  const data = new FormData(e.target)
    //   console.log(Object.fromEntries(data.entries()));
   }
   
    return(
       <>
      <h1 style={textColorStyle} className="signUpHeading">welcome,{"<Explorer/>"}</h1>
      <div className="signUpOuterDiv">
        <form className="signUpForm" onSubmit={handleSubmit}> 
            {Inputs.map((input,index)=> <Input key={index} textColorStyle={textColorStyle} {...input} typing={onChange} />
            )}
            <button className="signUpSubmit">
                submit
            </button>
            <div className="signUpAnchorsDiv">
              <b style={textColorStyle} className="signUpAnchorText">Already Have Account?</b> 
              <button style={textColorStyle} type="button" className="signUpAnchors" onClick={()=>toLoginPage()}>Login</button>
            </div>
        </form>
        </div>
        </>
    )
};