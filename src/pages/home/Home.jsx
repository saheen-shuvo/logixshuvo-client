import Banner from "./Banner";
import Contact from "./Contact";
import Counter from "./Counter";
import DeliveryPartners from "./DeliveryPartners";
import Faq from "./Faq";
import FreeShipping from "./FreeShipping";
import OurFeatures from "./OurFeatures";
import TopDeliveryMan from "./TopDeliveryMan";

const Home = () => {
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
