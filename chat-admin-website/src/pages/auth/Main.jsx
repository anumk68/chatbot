import React from "react";
import Navbar from "./component/Navbar";
import HeroSection from "./component/HeroSection";
import Logos from "./component/logos";
import DataSaving from "./component/DataSaving";
import FeaturesSection from "./component/Features";
import EasyStep from "./component/EasySteps";
import Solutions from "./component/Solutions";
import PricingSection from "./component/Pricing";
import TestimonialSlider from "./component/Testimonials";
import Footer from "./component/Footer";
import Freetrial from "./component/Freetrial";
import Faq from "./component/Faq";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Logos />
      <DataSaving />
      <FeaturesSection/>
      <EasyStep />
      <Solutions/>
      <PricingSection/>
      <TestimonialSlider/>
      <Faq/>
      <Freetrial/>
      <Footer/>
    </>
  );
};

export default Home;
