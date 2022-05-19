import Routes from "./routes/routes";
import { SongContext } from "./contexts/SongContextProvider";
import FooterLoader from "./components/Footer/FooterLoader";
import Footer from "./components/Footer/Footer";
import { useContext } from "react";

function App() {
  const { loaderSong } = useContext(SongContext);
  return (
    <div className="container">
      <Routes el={loaderSong ? <FooterLoader /> : <Footer />} />
    </div>
  );
}

export default App;
