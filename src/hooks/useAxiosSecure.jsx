import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("api response error status error", error);

        if (error.status === 401 || error.status === 403) {
          console.log("need to logout the user");
          signOutUser()
            .then(() => {
              console.log("Logged out user");
              navigate("/signIn");
            })
            .catch((error) => console.log(error));
        }
        return Promise.reject(error);
      }
    );
  });

  return axiosInstance;
};

export default useAxiosSecure;

/**
 * axios: get, post, put/patch, delete ---> easier
 * intercepter: client ---------|---------> server
 * client <------------|------------ server
 * In the intercepter for response == needs two function
 */
