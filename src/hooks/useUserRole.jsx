import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useUserRole = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [userRole, setUserRole] = useState(null);
    const email = user?.email;
  
    useEffect(() => {
      if (email) {
        axiosPublic
          .get(`/users/role/${email}`)
          .then((res) => {
            console.log(res.data)
            setUserRole(res.data.role);
          })
          .catch((error) => console.error("Error fetching user role:", error));
      }
    }, [email, axiosPublic]);
    return (
        userRole
    );
};

export default useUserRole;