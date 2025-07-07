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

    buttonHeader.addEventListener("click", () => {
      headerRight.classList.toggle("h-[0]");
      headerRight.classList.toggle("h-[80px]");
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

    uploadImageInput.addEventListener('dragover', () => {
      dropZone.classList.add('border-blue-400');
    });

    ['dragleave', 'drop'].forEach(evt =>
      uploadImageInput.addEventListener(evt, () => {
        dropZone.classList.remove('border-blue-400');
      })
    );


    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            uploadImagePreview.classList.remove('hidden');        }
    })
}
// End preview image