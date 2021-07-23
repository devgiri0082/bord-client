import axios from "axios";

export default function interceptor(history) {
    axios.defaults.baseURL = "http://localhost:3300/"
    axios.interceptors.request.use(
        function (req) {
            req.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
            console.log(req.url);
            return req;
        },
        function (err) {
            console.log(err);
            return Promise.reject(err);
        }
    );
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (err) {
            console.log(err)
            return Promise.reject(err);
        }
    )

}