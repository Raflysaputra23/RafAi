// REACT
import { useState } from "react";
// ASSETS
import "boxicons/css/boxicons.min.css";
// SERVER
import RafAi from "./server/RafAi";
// TEMPLATE
import Header from "./template/Header.jsx";
import Body from "./template/Body.jsx";
import Footer from "./template/Footer.jsx";


const App = () => {
  if(!localStorage.getItem("session")) localStorage.setItem("session", Math.round(Math.random() * 100000));
  const [ chat, setChat ] = useState(localStorage.getItem("chat") !== null ? JSON.parse(localStorage.getItem("chat")) : []);
  // eslint-disable-next-line no-unused-vars
  const handleChat = async (e) => {
    e.preventDefault();

    const form = e.target;
    const session = localStorage.getItem("session");
    const DataForm = new FormData(e.target);
    const text = DataForm.get("chat");
    setChat((prevChat) => [...prevChat,{role: "user", content: text}]);
    setChat((prevChat) => [...prevChat,{role: "assistant", content: (<svg className="animate-spin h-5 w-5 border-r-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>)}]);

    form.querySelector('input').value = "";
    document.getElementById("submit").setAttribute('disabled','true');
    document.getElementById("input").setAttribute('disabled','true');

    const response = await RafAi(text, session);
    setChat((prevChat) => [...prevChat.slice(0, -1),{role: "assistant", content: response}]);
    setChat((prevChat) => {
      localStorage.setItem("chat", JSON.stringify(prevChat));
      return prevChat;
    });
    
    document.getElementById("btn-remove-chat").removeAttribute('disabled');
    document.getElementById("input").removeAttribute('disabled');
  }  
  const handleInput = (e) => {
    e.preventDefault();
    e.target.nextElementSibling.setAttribute('disabled','true');
    if(e.target.value !== "") {
      e.target.nextElementSibling.removeAttribute('disabled');
    }
  }

  const handleClearChat = (e) => {
    localStorage.removeItem("chat");
    localStorage.removeItem("session");
    setChat([]);
    e.target.setAttribute('disabled','true');
  }
  
  return (
    <>
      <main className="mx-auto min-w-80 w-[100%] md:max-w-[90%] relative border overflow-hidden" style={{height: "95%"}}>
        <Header handleClearChat={handleClearChat} />
        <Body chat={chat} />
        <Footer handleChat={handleChat} handleInput={handleInput} />
      </main>
    </>
  )
}

export default App;
