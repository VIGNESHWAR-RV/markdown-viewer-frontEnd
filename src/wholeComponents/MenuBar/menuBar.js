import * as React from "react";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../../API/API";
import "./menuBar.css";
import userBackground from "../../Images/userBackground.webp"; 

export function Menu({status,
                      closeMenu,
                      setInputValue,
                      textColorStyle,
                      backgroundStyle,
                      loggedIn,
                      setLoggedIn,
                      setUpdation,
                      updation}){

    const history = useHistory();
    const [userData,setUserData] = useState();

        useEffect(()=>{
            const id = sessionStorage.getItem("id");
            const token = sessionStorage.getItem("token");
            if(id&&token){
                fetch(`${API}/users`,
                {method:"GET",
                 headers:{token,id} })
                 .then((response)=>{
   
                    if(response.status === 400){
                        sessionStorage.clear();
                        history.push("/loginAndSignUp");
                    } 
                    else{
                        async function getUserData(){
                           const reply = await response.json();
                           setUserData(reply.userData);
                        }
                        getUserData();
                    }
                 })
            }
          },[history,loggedIn,updation]);

    const [showSetting , setShowSetting] = useState(false);
    const settingMargin = {marginLeft:(showSetting)?"0%":"100%"};
    
    const menuWidth = {width:(status)?"100%":"0"};

    const [open,setOpen] = useState(false);
    const dropdownStyle = {height:(open)?"21.66vmax":"3.6vmax"};
    const dropdownScroll = {overflowY:(open)?"auto":"hidden"};
    const directionStyle = {transform:(open)?"rotate(270deg)":"rotate(90deg)"};

    const [userDataOpen,setUserDataOpen] = useState(false);
    const dropdownStyle1 = {height:(userDataOpen)?"21.66vmax":"3.6vmax"};
    const dropdownScroll1 = {overflowY:(userDataOpen)?"auto":"hidden"};
    const directionStyle1 = {transform:(userDataOpen)?"rotate(270deg)":"rotate(90deg)"};

    // const buttons = [login];
    const action=(endpoint)=>{
        closeMenu(false);
        setShowSetting(false);
        history.push(endpoint);
    }

    const showSettingSection=()=>{
        closeMenu(false);
        setShowSetting(true);
    }

    const templates = [{name:"welcome",
                        content:"# _welcome_\n---"},
                       {name:"Hello",
                        content:"> Hello,`console.log(hii)`"},
                       {name:"List",
                        content:" * Item 1\n"+
                                 " * Item 2\n"+
                                 " * Item 3\n\n"+
                                 " + Item 1\n"+
                                 " + Item 2\n"+
                                 " + Item 3\n\n"+
                                 " - Item 1\n"+
                                 " - Item 2\n"+
                                 " - Item 3"},
                       {name:"Image",
                        content:"![My Alt Text][id]\n\n[id]: /path/to/my/pic.jpg  \"My Optional Title Text\""},
                       {name:"Links",
                        content:"<https://github.com/VIGNESHWAR-RV>"}];

    const setContent = (content)=>{
        setInputValue(content);
        closeMenu(false);
        setShowSetting(false);
        history.push("/");
    }

    const signOut = ()=>{
        sessionStorage.clear();
        closeMenu(false);
        setShowSetting(false);
        setLoggedIn(false); //to make sure menu gets updated
        setUserData();
        setUpdation(false);
    }

    return(
        <>
        <div style={menuWidth} className="outerMenuDiv">
            <div className="innerMenuDiv">
              <div className="userDiv">
                  <img style={backgroundStyle} className="userPic" src={userBackground} alt="user">
                  </img>
                  {(userData)
                    ?<button className="userInfo" onClick={()=>showSettingSection()}>
                        {userData.userName}
                      </button>
                    : <button className="userInfo" onClick={()=>action("/loginAndSignUp")}>
                         Login/signUp
                      </button>
                    }
               </div>

               <div className="navDiv">
                  <button style={textColorStyle} onClick={()=>action("/")}>Home🏠</button>

                  <div style={dropdownStyle} className="savedTemplates">

                    <div className="savedPagesInnerDiv" onClick={()=>setOpen(!open)}>
                      <button style={textColorStyle}>example Templates📄</button>
                      <b style={{...directionStyle,...textColorStyle}}>{">"} </b>
                    </div>

                    <div style={{...dropdownScroll,...textColorStyle}}>
                       {templates.map((template,index)=>
                             <button key={index} style={textColorStyle}
                                     onClick={()=>setContent(template.content)}>{template.name}</button>)} 
                    </div>
                    
                  </div>
                  {(userData)
                         ?  <div style={dropdownStyle1} className="savedTemplates">

                                   <div className="savedPagesInnerDiv" onClick={()=>setUserDataOpen(!userDataOpen)}>
                                     <button style={textColorStyle}>my markup templates📄</button>
                                     <b style={{...directionStyle1,...textColorStyle}}>{">"} </b>
                                   </div>
               
                                   <div className="myFiles" style={{...dropdownScroll1,...textColorStyle}}>
                                   {(userData.templates && userData.templates.length !== 0)
                                        ?userData.templates.map((template,index)=>
                                                      <button key={index}
                                                              style={textColorStyle}
                                                              onClick={()=>setContent(template.content)}>{template.name}</button>)
                                        :<i>Empty</i>}
                                   </div>
                         
                            </div>
                         :""}
               </div>
            </div>

            <div className="emptyArea" onClick={()=>closeMenu(false)}>
               <button>❌</button>
            </div>
        </div>
        {(userData)
          ?  <div style={{...settingMargin,...backgroundStyle}} 
                  className="userSection">
               <div className="settingSection">

                 <div className="infoSection">   
                    <div className="profilePic">
                       <img src={userBackground} alt="userPic"></img>
                    </div>
                    <div className="aboutSection">
                        <h1 style={textColorStyle}>{userData.userName}</h1>
                        <i style={textColorStyle}>{userData.email}</i>
                    </div>
                  </div>
                 <div className="pagesSection">
                   <h2 style={textColorStyle}>My Templates📄</h2>
                   <div className="pages">
                     {(userData.templates && userData.templates.length !== 0)
                       ?userData.templates.map((template,index)=>
                        <button key={index} style={textColorStyle}
                                onClick={()=>setContent(template.content)}>{template.name}</button>)
                       :<i>Empty</i>}
                   </div>
                 </div>
                 <div className="signOutSection">
                    <button onClick={signOut}>SignOut</button>
                 </div>
               </div>
               
             </div>
          :""}
        </>
    )
};