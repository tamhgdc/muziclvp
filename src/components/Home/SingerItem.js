import React from "react";

const SingerItem = ({ artist }) => {
  return (
    <>
      <a href="#" className="name__singer">
        {artist.name}
      </a>
      <span className="end">, </span>
    </>
  );
};

export default SingerItem;
