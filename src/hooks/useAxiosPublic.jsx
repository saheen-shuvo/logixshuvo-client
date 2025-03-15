import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://logixshuvo-server-saheen-alam-shuvos-projects.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
