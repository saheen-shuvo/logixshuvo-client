import Banner from "./Banner";
import Counter from "./Counter";
import DeliveryPartners from "./DeliveryPartners";
import Faq from "./Faq";
import OurFeatures from './OurFeatures';
import TopDeliveryMan from "./TopDeliveryMan";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <Counter></Counter>
            <TopDeliveryMan></TopDeliveryMan>
            <DeliveryPartners></DeliveryPartners>
            <Faq></Faq>
        </div>
    );
};

export default Home;