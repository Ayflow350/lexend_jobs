import Companies from "../components/Companies";
import Faq from "../components/Faq";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Integrations from "../components/Integrations";
import Testimonial from "../components/Testimonial";

export default function Home() {
  return (
    <div className="">
      <div className="bg-black bg-hero bg-cover bg-center lg:h-[900px]">
        <div className="container mx-auto max-w-[1200px]">
          <Header />
          <Hero />
        </div>
      </div>
      <div className="">
        <Companies />
        <Features />
        <Integrations />
        <Faq />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
}
