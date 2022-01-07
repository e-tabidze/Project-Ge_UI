import React, { useState } from "react";
import { changeUserInfo } from "../../Services/ApiEndpoints";

import { useForm } from "react-hook-form";
import { TextField, DialogActions, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditUserInfo = ({ currentUser, getCurrentUser }) => {
  const [alert, setAlert] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
    },
  });

  const onSubmit = async (e) => {
    try {
      let result = await changeUserInfo(currentUser._id, e.name, e.email);
      let jwt = result.headers["x-auth-token"];
      localStorage.setItem("token", jwt);
      getCurrentUser(jwt).then(() => {
        setAlert("success");
      });
    } catch (ex) {
      if (ex.response?.status === 400) {
        setAlert("error");
      }
    }
  };
  return (
    <>
      {alert === "error" ? (
        <Alert variant="filled" severity="error">
          დაფიქსირდა შეცდომა. გთხოვთ შეიყვანეთ სწორი იმეილი
        </Alert>
      ) : (
        <>
          {alert === "success" ? (
            <Alert variant="filled" severity="success">
              პაროლი წარმატებით შეიცალა
            </Alert>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("name", { required: true, maxLength: 50 })}
                placeholder="თქვენი სახელი"
                autoFocus
                fullWidth
                margin="dense"
                name="name"
                error={errors.name ? true : false}
                helperText={
                  errors?.name ? (
                    <span>
                      გთხოვთ შეავსოთ სავალდებულო ველი (მაქსიმუმ 50 სიმბოლო)
                    </span>
                  ) : null
                }
              />
              <TextField
                {...register("email", { required: true, type: "email" })}
                placeholder="იმეილი"
                type="email"
                fullWidth
                margin="dense"
                name="email"
                error={errors?.email ? true : false}
                helperText={
                  errors?.email && <span>გთხოვთ შეიყვანოთ ვალიდური იმეილი</span>
                }
              />
              <DialogActions>
                <Button type="submit" color="primary">
                  განახლება
                </Button>
              </DialogActions>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default EditUserInfo;
