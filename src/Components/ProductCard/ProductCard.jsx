import React from "react";

import ImageSlider from "../../ReusableComponents/ImageSlider/ImageSlider";
import FavoriteButton from "../../ReusableComponents/FavoriteButton/FavoriteButton";

import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import ShareIcon from "@mui/icons-material/Share";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";

const ProductCard = ({
  product,
  currentUser,
  userFavorites,
  setUserFavorites,
}) => {
  return (
    <Card className={classes.productCard}>
      <NavLink to={`product/${product._id}`}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertSharpIcon />
            </IconButton>
          }
          title={product.name}
          subheader={`${product.price} ლარი`}
        />
        <CardContent>
          <ImageSlider
            classes={`${userClasses.slider} ${userClasses.slider_productCard} `}
            sliderData={product?.productImage}
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </NavLink>

      <CardActions>
        {currentUser && (
          <IconButton aria-label="add to favorites">
            <FavoriteButton
              style={{ color: "#001e42" }}
              currentUser={currentUser}
              productId={product._id}
              userFavorites={userFavorites}
              setUserFavorites={setUserFavorites}
            />
          </IconButton>
        )}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
