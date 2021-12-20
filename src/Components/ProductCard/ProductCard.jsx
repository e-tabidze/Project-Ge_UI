import React, { useState } from "react";

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
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ShareIcon from "@mui/icons-material/Share";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";

const ProductCard = ({ product, currentUser }) => {
  const [popover, setPopover] = useState(false);

  const shareProduct = () => {
    let path = `http://localhost:3001/product/${product._id}`;
    navigator.clipboard.writeText(path);
    setPopover(!popover);
  };

  setTimeout(() => {
    setPopover(false);
  }, 3000);

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
            />
          </IconButton>
        )}

        <IconButton aria-label="share" onClick={shareProduct}>
          <Stack spacing={12} direction="row">
            {popover ? (
              <Badge badgeContent={"დაკოპირებულია"} color="secondary">
                <ShareIcon color="action" />
              </Badge>
            ) : (
              <ShareIcon color="action" />
            )}
          </Stack>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
