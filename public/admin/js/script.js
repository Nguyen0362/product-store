import socket from "./initSocket.js";

// show notification
const dropdownToggle = document.querySelectorAll(".header .dropdown-toggle");
if(dropdownToggle.length > 0){
  dropdownToggle.forEach(item => {
    item.addEventListener("click", () => {
      const showNotification = item.parentElement.querySelector(".show-notification");
      if(showNotification.style.display == "block"){
          showNotification.style.display = "none";
      } else {
          showNotification.style.display = "block";
      }
    });
  });
    
};
// End show notification

//close open sider and header
const header = document.querySelector(".header");
if(header){
  const buttonMenu = header.querySelector(".button-menu");
  const buttonHeader = header.querySelector(".button-header");
  const overlayBox = document.querySelector(".overlay-box");
  const sider = document.querySelector(".sider");
  const iconMenu = buttonMenu.querySelector("i");


  if(buttonHeader){
    const headerRight = header.querySelector(".header-right");
    let isOpen = true;
    buttonHeader.addEventListener("click", () => {
      headerRight.classList.toggle("h-[0]");
      headerRight.classList.toggle("h-[80px]");

      if(isOpen){
        setTimeout(() => {
          headerRight.classList.remove("overflow-hidden");
        }, 300);
      } else {
        headerRight.classList.add("overflow-hidden");
      }    
      isOpen = !isOpen; 
    });
  }

  const toggleOverlay = () => {
    overlayBox.classList.toggle("opacity-0");
    overlayBox.classList.toggle("opacity-30");
    overlayBox.classList.toggle("z-[-1]");
    overlayBox.classList.toggle("z-[888]");
    sider.classList.toggle("translate-x-0");
    iconMenu.classList.toggle("fa-toggle-on");
    iconMenu.classList.toggle("fa-toggle-off");
  };
    
  [overlayBox, buttonMenu].forEach(element => {
    if(element){
      element.addEventListener("click", toggleOverlay);
    }
  });
}
//End close and open sider

//show submenu
const menuItems = document.querySelectorAll(".sider .menu-item");
const submenuItem = document.querySelectorAll(".sider .submenu-item");
const currentPath = window.location.pathname;

menuItems.forEach(item => {
  const menuPath = item.getAttribute("data-path");
  const submenu = item.nextElementSibling;
  const icon = item.querySelector(".menu-icon");

  if (menuPath && (currentPath === menuPath || currentPath.startsWith(menuPath + "/"))) {
    item.classList.add("active");
  }

  if (item.tagName !== "A") {
    item.addEventListener("click", () => {

      item.classList.toggle("active");

      if (submenu) {
        if(submenu.style.maxHeight){
          submenu.style.maxHeight = null;
        } else {
          submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
        if (icon) icon.classList.toggle("rotate-90");
      }
    });
  }
});

submenuItem.forEach(item => {
  const href = item.getAttribute("href");
  if(href === currentPath || currentPath.startsWith(href + "/")){
    item.classList.add("text-[#42A5F5]")

    const submenu = item.closest(".submenu");
    if(submenu){
      submenu.style.maxHeight = submenu.scrollHeight + "px";
      
      const menuItem = submenu.previousElementSibling;
      const icon = menuItem.querySelector(".menu-icon");
      if(menuItem){
        menuItem.classList.add("active");
        if (icon) icon.classList.add("rotate-90");
      }
    }
  }
})
//end show submenu

//show password 
// display icon show password on login 
const inputPassword = document.querySelector("input[type='password']");

if(inputPassword){
  const labelShowPassword = document.querySelector(".label-show-password");

  inputPassword.addEventListener("input", () => {
    if(labelShowPassword && inputPassword.value.trim() !== ""){      
      labelShowPassword.classList.remove("hidden");
    } else {
      labelShowPassword.classList.add("hidden");
    }
  });

  function onClickShowPassword() {
    const inputShowPassword = document.getElementById("inputShowPassword");
    const icon = inputShowPassword.parentElement.querySelector("i");
    if(inputShowPassword.checked){
      if(icon){
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
      inputPassword.type = "text";
    } else{
      if(icon){
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
      inputPassword.type = "password"; 
    }
  }
}
  


//End show password 

//floating input 
const floatingInput = document.querySelectorAll(".floating-input");
if(floatingInput.length > 1){
  floatingInput.forEach(input => {
    input.addEventListener("input", () => {
      const label = input.parentElement.querySelector(".label-floating-input");
      label.classList.toggle("fill", input.value.trim() !== "");
    });
  });
}
//end floating input 

// preview image
// const uploadImage = document.querySelector("[upload-image]");
// if(uploadImage){
//     const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
//     const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
//     const dropZone = uploadImage.querySelector("[drop-zone]")
//     const buttonClose = uploadImage.querySelector("[button-close]");

//     uploadImageInput.addEventListener('dragover', () => {
//       dropZone.classList.add('border-blue-400');
//     });

//     ['dragleave', 'drop'].forEach(evt =>
//       uploadImageInput.addEventListener(evt, () => {
//         dropZone.classList.remove('border-blue-400');
//       })
//     );


//     uploadImageInput.addEventListener("change", () => {
//         buttonClose.classList.remove("opacity-0");
//         const file = uploadImageInput.files[0];
//         if(file){
//           uploadImagePreview.src = URL.createObjectURL(file);
//           uploadImagePreview.classList.remove('hidden');        
//         }
//     })

//     // close image preview 
//     if(buttonClose){
//       const removeImageInput = document.querySelector("[remove-image-input]");
//       buttonClose.addEventListener("click", () => {
//         uploadImageInput.value = "";
//         URL.revokeObjectURL(uploadImagePreview.src);
//         uploadImagePreview.src = ""   
//         uploadImagePreview.classList.add("hidden");
//         buttonClose.classList.add("opacity-0");
//         if(removeImageInput){
//           removeImageInput.value = "true";
//         }
//       });
//     }
//     // End close image preview 
// }
// End preview image

// filePond
const listFilepond = document.querySelectorAll('.filepond');
if (listFilepond.length > 0) {
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
  );

  FilePond.setOptions({
    server: {
      load: (source, load, error, progress, abort, headers) => {
        fetch(source)
          .then(res => res.blob())
          .then(load)
          .catch(error);
      }
    }
  });

  listFilepond.forEach((element) => {
    let thumbnails = [];
    const wrapper = element.closest("[data-thumbnails]");
    if (wrapper) {
      const dataThumbnail = wrapper.getAttribute("data-thumbnails");
      if (dataThumbnail) {
        thumbnails = JSON.parse(dataThumbnail || "[]");
      }
    }

    // tạo filepond
    const filePond = FilePond.create(element, {
      labelIdle: `Kéo & Thả ảnh hoặc <span class="filepond--label-action">Chọn ảnh</span>`,
      storeAsFile: true,
      files: thumbnails.map(link => ({
        source: link,
        options: { type: 'local' }
      }))
    });
  });
}
// end filePond

//lightGallery
document.querySelectorAll('.lightgallery').forEach(el => {
  lightGallery(el, {
    plugins: [lgZoom, lgThumbnail],
    speed: 500,
    thumbnail: true,
    zoom: true
  });
});
//end lightGallery

// filter
const filterSelect = document.querySelector("[filter-select]");
if(filterSelect){
  let url = new URL(location.href);

  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    if(value){
      url.searchParams.set("status", value);
    } else {
      url.searchParams.delete("status");
    }

    location.href = url;
  });

  const statusCurrent = url.searchParams.get("status");
  if(statusCurrent){
    filterSelect.value = statusCurrent;
  }
}
// End filter

// search
const formSearch = document.querySelector("[form-search]");
if(formSearch){
  let url = new URL(location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = formSearch.keyword.value;
    
    if(value){
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }

    location.href = url;
  });

  const keywordCurrent = url.searchParams.get("keyword");
  if(keywordCurrent){
    formSearch.keyword.value = keywordCurrent;
  }
}
// End search

// sort
const sortSelect = document.querySelector("[sort-select]");
if(sortSelect){
  let url = new URL(location.href);
  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    if(value){
      const [sortKey, sortValue] = value.split("-");
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
    } else {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
    }

    location.href = url;
  });

  const sortKeyCurrent = url.searchParams.get("sortKey");
  const sortValueCurrent = url.searchParams.get("sortValue");
  if(sortKeyCurrent && sortValueCurrent){
    sortSelect.value = `${sortKeyCurrent}-${sortValueCurrent}`;
  }
}
// end sort

// pagination 
const showSelect = document.querySelector("[show-select]");
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0){
  let url = new URL(location.href);

  if(showSelect){
    showSelect.addEventListener("change", () => {
      const value = showSelect.value;
      if(value){
        url.searchParams.set("limitItem", value);
      } else {
        url.searchParams.delete("limitItem");
      }

      location.href = url;
    });
  }
  
  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      if(page){
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }

      location.href = url;
    });
  });

  const limitItem = url.searchParams.get("limitItem");
  if(limitItem){
    showSelect.value = limitItem;
  }

  const pageCurrent = url.searchParams.get("page") || 1;
  const buttonCurrent = document.querySelector(`[button-pagination = "${pageCurrent}"]`);

  if(buttonCurrent){
    buttonCurrent.classList.add("active");
  }
}
// end pagination 

// change status 
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0){
  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("item-id");
      const statusChange = button.getAttribute("button-change-status");
      const patch = button.getAttribute("data-patch");

      const data = {
        id: itemId,
        status: statusChange
      }

      fetch(patch, {
        headers: {
          "Content-Type": "application/json",
        }, 
        method: "PATCH",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "success"){
            location.reload();
          }
        })
    })
  })
}
// end change status 

// change multi status
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", async (event) => {
    event.preventDefault();

    const patch = formChangeMulti.getAttribute("data-patch");
    const status = formChangeMulti.status.value;
    const ids = [];

    if(status == "delete"){
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn xóa những bảng ghi này",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy"
      });

      if (!result.isConfirmed) {
        return; 
      }
    }

    const listInputChange = document.querySelectorAll("[input-change]:checked");
    if(listInputChange.length > 0){
      listInputChange.forEach(input => {
        const id = input.getAttribute("input-change");
        ids.push(id);
      })
    }

    const data = {
      id: ids,
      status: status
    }

    fetch(patch, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "success"){
          location.reload();
        }
      })
  });
}
// end change multi status

// delete recore 
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0){
  listButtonDelete.forEach(button => {
    button.addEventListener("click", async () => {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn xóa bảng ghi này",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy"
      });

      if (!result.isConfirmed) {
        return; 
      }

      const patch = button.getAttribute("data-patch");
      const id = button.getAttribute("button-id");

      const data = {
        id: id
      }

      fetch(patch, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "success"){
            location.reload();
          }
        })
    });
  });
}
// end delete recore 

// change position
const listInputPosition = document.querySelectorAll("[input-position]");
if(listInputPosition.length > 0){
  listInputPosition.forEach(input => {
    input.addEventListener("change", () => {
      const id = input.getAttribute("item-id");
      const patch = input.getAttribute("data-patch");
      const value = parseInt(input.value);
      
      const data = {
        id: id,
        position: value
      }

      fetch(patch, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "success"){
            location.reload();
          }
        })
    });
  });
}
// end change position

//permission
const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const dataFinal = [];
    const listElementRoleId = document.querySelectorAll("[role-id]");

    listElementRoleId.forEach(element => {
      const roleId = element.getAttribute("role-id");
      const permissions = [];

      const listInputChecked = document.querySelectorAll(`input[data-id="${roleId}"]:checked`);
      listInputChecked.forEach(input => {       
        const tr = input.closest("tr[data-name]");
        const name = tr.getAttribute("data-name");
        permissions.push(name);
      });

      dataFinal.push({
        id: roleId,
        permissions: permissions
      });
    })

    const patch = buttonSubmit.getAttribute("data-patch");
    fetch(patch, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(dataFinal)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "success"){
          location.reload();
        }
      })
  });

  let dataPermissions = tablePermission.getAttribute("table-permission");
  dataPermissions = JSON.parse(dataPermissions);
  dataPermissions.forEach(item => {
    item.permissions.forEach(permission => {
      const input = document.querySelector(`tr[data-name="${permission}"] input[data-id="${item._id}"]`);
      input.checked = true;
    });
  });
}
//end permission

// show chart 
const buttonMessage = document.querySelector(".header .button-message");
if(buttonMessage){
  const chatList = document.querySelector(".chat-list");
  const chatMessage = document.querySelector(".chat-message");
  const buttonCloseChat = document.querySelectorAll(".button-close-chat");

  buttonMessage.addEventListener("click", () => {
    chatList.classList.remove("translate-x-[calc(100%+40px)]");
    chatList.classList.add("translate-x-[0]");

    const ul = document.querySelector(".chat-list .chat-list-main ul");
    ul.innerHTML = "";

    const patch = buttonMessage.getAttribute("data-patch");
    fetch(patch)
      .then(res => res.json())
      .then(data => {
        data.accounts.forEach(item => {
          const li = document.createElement("li");
          li.className = "px-[20px] pb-[10px] mb-[10px] flex items-center relative border-b-[1px] border-[#efefef] cursor-pointer";
          li.setAttribute("room-chat-id", item.roomChatId)
          li.setAttribute("user-id", item.id)
          
          li.innerHTML = `
            <div class="pr-[10px]">
              <img class="w-[45px] h-[45px] rounded-[50%] border-[2px] border-[#fff] shadow-[0_5px_10px_0_rgba(43,43,43,0.2)]" src=${item.avatar} />
              <div class="w-[10px] h-[10px] rounded-[50%] bg-[#D6D6D6] absolute top-[20px] right-[20px] inner-status" status=${item.statusOnline}></div>
            </div>
            <span class="flex-1 text-[14px] font-[600] capitalize">${item.fullName}</span>
          `;

          li.addEventListener("click", () => {
            const userId = data.userId;
            const prefixAdmin = data.prefixAdmin;
            const roomChatId = item.roomChatId;

            socket.emit("JOIN_ROOM_CHAT", roomChatId);

            chatMessage.classList.remove("translate-x-[calc(100%+40px)]");
            chatMessage.classList.add("translate-x-[0]");

            chatMessage.querySelector(".inner-form").setAttribute("room-chat-id", item.roomChatId)
            chatMessage.querySelector(".inner-form").setAttribute("my-id", userId)

            fetch(`/${prefixAdmin}/chats/${roomChatId}`)
              .then(res => res.json())
              .then(dataChat => {
                const chatMessageTitle = chatMessage.querySelector(".chat-message-title");
                chatMessageTitle.innerHTML = item.fullName;

                const chatMessageMain = chatMessage.querySelector(".chat-message-main");
                chatMessageMain.innerHTML = "";

                chatMessageMain.setAttribute("data-last-date", "");

                let lastDate = "";

                if (Array.isArray(dataChat.chats)) {
                  dataChat.chats.forEach(element => {
                    const [time, date] = element.createdAtFormat.split("-");
                    if(date !== lastDate){
                      const dateDiv = document.createElement("div");
                      dateDiv.className = "text-center mb-[20px]"
                      dateDiv.innerHTML = `
                        <span class="inline-block text-white py-[4px] px-[8px] bg-[#BCBDC0] rounded-[13px] text-[12px]">${date}</span>
                      `;
                      chatMessageMain.appendChild(dateDiv);
                      lastDate = date;
                      chatMessageMain.setAttribute("data-last-date", date);
                    }


                    const messageDiv = document.createElement("div");
                    messageDiv.className = "flex px-[15px] pb-[20px] items-start " + (userId == element.userId ? "justify-end" : "");
                    
                    if(userId != element.userId){
                      messageDiv.innerHTML = `
                        <div class="w-[40px] h-[40px] flex-shrink-0 rounded-[50%] border-[2px] border-[#fff] overflow-hidden shadow-[0_5px_10px_0_rgba(43,43,43,0.2)] mr-[20px]">
                          <img class="w-full h-full object-cover" src=${element.avatar} alt=""/></div>
                        <div class="">
                          <div class="bg-[#d9ebff] rounded-[10px] rounded-tl-[0px] relative before:content-[''] before:absolute before:top-0 before:left-[-14px] before:border-[8px] before:border-transparent before:border-t-[#d9ebff] before:border-r-[#d9ebff]">
                            <p class="p-[10px] text-[14px] text-black font-[500]">${element.content}</p>
                          </div><span class="text-[14px] text-gray-600 font-[500] ml-[9px] mr-[8px] mt-[10px]">${time}</span>
                        </div>
                      `
                    } else {
                      messageDiv.innerHTML = `
                        <div class="pr-[10px] text-right">
                          <div class="bg-[#F2F7FB] rounded-[10px] rounded-br-[0px] relative before:content-[''] before:absolute before:bottom-0 before:right-[-10px] before:border-[5px] before:border-transparent before:border-b-[#F2F7FB] before:border-l-[#F2F7FB]">
                            <p class="p-[10px] text-[14px] text-black font-[500]">${element.content}</p>
                          </div><span class="text-[14px] text-gray-600 font-[500] ml-[9px] mr-[8px] mt-[10px]">${time}</span>
                        </div>
                      `
                    }

                    chatMessageMain.appendChild(messageDiv);
                  });

                  const listTypingDiv = document.createElement("div");
                  listTypingDiv.classList = "inner-list-typing";
                  chatMessageMain.appendChild(listTypingDiv);
                  
                  requestAnimationFrame(() => {
                    chatMessageMain.scrollTop = chatMessageMain.scrollHeight;
                  });
                }

                
              })
          })
          
          ul.appendChild(li);
        });
      })
  });

  buttonCloseChat.forEach(button => {
    button.addEventListener("click", () => {
      const isChatList = button.closest(".chat-list");
      const isChatMessage = button.closest(".chat-message");

      if(isChatList){
        isChatList.classList.add("translate-x-[calc(100%+40px)]");
        isChatList.classList.remove("translate-x-[0]");
      }
      
      if(isChatMessage){
        isChatMessage.classList.add("translate-x-[calc(100%+40px)]");
        isChatMessage.classList.remove("translate-x-[0]");
      }
    });
  })
}
// end show chat 

// alert message
if (typeof flashSuccess !== "undefined") {
  Swal.fire({
    icon: "success",
    title: flashSuccess,
    showConfirmButton: false,
    timer: 1500
  });
}

if (typeof flashError !== "undefined") {
  Swal.fire({
    icon: "error",
    title: flashError,
    showConfirmButton: false,
    timer: 1500
  });
}
// End alert message

window.addEventListener("error", (e) => {
  console.warn("ERROR CAUGHT:", e.message);
  console.warn("Source:", e.filename);
  console.warn("Line:", e.lineno);
});