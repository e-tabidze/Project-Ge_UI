import React, { useState, useEffect } from "react";
import {
  addUserFavProduct,
  removeUserFavProduct,
} from "../../Services/ApiEndpoints";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const FavoriteButton = ({
  currentUser,
  productId,
  userFavorites,
  setUserFavorites,
}) => {
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);

  useEffect(() => {
    if (currentUser && userFavorites?.includes(productId)) {
      setIsFavoriteProduct(true);
    } else {
      setIsFavoriteProduct(false);
    }
  }, [userFavorites]);

  const handleToggleFavorite = () => {
    setIsFavoriteProduct(!isFavoriteProduct);
    if (currentUser && userFavorites?.includes(productId)) {
      setUserFavorites(userFavorites?.filter((p) => p !== productId));
      removeUserFavProduct(currentUser._id, productId);
    } else {
      setUserFavorites((prevState) => [...prevState, productId]);
      addUserFavProduct(currentUser._id, productId);
    }
  };

  return (
    <>
      {isFavoriteProduct ? (
        <FavoriteIcon
          style={{ color: "#001e42" }}
          onClick={handleToggleFavorite}
        />
      ) : (
        <FavoriteBorderOutlinedIcon
          style={{ color: "#001e42" }}
          onClick={handleToggleFavorite}
        />
      )}
    </>
  );
};

export default FavoriteButton;
