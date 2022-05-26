import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import HomeContextProvider from "./contexts/HomeContextProvider";
import MvContextProvider from "./contexts/MvContextProvider";
import SongContextProvider from "./contexts/SongContextProvider";
import PlayListContextProvider from "./contexts/PlayListContextProvider";
import VideoContextProvider from "./contexts/VideoContextProvider";
import SearchContextProvider from "./contexts/SearchContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <HomeContextProvider>
    <SearchContextProvider>
      <MvContextProvider>
        <PlayListContextProvider>
          <SongContextProvider>
            <VideoContextProvider>
              <App />
            </VideoContextProvider>
          </SongContextProvider>
        </PlayListContextProvider>
      </MvContextProvider>
    </SearchContextProvider>
  </HomeContextProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
