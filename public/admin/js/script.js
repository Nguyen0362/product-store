// show notification
const dropdownToggle = document.querySelector(".header .dropdown-toggle");
if(dropdownToggle){
    dropdownToggle.addEventListener("click", () => {
        const showNotification = document.querySelector(".header .show-notification");
        if(showNotification.style.display == "block"){
            showNotification.style.display = "none";
        } else {
            showNotification.style.display = "block";
        }
    })
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

// preview image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    const dropZone = uploadImage.querySelector("[drop-zone]")
    const buttonClose = uploadImage.querySelector("[button-close]");

    uploadImageInput.addEventListener('dragover', () => {
      dropZone.classList.add('border-blue-400');
    });

    ['dragleave', 'drop'].forEach(evt =>
      uploadImageInput.addEventListener(evt, () => {
        dropZone.classList.remove('border-blue-400');
      })
    );


    uploadImageInput.addEventListener("change", () => {
        buttonClose.classList.remove("opacity-0");
        const file = uploadImageInput.files[0];
        if(file){
          uploadImagePreview.src = URL.createObjectURL(file);
          uploadImagePreview.classList.remove('hidden');        
        }
    })

    // close image preview 
    if(buttonClose){
      buttonClose.addEventListener("click", () => {
        uploadImageInput.value = "";
        URL.revokeObjectURL(uploadImagePreview.src);
        uploadImagePreview.src = "";
        uploadImagePreview.classList.add("hidden");
        buttonClose.classList.add("opacity-0");
      })
    }
    // End close image preview 
}
// End preview image

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
    icon: "icon",
    title: flashError,
    showConfirmButton: false,
    timer: 1500
  });
}
// End alert message