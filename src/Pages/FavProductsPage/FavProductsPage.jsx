import React from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import useCurrentUser from "../../Helpers/useCurrentUser";
import useJewels from "../../Helpers/useJewels";
import useUserFavoriteProducts from "../../Helpers/useUserFavoriteProducts";

import classes from "./styles.module.scss";

const FavProductsPage = () => {
  const { currentUserRef, currentUser } = useCurrentUser();
  const { userFavorites } = useUserFavoriteProducts(currentUserRef);
  const { jewels } = useJewels();

  let userFavJewels = [];

  jewels?.forEach((p) => {
    userFavorites?.includes(p._id) && userFavJewels.push(p);
  });

  return (
    <section className={classes.favproductpage}>
      <h1>თქვენი საყვარელი პროდუქტები</h1>
      <div className={classes.favproductpage_products}>
        {userFavJewels.map((p) => (
          <ProductCard product={p} currentUser={currentUser} key={p._id} />
        ))}
      </div>
    </section>
  );
};

export default FavProductsPage;
