import React, { useState } from "react";
import useCurrentUser from "../../Helpers/useCurrentUser";
import useUserJewels from "../../Helpers/useUserJewels";
import UserInitial from "../../ReusableComponents/UserInitial/UserInitial";
import UserProductCard from "../../Components/UserProductCard/UserProductCard";
import ProductModal from "../../Components/ProductModal/ProductModal";
import EditUser from "../../Components/EditUser/EditUser";

import { useHistory } from "react-router-dom";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

import internal from "../../Assets/internal.jpeg";
import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/UserInitial/styles.module.scss";

const UserPage = ({ setCurrentUser, currentUser, getCurrentUser }) => {
  const [productModalActive, setProductModalActive] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userProducts, setUserProducts] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const { currentUserRef } = useCurrentUser();
  const { userJewels, handleGetUserJewels } = useUserJewels(currentUserRef);
  const history = useHistory();

  const productModalToggle = () => {
    setProductModalActive(!productModalActive);
  };

  console.log(currentUser, "UserPage");

  // const toggleEditUser = () => {
  //   setEditUser(!editUser);
  // };

  const listUserProducts = () => {
    setUserProducts(true);
    setEditProfile(!editProfile);
  };

  const editUserProfile = () => {
    setUserProducts(false);
    setEditProfile(true);
  };

  const redirectToFavs = () => {
    history.push("/user-hearted-products");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <>
      <div className={classes.userpage}>
        <div className={classes.userpage_ad}>
          <img src={internal} alt="ოქროს მარკეტი საქართველოში" />
        </div>
        <UserInitial
          classes={`${userClasses.initial} ${userClasses.initial_userpage} `}
          initial={currentUser && currentUser.name.toUpperCase().charAt(0)}
        />
        <div className={classes.userpage_welcomeText}>
          მოგესალმებით {currentUser && currentUser.name}
        </div>
        <div className={classes.userpage_content}>
          <ul className={classes.userpage_content_menu}>
            <li onClick={listUserProducts}>
              <EventNoteOutlinedIcon
                style={{ color: "#001e42" }}
                fontSize="small"
              />
              ჩემი განცხადებები
            </li>
            <li onClick={productModalToggle}>
              <AddSharpIcon style={{ color: "#001e42" }} /> ახალი განცხადების
              დამატება
            </li>
            <li onClick={redirectToFavs}>
              <FavoriteBorderOutlinedIcon
                style={{ color: "#001e42" }}
                fontSize="small"
              />
              არჩეული პროდუქტები
            </li>
            <li onClick={editUserProfile}>
              <ModeEditOutlineOutlinedIcon
                style={{ color: "#001e42" }}
                fontSize="small"
              />
              პროფილის რედაქტირება
            </li>
            <li onClick={handleLogout}>
              <LogoutOutlinedIcon
                style={{ color: "#001e42" }}
                fontSize="small"
              />
              გასვლა
            </li>
          </ul>

          <div className={classes.userpage_content_items}>
            {userProducts ? (
              <>
                {userJewels?.map((userJewel) => (
                  <UserProductCard key={userJewel._id} userJewel={userJewel} />
                ))}
              </>
            ) : (
              <EditUser
                currentUser={currentUser}
                getCurrentUser={getCurrentUser}
              />
            )}
          </div>
        </div>
        <div className={classes.userpage_ad}>
          <img src={internal} alt="ოქროს მარკეტი საქართველოში" />
        </div>
      </div>
      {productModalActive && (
        <ProductModal
          modalType={"add"}
          product={null}
          productModalActive={productModalActive}
          productModalToggle={productModalToggle}
          handleGetUserJewels={handleGetUserJewels}
        />
      )}
    </>
  );
};

export default UserPage;
