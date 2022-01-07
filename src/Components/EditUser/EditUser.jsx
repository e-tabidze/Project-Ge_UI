import React, { useState } from "react";
import EditUserInfo from "../EditUserInfo/EditUserInfo";
import EditUserPassword from "../EditUserPassword/EditUserPassword";

const EditUser = ({ currentUser, getCurrentUser }) => {
  const [resetPassword, setResetPassword] = useState(false);
  const togglePasswordModal = () => {
    setResetPassword(!resetPassword);
  };
  return (
    <>
      <EditUserInfo currentUser={currentUser} getCurrentUser={getCurrentUser} />
      {resetPassword ? (
        <EditUserPassword currentUser={currentUser} />
      ) : (
        <>
          <div onClick={togglePasswordModal}>პაროლის განახლება</div>
        </>
      )}
    </>
  );
};

export default EditUser;
