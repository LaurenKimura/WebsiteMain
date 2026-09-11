import Hero from "./components/home/Home";
import Video from "./components/video/Video";
import Experience from "./components/experience/Experience";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";

const App = () => {
  return (
    <>
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
    </>
  )
}

export default App