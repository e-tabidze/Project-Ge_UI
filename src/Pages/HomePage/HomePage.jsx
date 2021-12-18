import React, { useState, useEffect } from "react";
import useJewels from "../../Helpers/useJewels";
import { getUserFavorites } from "../../Services/ApiEndpoints";

import ProductCard from "../../Components/ProductCard/ProductCard";
import Searchbar from "../../ReusableComponents/Searchbar/Searchbar";
import Filters from "../../Components/Filters/Filters";
import ImageSlider from "../../ReusableComponents/ImageSlider/ImageSlider";
import banner1 from "../../Assets/main.jpeg";
import banner2 from "../../Assets/main.jpeg";
import banner3 from "../../Assets/main.jpeg";
import banner4 from "../../Assets/main.jpeg";
import side from "../../Assets/side.jpeg";
import filterIcon from "../../Assets/filter-icon.png";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";

const HomePage = ({ currentUser }) => {
  const { jewels } = useJewels();
  const [filters, setFilters] = useState(true);
  const [filteredJewels, setFilteredJewels] = useState([]);
  const [userFavorites, setUserFavorites] = useState(null);

  useEffect(() => {
    jewels && setFilteredJewels(jewels);
    handleGetUserFavorites();
  }, [jewels]);

  const sliderData = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    { image: banner4 },
  ];

  const toggleFilters = () => {
    setFilters(!filters);
  };

  const handleSearch = (e) => {
    let jewelData = jewels;
    let filtered = jewelData.filter((item) => {
      return item.name.toLowerCase().includes(e.toLowerCase());
    });
    setFilteredJewels(filtered);
  };

  const handleGetUserFavorites = async () => {
    const data = await getUserFavorites(currentUser?._id);
    console.log(data.favorite_products, "DATA", currentUser._id);
    setUserFavorites(data.favorite_products);
  };

  return (
    <div className={classes.homepage}>
      <>
        <div className={classes.homepage_filters} onClick={toggleFilters}>
          <span>ფილტრები</span>
          <img
            src={filterIcon}
            className={classes.homepage_filters_filterIcon}
          />
        </div>
        {filters && (
          <Filters
            toggleFilters={toggleFilters}
            setFilteredJewels={setFilteredJewels}
          />
        )}
      </>
      <div className={classes.homepage_content}>
        <Searchbar onChange={handleSearch} placeholder={"ძებნა"} />
        <div className={classes.homepage_content_slider}>
          <ImageSlider
            classes={`${userClasses.slider} ${userClasses.slider_adSlider} `}
            sliderData={sliderData}
          />
        </div>
        <div className={classes.homepage_content_products}>
          {filteredJewels?.map((jewel) => {
            return (
              <ProductCard
                product={jewel}
                currentUser={currentUser}
                userFavorites={userFavorites}
                setUserFavorites={setUserFavorites}
                key={jewel._id}
              />
            );
          })}
          <img
            src={side}
            alt="ოქროს მარკეტი საქართველოში"
            className={classes.homepage_ad}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
