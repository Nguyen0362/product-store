import socket from "./initSocket.js";

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector(".chat-message .inner-form");
if(formChat){
  formChat.addEventListener("submit", (event) => {
    event.preventDefault();

    const roomChatId = formChat.getAttribute("room-chat-id")
    const content = formChat.content.value.trim();
    const myId = formChat.getAttribute("my-id");

    if(content){
      const data = {
        content: content,
        userId: myId,
        roomChatId: roomChatId
      }

      socket.emit("CLIENT_SEND_MESSAGE", data);
      formChat.content.value = "";
    }
  });
}
//END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const chatMessageMain = document.querySelector(".chat-message .chat-message-main");
  const myId = document.querySelector(".chat-message .inner-form").getAttribute("my-id");

  const lastDate = chatMessageMain.getAttribute("data-last-date") || "";

  const [time, date] = data.createdAtFormat.split("-");
  if(date !== lastDate){
    const dateDiv = document.createElement("div");
    dateDiv.className = "text-center mb-[20px]"
    dateDiv.innerHTML = `
      <span class="inline-block text-white py-[4px] px-[8px] bg-[#BCBDC0] rounded-[13px] text-[12px]">${date}</span>
    `;
    chatMessageMain.appendChild(dateDiv);
    chatMessageMain.setAttribute("data-last-date", date);
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = "flex px-[15px] pb-[20px] " + (myId == data.userId ? "justify-end" : "");
  
  if(myId != data.userId){
    messageDiv.innerHTML = `
      <div class="w-[40px] h-[40px] rounded-[50%] flex-shrink-0 border-[2px] border-[#fff] overflow-hidden shadow-[0_5px_10px_0_rgba(43,43,43,0.2)] mr-[20px]">
        <img class="w-full h-full object-cover" src=${data.avatar} alt=""/></div>
      <div class="flex-1">
        <div class="bg-[#d9ebff] rounded-[10px] rounded-tl-[0px] relative before:content-[''] before:absolute before:top-0 before:left-[-14px] before:border-[8px] before:border-transparent before:border-t-[#d9ebff] before:border-r-[#d9ebff]">
          <p class="p-[10px] text-[14px] text-black font-[500]">${data.content}</p>
        </div><span class="text-[14px] text-gray-600 font-[500] ml-[9px] mr-[8px] mt-[10px]">${time}</span>
      </div>
    `
  } else {
    messageDiv.innerHTML = `
      <div class="pr-[10px] text-right">
        <div class="bg-[#F2F7FB] rounded-[10px] rounded-br-[0px] relative before:content-[''] before:absolute before:bottom-0 before:right-[-10px] before:border-[5px] before:border-transparent before:border-b-[#F2F7FB] before:border-l-[#F2F7FB]">
          <p class="p-[10px] text-[14px] text-black font-[500]">${data.content}</p>
        </div><span class="text-[14px] text-gray-600 font-[500] ml-[9px] mr-[8px] mt-[10px]">${time}</span>
      </div>
    `
  }

  const listTyping = document.querySelector(".chat-message-main .inner-list-typing");

  const roomChatId = formChat.getAttribute("room-chat-id");
  chatMessageMain.insertBefore(messageDiv, listTyping);

  socket.emit("CLIENT_SEND_TYPING", {
      roomChatId: roomChatId,
      userId: myId,
      type: false
    })

  chatMessageMain.scrollTop = chatMessageMain.scrollHeight;
})
// END SERVER_RETURN_MESSAGE

// SERVER RETURN STATUS ONLINE
socket.on("SERVER_RETURN_STATUS_ONLINE", (data) => {
  const chatListMain = document.querySelector(".chat-list-main");
  if(chatListMain){
    const user = chatListMain.querySelector(`[user-id="${data.userId}"]`);

    if(user){
      const status = user.querySelector("[status]");
      status.setAttribute("status", data.statusOnline);
    }
  }
})
// END SERVER RETURN STATUS ONLINE

// CLIENT SEND TYPING
const inputChat = document.querySelector(".chat-message .inner-form input[name='content']");
if(inputChat){
  var timeOutTyping;

  inputChat.addEventListener("keyup", () => {
    const roomChatId = formChat.getAttribute("room-chat-id");
    const myId = formChat.getAttribute("my-id");

    socket.emit("CLIENT_SEND_TYPING", {
      roomChatId: roomChatId,
      userId: myId,
      type: true
    });

    clearTimeout(timeOutTyping);

    timeOutTyping = setTimeout(() => {
      socket.emit("CLIENT_SEND_TYPING", {
        roomChatId: roomChatId,
        userId: myId,
        type: false
      });
    }, 3000);
  })
}
// END CLIENT SEND TYPING

// SERVER_RETURN_TYPING
socket.on("SERVER_RETURN_TYPING", (data) => {
  const listTyping = document.querySelector(".chat-message-main .inner-list-typing");
  if(listTyping){
    if(data.type){
      const existBoxTyping = listTyping.querySelector(`.box-typing[user-id="${data.userId}"]`);
      if(!existBoxTyping){
        const div = document.createElement("div");
        div.classList = "box-typing px-[15px]";
        div.setAttribute("user-id", data.userId);

        div.innerHTML = `
          <div class="inner-dots h-[20px] w-[50px] inline-flex rounded-[45px] items-center justify-center bg-[#efefef]">
            <span class="h-[5px] w-[5px] rounded-[50%] bg-[#252525] mx-[3px]"></span>
            <span class="h-[5px] w-[5px] rounded-[50%] bg-[#252525] mx-[3px]"></span>
            <span class="h-[5px] w-[5px] rounded-[50%] bg-[#252525] mx-[3px]"></span>
          </div>
        `;

        listTyping.appendChild(div);
        
        const chatMessageMain = document.querySelector(".chat-message-main");
        chatMessageMain.scrollTop = chatMessageMain.scrollHeight;
      }
    } else {
      const existBoxTyping = listTyping.querySelector(`.box-typing[user-id="${data.userId}"]`);

      if(existBoxTyping){
        listTyping.removeChild(existBoxTyping);
      }
    }
  }
  
})
// END SERVER_RETURN_TYPING

