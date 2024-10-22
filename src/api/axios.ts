import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "production" 
      ? "http://170.239.85.88:5000"
      : "/api/",
    withCredentials: true,
  });

//   instance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   });

// instance.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response.status === 401) {
//             useAuthStore.getState().logOut();
//         }
//         return Promise.reject(error)
//     }
// )

export default instance;