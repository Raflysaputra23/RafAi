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
import { useEffect } from "react";
import Recorder from "./server/Recorder.js";


const App = () => {
  if(!localStorage.getItem("session")) localStorage.setItem("session", Math.round(Math.random() * 100000));
  const [ chat, setChat ] = useState(localStorage.getItem("chat") !== null ? JSON.parse(localStorage.getItem("chat")) : []);
  const [ mode, setMode ] = useState("light");
  const [ text, setText ] = useState("");
  const [ record, setRecord ] = useState(true);
  const [ recording, setRecording ] = useState(Recorder());
  
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    const type = ["I,M RafAi","Apa yang ingin kamu tanyakan?"];
    let i = 0;
    let t = 0;
    let cek = true;
    let delay = 200;
    const interval = setInterval(() => {
      setTimeout(() => {
        if(cek) {
          setText(type[t].slice(0, i));
          i++;
        } else {
          setText(type[t].slice(0, i));
          i--;
        }

        if(i === type[t].length) {
          if(t === type.length - 1) return;
          cek = false;
          delay = 1000;
        } else if(i === 0) {
          cek = true;
          delay = 200;
          t++;
        }
      }, delay);
    }, 200);
    return () => clearInterval(interval);
  },[]);

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

  const handleMode = () => {
    if(mode === "dark") {
      document.querySelector("html").classList.replace("dark","light");
      setMode("light");
    } else {
      document.querySelector("html").classList.replace("light","dark");
      setMode("dark");
    }
  }
  
  const handleClearChat = (e) => {
    localStorage.removeItem("chat");
    localStorage.removeItem("session");
    setChat([]);
    e.target.setAttribute('disabled','true');
  }

  const handleRecording = (e) => {
    e.preventDefault();
    if(record) {
      setRecord(false);
      recording.start();
      console.log("Start recording...")

      const button = document.getElementById("recording");
      button.classList.replace('text-slate-100','text-red-500');
    } else {
      setRecord(true);
      recording.stop();
      console.log("Stop recording...");

      const session = localStorage.getItem("session");

      recording.onresult = async (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        console.log(text);
        if(event.results[event.results.length - 1].isFinal) {
          setChat((prevChat) => [...prevChat,{role: "user", content: text}]);
          setChat((prevChat) => [...prevChat,{role: "assistant", content: (<svg className="animate-spin h-5 w-5 border-r-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>)}]);

          const response = await RafAi(text, session);
          setChat((prevChat) => [...prevChat.slice(0, -1),{role: "assistant", content: response}]);
          setChat((prevChat) => {
            localStorage.setItem("chat", JSON.stringify(prevChat));
            return prevChat;
          });
        }
      }

      recording.onerror = (event) => {
        console.log(event.error);
      }

      const button = document.getElementById("recording");
      button.classList.replace('text-red-500','text-slate-100');
    }
  }

  return (
    <>
      <main className="mx-auto min-w-80 w-[100%] md:max-w-[90%] relative border overflow-hidden bg-slate-200 text-slate-900 dark:text-slate-200 dark:bg-slate-800" style={{height: "95%"}}>
        <Header handleClearChat={handleClearChat} handleMode={handleMode} mode={mode} />
        <Body chat={chat} text={text}/>
        <Footer handleChat={handleChat} handleInput={handleInput} handleRecording={handleRecording} />
      </main>
    </>
  )
}

export default App;
