import React from "react";
import useJewel from "../../Helpers/useJewel";
import useSimilarJewels from "../../Helpers/useSimilarJewels";
import useCurrentUser from "../../Helpers/useCurrentUser";
import ImageSlider from "../../ReusableComponents/ImageSlider/ImageSlider";
import ProductCard from "../../Components/ProductCard/ProductCard";

import side from "../../Assets/side.jpeg";
import internal from "../../Assets/internal.jpeg";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";
import FavoriteButton from "../../ReusableComponents/FavoriteButton/FavoriteButton";

const ProductPage = () => {
  const { jewel } = useJewel();
  const { similarJewels } = useSimilarJewels(jewel);
  const { currentUser } = useCurrentUser();

  return (
    <section className={classes.productpage}>
      <div className={classes.productpage_topAd}>
        <img src={internal} alt="ოქროს მარკეტი საქართველოში" />
      </div>
      <div className={classes.productpage_product}>
        <div className={classes.productpage_product_images}>
          <ImageSlider
            sliderData={jewel?.productImage}
            classes={`${userClasses.slider} ${userClasses.slider_adSlider} `}
          />
        </div>
        <div className={classes.productpage_product_info}>
          <div className={classes.productpage_product_info_specs}>
            <ul>
              <li>
                <p className={classes.productpage_product_info_specs_title}>
                  {jewel?.name}
                </p>
              </li>
              <li>
                <p className={classes.productpage_product_info_specs_about}>
                  პროდუქტის შესახებ
                </p>
              </li>
              <li>
                <span>ნაკეთობა</span>
                <p> {jewel?.piece.name} </p>
              </li>
              <li>
                <span>ზომა</span>
                <p> {jewel?.size} </p>
              </li>
              <li>
                <span>წონა</span>
                <p> {jewel?.size} </p>
              </li>
              <li>
                <span>მასალა</span>
                <p> {jewel?.metal.name} </p>
              </li>
              <li>
                <span>სინჯი</span>
                <p> {jewel?.standard} </p>
              </li>
              <li>
                <span>შიგთავსი</span>
                <p> {jewel?.stone.name} </p>
              </li>
              <li>
                <span>ფასი</span>
                <p> {jewel?.price} ლ</p>
              </li>
            </ul>

            <ul>
              {currentUser && (
                <li
                  className={
                    classes.productpage_product_info_specs_addToFavorites
                  }
                >
                  <FavoriteButton
                    style={{ color: "#001e42" }}
                    currentUser={currentUser}
                    productId={jewel?._id}
                  />
                </li>
              )}
              <li>
                <span></span>
                <p> {jewel?.contactPerson} </p>
              </li>
              <li>
                <span>საკონტაქტო ნომერი</span>
                <p> {jewel?.contactNumber}</p>
              </li>
            </ul>
          </div>
          <div>
            <p className={classes.productpage_product_info_specs_about}>
              აღწერა
            </p>
            <p>{jewel?.description}</p>
          </div>
        </div>
      </div>

      <div className={classes.productpage_midAds}>
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.productpage_midAds_ad}
        />
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.productpage_midAds_ad}
        />
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.productpage_midAds_ad}
        />
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.productpage_midAds_ad}
        />
      </div>

      <div className={classes.productpage_similarjewels}>
        <p className={classes.productpage_info_specs_title}>
          მსგავსი პროდუქტები
        </p>
        <div className={classes.productpage_similarjewels_products}>
          {similarJewels?.map((similarJewel) => (
            <ProductCard
              product={similarJewel}
              currentUser={currentUser}
              key={similarJewel._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
