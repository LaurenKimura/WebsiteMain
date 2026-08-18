import Hero from "./components/home/Home";
import Video from "./components/video/Video";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";

const App = () => {
  return (
    <div className="container">
      <section id="home">
        <Hero />
      </section>
      <section id="video">
        <Video />
      </section>
      {/* <section id="portfolio"> */}
        <Portfolio />
      {/* </section> */}
      <section id="contact">
        <Contact />
      </section>
      
    </div>
   
  )
}

export default App