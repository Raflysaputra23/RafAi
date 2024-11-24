import "boxicons/css/boxicons.min.css";
import { useState } from "react";
import RafAi from "./server/RafAi";
const App = () => {
  if(!localStorage.getItem("session")) localStorage.setItem("session", Math.round(Math.random() * 100000));
  const [ chat, setChat ] = useState(localStorage.getItem("chat") !== null ? JSON.parse(localStorage.getItem("chat")) : []);
  const [ session, setSession ] = useState(JSON.parse(localStorage.getItem("session")));
  // eslint-disable-next-line no-unused-vars
  // const [ chatBot, setChatBot ] = useState([]);
  const handleChat = async (e) => {
    e.preventDefault();
    
    const form = new FormData(e.target);
    e.target.querySelector('input').value = "";
    const text = form.get("chat");
    setChat((prevChat) => [...prevChat,{role: "user", content: text}]);
    setChat((prevChat) => [...prevChat,{role: "assistant", content: "Loading..."}]);
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
    setSession([]);
    setChat([]);
    e.target.setAttribute('disabled','true');
  }
  
  return (
    <>
      <main className="container mx-auto min-w-80 w-[90%] max-w-[90%] h-lvh mb-10 relative border overflow-y-auto overflow-x-hidden">
        <header className="p-3 rounded-md shadow bg-blue-800 flex justify-between font-tillana text-slate-300">
          <h1 className="text-xl">{"</>"} RafAi</h1>
          <button id="btn-remove-chat" type="submit" className="text-sm p-2 bg-red-600 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleClearChat}>Hapus <i className="bx bx-message"></i></button>
        </header>
        <section className="p-2 pb-36 flex flex-col gap-2 h-lvh overflow-y-auto overflow-x-hidden">
          {chat && chat.map((chat, key) => {
          if (chat.role === "user") {
            return (
              <div key={key} className="card user self-end max-w-[70%] p-2 border-chat-user shadow-sm bg-blue-600 text-slate-100">
                <p>{chat.content}</p>
              </div>
            )
          } else {
            return (
              <div key={key} className="card bot self-start max-w-[70%] p-2 border-chat-bot shadow-sm bg-blue-600 text-slate-100">
                <p>{chat.content}</p>
              </div>
            )
          }
          })}
          {/* {chatBo.map((chat, key) => (
          <div key={key} className="card bot self-start max-w-[70%] p-2 border-chat-bot shadow-sm bg-blue-600 text-slate-100">
            <p>{chat}</p>
          </div>
          ))} */}
        </section>
        <footer className="absolute bottom-0 left-0 right-0 p-3 rounded-md shadow bg-slate-200 font-poppins text-slate-700">
          <form action="" className="flex gap-2" onSubmit={handleChat}>
            <input id="input" type="text" name="chat" className="w-full p-3 rounded-md outline-none border-none bg-slate-100" onChange={handleInput} placeholder="Ketik pesan..." />
            <button id="submit" className="p-3 px-5 rounded-md bg-blue-800 text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed" disabled><i className="bx bx-send"></i></button>
          </form>  
        </footer>
      </main>
    </>
  )
}

export default App;
