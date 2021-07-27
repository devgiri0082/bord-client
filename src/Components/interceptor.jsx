import axios from "axios";

export default function interceptor(history) {
    let previousRequest;
    let previousMethod;
    axios.defaults.baseURL = "http://localhost:3300/"
    axios.interceptors.request.use(
        function (req) {
            console.log("requesting");
            req.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            console.log(req.url, req.method);
            previousRequest = req.url;
            previousMethod = req.method;
            return req;
        },
        function (err) {
            console.log(err);
            return Promise.reject(err);
        }
    );
    axios.interceptors.response.use(
        async function (response) {
            console.log(response);
            if (response.data.message === "invalid token") {
                try {
                    console.log("going in", localStorage.getItem("refreshToken"));
                    let response = await fetch("http://localhost:3300/refresh", {
                        method: "POST",
                        headers: {
                            'Authorization': `bearer ${localStorage.getItem("refreshToken")}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    let data = await response.json();
                    console.log(data, response, "refresh");
                    if (response.status !== 200) {
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("accessToken");
                        return history.push("/");
                    }
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    switch (previousMethod) {
                        case "get":
                            return axios.get(previousRequest);
                        case "post":
                            return axios.post(previousRequest);
                        case "delete":
                            return axios.delete(previousRequest);
                        case "put":
                            return axios.put(previousRequest);
                        case "patch":
                            return axios.patch(previousRequest);
                        default:
                    }

                } catch (err) {
                    console.log(err, "refreshError");
                }
            }
            console.log("resonse in interceptor", response.data.message)
            return response;
        },
        function (err) {
            console.log(err, "error")
            return Promise.reject(err);
        }
    )

}