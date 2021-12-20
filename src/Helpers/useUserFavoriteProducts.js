import { useState, useEffect } from "react";
import { getUserFavorites } from "../Services/ApiEndpoints";

const useUserFavoriteProducts = (currentUserRef) => {
  const [userFavorites, setUserFavorites] = useState(null);

  const handleGetUserFavorites = async () => {
    const data = await getUserFavorites(currentUserRef?.current._id);
    setUserFavorites(data.favorite_products);
  };
  useEffect(() => {
    handleGetUserFavorites();
    return () => {
      setUserFavorites(null);
    };
  }, []);
  return { userFavorites, setUserFavorites, handleGetUserFavorites };
};

export default useUserFavoriteProducts;
