// import { useEffect, useState } from "react";
import Banner from "./Banner";
import Contact from "./Contact";
import Counter from "./Counter";
import DeliveryPartners from "./DeliveryPartners";
import Faq from "./Faq";
import FreeShipping from "./FreeShipping";
import OurFeatures from "./OurFeatures";
import TopDeliveryMan from "./TopDeliveryMan";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

const Home = () => {
  // const axiosPublic = useAxiosPublic();
  // const { user } = useAuth();
  // const [userRole, setUserRole] = useState(null);
  // const email = user?.email;
  // console.log(email);

  // useEffect(() => {
  //   if (email) {
  //     axiosPublic
  //       .get(`/users/role/${email}`)
  //       .then((res) => {
  //         console.log(res.data)
  //         setUserRole(res.data.role);
  //       })
  //       .catch((error) => console.error("Error fetching user role:", error));
  //   }
  // }, [email, axiosPublic]);

  return (
    <div>
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <Counter></Counter>
      <TopDeliveryMan></TopDeliveryMan>
      <FreeShipping></FreeShipping>
      <DeliveryPartners></DeliveryPartners>
      <Faq></Faq>
      <Contact></Contact>
    </div>
  );
};

export default Home;
