import Routes from "./routes/routes";
import { SongContext } from "./contexts/SongContextProvider";
import { VideoContext } from "./contexts/VideoContextProvider";
import FooterLoader from "./components/Footer/FooterLoader";
import Footer from "./components/Footer/Footer";
import { useContext } from "react";
import Miniature from "./pages/MiniatureVideo/MiniatureVideo";

function App() {
  const { loaderSong } = useContext(SongContext);
  const { checkMiniVideo } = useContext(VideoContext);
  return (
    <div className="container">
      <Routes
        el={loaderSong ? <FooterLoader /> : <Footer />}
        miniVideo={checkMiniVideo && <Miniature />}
      />
    </div>
  );
}

export default App;
