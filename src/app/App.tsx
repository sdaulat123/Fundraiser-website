import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TheNeed } from "./components/TheNeed";
import { Impact } from "./components/Impact";
import { Donation } from "./components/Donation";
import { Transparency } from "./components/Transparency";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Hero />
      <About />
      <TheNeed />
      <Impact />
      <Donation />
      <Transparency />
      <Footer />
    </div>
  );
}
