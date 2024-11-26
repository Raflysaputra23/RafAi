
// eslint-disable-next-line react/prop-types
const Header = ({ handleClearChat }) => {
    return (
        <header className="p-3 rounded-md shadow bg-blue-800 flex justify-between font-tillana text-slate-300">
          <h1 className="text-xl">{"</>"} RafAi</h1>
          <button id="btn-remove-chat" type="submit" className="text-sm p-2 bg-red-600 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleClearChat}>Hapus <i className="bx bx-message"></i></button>
        </header>
    )
}

export default Header;