import React from "react";
import TickerTape from "../components/TickerTape";
import Hero from "../components/Hero/Hero";
import TrendingStrip from "../components/TrendingStrip";
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
  return (
    <>
      <TickerTape />
      <Hero />
      <TrendingStrip />
      <CoinsTable />
    </>
  );
};

export default Homepage;
