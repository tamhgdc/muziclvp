import Routes from "./routes/routes";
import { SongContext } from "./contexts/SongContextProvider";
import { VideoContext } from "./contexts/VideoContextProvider";
import FooterLoader from "./components/Footer/FooterLoader";
import Footer from "./components/Footer/Footer";
import { useContext } from "react";
import Miniature from "./pages/MiniatureVideo/MiniatureVideo";
import DetailSong from "./pages/detailSong/DetailSong";

function App() {
  const { loaderSong } = useContext(SongContext);
  const { checkMiniVideo } = useContext(VideoContext);
  return (
    <div className="container">
      <Routes
        footer={loaderSong ? <FooterLoader /> : <Footer />}
        miniVideo={checkMiniVideo && <Miniature />}
        detailSong={<DetailSong />}
      />
    </div>
  );
}

export default App;
