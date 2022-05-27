import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ZingChart from "../pages/zingchart/ZingChart";
import Follow from "../pages/follow/Follow";
import Personal from "../pages/personal/Personal";
import Category from "../pages/category/Category";
import Mv from "../pages/mv/Mv";
import NewSong from "../pages/newsong/NewSong";
import Top100 from "../pages/top100/Top100";
import PersonalContent from "../components/personal/PersonalContent";
import PopCast from "../components/personal/PopCast";
import AblumPersonal from "../components/personal/AblumPersonal";
import MvPersonal from "../components/personal/MvPersonal";
import MvItem from "../components/mv/MvItem";
import PlayList from "../pages/Album/PlayList";
import Video from "../pages/video/Video";
import ResultSearchData from "../components/Header/ResultSearchData";

const routes = ({ el }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal" element={<Personal />}>
          <Route index element={<PersonalContent />} />
          <Route index path="song" element={<PersonalContent />} />
          <Route path="podcast" element={<PopCast />} />
          <Route path="album" element={<AblumPersonal />} />
          <Route path="mv" element={<MvPersonal />} />
        </Route>
        <Route path="/zingchart" element={<ZingChart />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/category" element={<Category />} />
        <Route path="/the-loai-video" element={<Mv />}>
          <Route index element={<MvItem />} />
          <Route path=":id" element={<MvItem />} />
        </Route>
        <Route path="/newsong" element={<NewSong />} />
        <Route path="/top100" element={<Top100 />} />
        <Route path={`/video-clip/:slug/:id`} element={<Video />} />
        <Route path={`/:playlist/:slug/:id`} element={<PlayList />} />
        <Route path={`/tim-kiem/:keyword`} element={<ResultSearchData />} />
      </Routes>
      {el}
    </Router>
  );
};

export default routes;
