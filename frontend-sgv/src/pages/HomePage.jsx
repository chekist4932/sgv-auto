
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowToBuy from "../components/HowToBuy";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import Consultation from "../components/Consultation";
import CustomsCalculator from "../components/CustomsCalculator";
import Footer from "../components/Footer";
import Cars from "../components/Cars";
import ContactForm from "../components/ContactForm";
import Reviews from "../components/Reviews";
import News from "../components/News";


const HomePage = () => {

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Header navIsActive={true}/>
            <Hero />
            <HowToBuy />
            <Benefits />
            <Cars />
            <div className="container mx-auto px-4 py-8">
                <CustomsCalculator />
            </div>
            <Reviews />
            <Services />
            <News />
            <Consultation />
            <ContactForm />
            <Footer />
        </div>
    )
};

export default HomePage;