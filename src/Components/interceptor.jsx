import axios from "axios";

export default function interceptor(history) {
    let previousRequest;
    let previousMethod;
    let previousBody;
    axios.defaults.baseURL = "http://localhost:3300/"
    axios.interceptors.request.use(
        function (req) {
            req.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            previousRequest = req.url;

            previousMethod = req.method;
            previousBody = req.data;
            return req;
        },
        function (err) {
            console.log(err);
            return Promise.reject(err);
        }
    );
    axios.interceptors.response.use(
        async function (response) {
            if (response.data.message === "invalid token") {
                try {
                    let response = await fetch("http://localhost:3300/refresh", {
                        method: "POST",
                        headers: {
                            'Authorization': `bearer ${localStorage.getItem("refreshToken")}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    let data = await response.json();
                    if (response.status !== 200) {
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("accessToken");
                        return;
                    }
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    switch (previousMethod) {
                        case "get":
                            return axios.get(previousRequest, previousBody);
                        case "post":
                            return axios.post(previousRequest, previousBody);
                        case "delete":
                            return axios.delete(previousRequest, previousBody);
                        case "put":
                            return axios.put(previousRequest, previousBody);
                        case "patch":
                            return axios.patch(previousRequest, previousBody);
                        default:
                    }

                } catch (err) {
                    console.log(err, "refreshError");
                }
            }
            return response;
        },
        function (err) {
            console.log(err, "error")
            return err;
        }
    )

}