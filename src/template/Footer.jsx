

// eslint-disable-next-line react/prop-types
const Footer = ({ handleChat, handleInput }) => {
    return (
        <footer className="absolute bottom-0 left-0 right-0 p-3 rounded-md shadow bg-slate-200 font-poppins text-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <form action="" className="flex gap-2" onSubmit={handleChat}>
            <input id="input" type="text" name="chat" className="w-full p-3 rounded-md outline-none border-none bg-slate-100 dark:bg-slate-800" onChange={handleInput} placeholder="Ketik pesan..." />
            <button id="submit" className="p-3 px-5 rounded-md bg-blue-800 text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed" disabled><i className="bx bx-send"></i></button>
          </form>  
        </footer>
    );
} 

export default Footer;