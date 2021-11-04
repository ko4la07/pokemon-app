import React from "react";
import imgHome from '../assets/img/pokemon-tour.jpeg'
import Footer from "./Footer";

const Home = () => {
  return (
    <>
    <div>
      <img src={imgHome} alt="imgen-home" />
    </div>
    <Footer/>
    </>
  )
};

export default Home;
