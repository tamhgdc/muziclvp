import React from "react";
import CategoryList from "../../components/category/CategoryList";
import National from "../../components/category/National";
import Theme from "../../components/category/Theme";
import MainLayout from "../../layout/MainLayout";
import "./category.css";

const Category = () => {
  return (
    <MainLayout>
      <div className="content">
        <div className="banner__vip">
          <figure>
            <img
              src="https://photo-zmp3.zmdcdn.me/cover/d/2/2/3/d223524cfa359d16b2c0d6e4497c126f.jpg"
              alt=""
            />
          </figure>
        </div>
        <div className="section gallery">
          <div className="topic-section">
            <div className="section__title mt-40">
              <h3>tâm trạng và hoạt động</h3>
            </div>
            <Theme />
            <div className="zm-section">
              <button>tất cả</button>
            </div>
          </div>
          <div className="topic-hot-section">
            <div className="section__title mb-20">
              <h3>quốc gia</h3>
            </div>
            <National />
          </div>

          <div className="playlist__selection">
            <div className="header__playlist__selection">
              <span>Trữ Tình & Bolero</span>
              <div className="btn__view__all">
                TẤT CẢ <i className="fa-solid fa-angle-right"></i>
              </div>
            </div>
            <CategoryList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
