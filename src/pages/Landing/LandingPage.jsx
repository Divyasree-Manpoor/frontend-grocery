import HeroSection from "./components/HeroSection";
 import FeaturesSection from "./components/FeaturesSection";
 import CTASection from "./components/CTASection";

 const LandingPage = () => {
 return (
    <div className="min-h-screen 
                     bg-white 
                     dark:bg-gray-950 
                    transition-colors duration-500">
      <HeroSection />
       <FeaturesSection />
       <CTASection />
    </div>
   );
 };

 export default LandingPage;


// const LandingPage = () => {
//   return (
//     <div style={{ background: "white", color: "blue", fontSize: "50px", minHeight: "100vh" }}>
//       LANDING PAGE WORKING
//     </div>
//   );
// };

// export default LandingPage;