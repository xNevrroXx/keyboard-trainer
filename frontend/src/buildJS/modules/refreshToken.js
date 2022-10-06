import axios from "axios";
function refreshToken(urls) {
    const refreshToken = localStorage.getItem("refreshToken");
    axios.post(urls.refreshToken, { token: refreshToken })
        .then(response => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
    });
}
export default refreshToken;
