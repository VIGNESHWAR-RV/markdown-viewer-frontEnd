import { useState } from "react";
import "./inputField.css";

export function Input({label,name,errorMessage,typing,type,textColorStyle,...inputProps}){

    const [focused,setFocused] = useState(false);
    
    const gridLayout = (type === "password")
                       ?{gridTemplateColumns:"auto 10%"}
                       :{gridTemplateColumns:"auto"}

    const [showPassword,setShowPassword] = useState(false);

    const handleFocus=(e)=>{  //function to perform during onBlur event
      setFocused(true)
    }

    return(
        <div className="Input">
           <label style={textColorStyle} htmlFor={name}> {label}</label>
             <div style={gridLayout} className="inputDiv">
              <input id={name}
                     onChange={typing} 
                     onBlur={handleFocus} //perfroms when a field is clicked and left without filling details with required pattern
                     onFocus={()=>name === "confirm-Password" && setFocused(true)}  // only for sign-up confirm password
                     focused={focused.toString()} //to set it true or false in string
                     name={name}
                     type={(showPassword)?"text":type}
                     {...inputProps}
                     />
              {(type === "password")
                     ?<button type="button" onClick={()=>setShowPassword(!showPassword)}>
                       {(showPassword)?"🐵":"🙈"}
                      </button>
                     :""}
              <span>{errorMessage}</span>
            </div>
          
        </div>
    )
}