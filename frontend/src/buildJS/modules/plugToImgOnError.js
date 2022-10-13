function plugToImgOnError() {
    document.querySelectorAll('object').forEach(function (objectWidthImgDefault) {
        // if(window.location.pathname === "/") {
        objectWidthImgDefault.querySelector("img").src = "/assets?file=plug-user.svg";
        // }
        // else {
        //   objectWidthImgDefault.querySelector("img").src = "../assets?file=plug-user.svg";
        // }
    });
}
export default plugToImgOnError;
