import * as React from "react";
import "./markdown.css";
import { API } from "../../API/API";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export function MarkDown({inputValue,setInputValue,darkMode,updation,setUpdation}){

    const history = useHistory();

    const innerHeaderStyle = {color:(darkMode)?"black":"rgb(243, 201, 201)"};
    const previewTextColor = (darkMode)?"previewDarkDiv":"previewWhiteDiv";

    const [saved,setSaved] = useState(false);

  useEffect(()=>{
    setSaved(false);
  },[updation]);

  const typing = (e)=>{
    setInputValue(e.target.value);
    
  }

  const saveData=()=>{

       const id = sessionStorage.getItem("id");
       const token = sessionStorage.getItem("token");
       if(id&&token){

        let name =  prompt("file name");
        while(name === "" || name === undefined){
            name = prompt("please enter a valid file name");
        }
        if(name === null){
          return;
        }

           fetch(`${API}/users`,
           {method:"POST",
            headers:{"Content-Type":"application/json",token,id},
            body:JSON.stringify({name:name,content:inputValue})})
            .then((response)=>{
               if(response.status === 400){
                   sessionStorage.clear();
                   history.push("/loginAndSignUp");
               } 
               else{
                      setSaved(true);
                      setUpdation(true);
               }})
       }else{
         setSaved(false);
        history.push("/loginAndSignUp");
       }
  };

    return(
        <div className="markdownCoverDiv">
            <header className='header'>
                    <div className='headerDiv'>
                        
                     
                      <h1 className='title'>Markdown Viewer</h1>
                      
                    </div>
                  </header>
                  <main className='main'>
                      
                 
                        <div className='markdownInputOuterDiv'>
                          <div className='markdown_Header_Div'>
                             <h2 style={innerHeaderStyle} className='markdownInputTitle'>Input</h2>
                             <div>
                               {saved
                                ?<button><a href="null" title="succesfully saved" onClick={(e)=>{e.preventDefault()}}>✌️</a></button>
                                :<button><a href="null" title="save online" onClick={(e)=>{e.preventDefault();saveData()}}>🌐</a></button>
                                }
                                 
                                 <button><a href="null" title="clear all" onClick={(e)=>{e.preventDefault();setInputValue("")}}>🧹</a></button>
                          
                             </div>
                          </div>
                         
                          <div className='inputInnerDiv'>
                          <textarea className='inputTextArea' 
                                    value={inputValue}
                                    onChange={typing}
                                    placeholder="Play with the markdown here!!">
                 
                          </textarea>
                          </div>
                        </div>
                   
                        <div className='markdownPreviewOuterDiv'>
                          <div className='markdown_Header_Div'>
                             <h2 style={innerHeaderStyle} className='markdownPreviewTitle'>Preview</h2>
                          </div>
             
                          <div className='previewInnerDiv'>
                             <ReactMarkdown children={inputValue} 
                                            className={previewTextColor}
                                           />
                          </div>
                        </div>
                 
                   </main>
                  <footer className='footer'>
                    <div className='footerDiv'>
                      
                         Open Source since {new Date(Date.now()).getFullYear()}💗
                      
                    </div>
                  </footer>
        </div>
    )
}