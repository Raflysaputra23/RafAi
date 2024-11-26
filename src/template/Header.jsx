
// eslint-disable-next-line react/prop-types
const Header = ({ handleClearChat, handleMode, mode }) => {
    return (
        <header className="p-3 rounded-md shadow bg-blue-800 flex justify-between items-center font-tillana text-slate-300 dark:bg-slate-900">
          <h1 className="text-xl">{"</>"} RafAi</h1>
          <section className="flex items-center gap-5">
            <button className="shadow-md shadow-blue-950 active:shadow-none w-8 h-8 rounded-full flex flex-col items-center justify-center overflow-hidden" onClick={handleMode}>
                <i className="bx bxs-moon text-2xl transition" style={(mode == "dark") ? {transform: "translateY(1rem)"} : {transform: "translateY(-1rem)"}}></i>
                <i className="bx bxs-sun text-2xl transition" style={(mode == "dark") ? {transform: "translateY(1rem)"} : {transform: "translateY(-1rem)"}}></i>
            </button>
            <button id="btn-remove-chat" type="button" className="text-sm p-2 bg-red-600 shadow-md shadow-red-800 active:shadow-none rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleClearChat}>Hapus <i className="bx bx-message"></i></button>
          </section>
        </header>
    )
}

export default Header;