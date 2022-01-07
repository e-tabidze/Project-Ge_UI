import React from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";

import UserProductCard from "../UserProductCard/UserProductCard";
import classes from "./styles.module.scss";

const UserProductsSettings = ({ onClick, userJewels }) => {
  return (
    <div>
      <div className={classes.userProductsSettings} onClick={() => onClick()}>
        <AddSharpIcon style={{ color: "#001e42" }} />
        <span>ახალი განცხადების დამატება</span>
      </div>
      <div>
        {userJewels?.map((userJewel) => (
          <UserProductCard key={userJewel._id} userJewel={userJewel} />
        ))}
      </div>
    </div>
  );
};

export default UserProductsSettings;
