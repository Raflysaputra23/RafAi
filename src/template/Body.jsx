/* eslint-disable react/prop-types */



const Body = ({ chat }) => {
    return (
        <section className="p-2 pb-36 flex flex-col gap-2 overflow-y-auto overflow-x-hidden font-poppins" style={{height: "100%"}}>
          {chat && chat.map((chat, key) => {
          if (chat.role === "user") {
            return (
              <div key={key} className="card user self-end max-w-[85%] p-2 border-chat-user shadow-sm bg-blue-600 text-slate-100">
                <p className="whitespace-pre-wrap">{chat.content}</p>
              </div>
            )
          } else {
            return (
              <div key={key} className="card bot self-start max-w-[85%] p-2 border-chat-bot shadow-sm bg-blue-600 text-slate-100">
                <p className="whitespace-pre-wrap">{chat.content}</p>
              </div>
            )
          }
          })}
        </section>
    );
}

export default Body;