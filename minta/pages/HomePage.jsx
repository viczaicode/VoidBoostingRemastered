import logo2 from "../logo2.png";
import TypeWriter from "../components/TypeWriter";
import Services from "../components/Services";
import { ServiceProvider } from "../contexts/ServiceContext";

function HomePage() {
  const welcomeText =
    "Welcome, summoner. Your ascension begins.\nLet the Void carry you to the rank you deserve.";

  return (
    <>
      <div className="udvozlo">
        <img src={logo2} className="App-logo2" alt="logo" />

        <p className="typing-text">
          <span className="intro-bold">
            <TypeWriter text={welcomeText.split("\n")[0]} />
          </span>
          <br />
          <br />
          <TypeWriter text={welcomeText.split("\n")[1]} />
        </p>
      </div>

      <div className="container">
        <ServiceProvider>
          <Services />
        </ServiceProvider>
      </div>
    </>
  );
}

export default HomePage;

