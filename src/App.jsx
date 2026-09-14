import Hero from "./components/home/Home";
import Video from "./components/video/Video";
import Experience from "./components/experience/Experience";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";
import Navbar from "./components/nav/Navbar";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <section id="home">
          <Hero />
        </section>

        <section id="experience">
          <Experience />
        </section>

        {/* <section id="video">
          <Video />
        </section> */}
      </div>

      <Portfolio />

      <section id="contact">
        <div className="container">
          <Contact />
        </div>
      </section>

      <Analytics />
    </>
  )
}

export default App