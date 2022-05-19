import React, { useEffect } from "react";
import { URL_API } from "../../constants/api";

const GalleryCarousel = ({ banner }) => {
  const $ = document.querySelector.bind(document);

  const nextSlide = () => {
    const galleryFirts = $(".gallery__item.gallery__item__firts");
    const galleryPrevous = $(".gallery__item.gallery__item__prevous");
    const gallerySelected = $(".gallery__item.gallery__item__selected");
    const galleryNext = $(".gallery__item.gallery__item__next");
    const galleryLast = $(".gallery__item.gallery__item__last");
    const galleryAdd = $(".gallery__item.gallery__item__add");

    gallerySelected.classList.replace(
      "gallery__item__selected",
      "gallery__item__prevous"
    );
    galleryNext.classList.replace(
      "gallery__item__next",
      "gallery__item__selected"
    );
    galleryLast.classList.replace("gallery__item__last", "gallery__item__next");
    galleryAdd.classList.replace("gallery__item__add", "gallery__item__last");
    galleryFirts.classList.replace(
      "gallery__item__firts",
      "gallery__item__add"
    );
    galleryPrevous.classList.replace(
      "gallery__item__prevous",
      "gallery__item__firts"
    );
  };

  const prevSlide = () => {
    const galleryFirts = $(".gallery__item.gallery__item__firts");
    const galleryPrevous = $(".gallery__item.gallery__item__prevous");
    const gallerySelected = $(".gallery__item.gallery__item__selected");
    const galleryNext = $(".gallery__item.gallery__item__next");
    const galleryLast = $(".gallery__item.gallery__item__last");
    const galleryAdd = $(".gallery__item.gallery__item__add");

    gallerySelected.classList.replace(
      "gallery__item__selected",
      "gallery__item__next"
    );
    galleryNext.classList.replace("gallery__item__next", "gallery__item__last");
    galleryLast.classList.replace("gallery__item__last", "gallery__item__add");
    galleryAdd.classList.replace("gallery__item__add", "gallery__item__firts");
    galleryFirts.classList.replace(
      "gallery__item__firts",
      "gallery__item__prevous"
    );
    galleryPrevous.classList.replace(
      "gallery__item__prevous",
      "gallery__item__selected"
    );
  };

  let nextSlideAuto = setInterval(nextSlide, 5000);
  clearInterval(nextSlideAuto);
  const nextSlideBtn = () => {
    nextSlide();
    clearInterval(nextSlideAuto);
    nextSlideAuto = setInterval(nextSlide, 5000);
  };
  const prevSlideBtn = () => {
    prevSlide();
    clearInterval(nextSlideAuto);
    nextSlideAuto = setInterval(nextSlide, 5000);
  };

  return (
    <div className="gallery__container">
      <div className="prev__slide__galleyry">
        <i className="fa-solid fa-chevron-left" onClick={prevSlideBtn}></i>
      </div>
      <div className="gallery__item gallery__item__add">
        <a href={`${URL_API}song?id=${banner?.items[0].encodeId}`}>
          <img src={banner?.items[0].banner} alt="" />
        </a>
      </div>
      <div className="gallery__item gallery__item__firts">
        <a href={`${URL_API}song?id=${banner?.items[1].encodeId}`}>
          <img src={banner?.items[1].banner} alt="" />
        </a>
      </div>
      <div className="gallery__item gallery__item__prevous">
        <a href={`${URL_API}song?id=${banner?.items[2].encodeId}`}>
          <img src={banner?.items[2].banner} alt="" />
        </a>
      </div>
      <div className="gallery__item gallery__item__selected">
        <a href={`${URL_API}song?id=${banner?.items[3].encodeId}`}>
          <img src={banner?.items[3].banner} alt="" />
        </a>
      </div>
      <div className="gallery__item gallery__item__next">
        <a href={`${URL_API}song?id=${banner?.items[4].encodeId}`}>
          <img src={banner?.items[4].banner} alt="" />
        </a>
      </div>
      <div className="gallery__item gallery__item__last">
        <a href={`${URL_API}song?id=${banner?.items[5].encodeId}`}>
          <img src={banner?.items[5].banner} alt="" />
        </a>
      </div>
      <div className="next__slide__galleyry">
        <i className="fa-solid fa-chevron-right" onClick={nextSlideBtn}></i>
      </div>
    </div>
  );
};

export default GalleryCarousel;
