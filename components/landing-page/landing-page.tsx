import React from "react";
import Header from "./hearder";
import HeroSection from "./hero-section";
import Feartures from "./feartures";
import HowItWorks from "./how-it-works";
import Pricing from "./pricing";
import Testimonials from "./testimonials";
import Footer from "./footer";
import CallToAction from "./call-to-action";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <Feartures />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default LandingPage;
