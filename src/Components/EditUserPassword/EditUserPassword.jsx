import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { TextField, DialogActions, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {
  changePassword,
} from "../../Services/ApiEndpoints";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditUserPassword = ({ currentUser, togglePasswordModal }) => {
  const [alert, setAlert] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    try {
      await changePassword(e.current_password, e.password);
      setAlert("success")
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
                {...register("current_password", {
                  required: true,
                  minLength: 8,
                  maxLength: 1024,
                })}
                placeholder="არსებული პაროლი"
                type="password"
                fullWidth
                margin="dense"
                name="current_password"
                error={errors?.password ? true : false}
                helperText={
                  errors?.password && (
                    <span>
                      გთხოვთ შეავსოთ სავალდებულო ველი (მინიმუმ 8 სიმბოლო)
                    </span>
                  )
                }
              />

              <>
                <TextField
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 1024,
                  })}
                  placeholder="პაროლი"
                  type="password"
                  fullWidth
                  margin="dense"
                  name="password"
                  error={errors?.password ? true : false}
                  helperText={
                    errors?.password && (
                      <span>
                        გთხოვთ შეავსოთ სავალდებულო ველი (მინიმუმ 8 სიმბოლო)
                      </span>
                    )
                  }
                />

                <TextField
                  {...register("repeat_password", {
                    validate: (value) => value === watch("password"),
                    required: "რამე მესიჯი",
                  })}
                  name="repeat_password"
                  type="password"
                  placeholder="გაიმეორეთ პაროლი"
                  fullWidth
                  margin="dense"
                  error={errors?.repeat_password ? true : false}
                  helperText={
                    errors?.repeat_password ? (
                      <span>პაროლები არ ემთხვევა ერთმანეთს</span>
                    ) : null
                  }
                />
              </>
              <DialogActions>
                <Button type="submit" color="primary">
                  განახლება
                </Button>
                <Button color="primary" onClick={togglePasswordModal}>
                  გაუქმება
                </Button>
              </DialogActions>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default EditUserPassword;
