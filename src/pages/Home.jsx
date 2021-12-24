import React from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Search />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
