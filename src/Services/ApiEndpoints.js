import http from "./httpService";

require("dotenv").config();
// DATA

const BASE_URL =
  process?.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "/api";

export function getJewels() {
  return http.get(`${BASE_URL}/jewels/`).then((res) => {
    return res.data;
  });
}

export function getJewel(id) {
  return http.put(`${BASE_URL}/jewels/jewel`, { id: id }).then((res) => {
    return res.data;
  });
}

export function getUserJewels(userId) {
  return http.post(`${BASE_URL}/users/jewels`, { userId });
}

export function getSimilarJewels(type) {
  return http.post(`${BASE_URL}/jewels/similar`, { type: type }).then((res) => {
    return res.data;
  });
}

export function getStones() {
  return http.get(`${BASE_URL}/stones/`).then((res) => {
    return res.data;
  });
}

export function getMetals() {
  return http.get(`${BASE_URL}/metals/`).then((res) => {
    return res.data;
  });
}

export function getPieces() {
  return http.get(`${BASE_URL}/pieces/`).then((res) => {
    return res.data;
  });
}

export function postJewels(newJewel, userToken) {
  return http
    .post(`${BASE_URL}/jewels/add`, newJewel, {
      headers: {
        action: "/multiple-upload",
        enctype: "multipart/form-data",
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function editJewel(updatedJewel, jewelId, userToken) {
  return await http
    .patch(`${BASE_URL}/jewels/updateproduct/${jewelId}`, updatedJewel, {
      headers: {
        "x-auth-token": userToken,
        action: "/multiple-upload",
        enctype: "multipart/form-data",
        "Content-type": "application/json",
      },
    })
    .then(async (res) => {
      return await res.data;
    });
}

export function deleteJewel(jewelId, userToken) {
  return http
    .delete(`${BASE_URL}/jewels/delete/${jewelId}`, {
      headers: {
        "x-auth-token": userToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}

// USER

export function registerUser(user) {
  return http.post(`${BASE_URL}/users/`, user).then((res) => {
    return res;
  });
}

export function loginUser(email, password) {
  return http.post(`${BASE_URL}/auth/`, { email, password });
}

export function forgotPassword(email) {
  return http.post(`${BASE_URL}/password-reset`, { email }).then((res) => {
    return res.data;
  });
}

export function changePassword(currentPassword, newPassword) {
  return http
    .post(`${BASE_URL}/password-reset/change`, {
      currentPassword,
      newPassword
    })
    .then((res) => {
      return res;
    });
}

export function changeUserInfo(userId, name, email) {
  return http
    .patch(`${BASE_URL}/users/editusername/${userId}`, {
      name,
      email,
    })
    .then((res) => {
      return res;
    });
}

export function addUserFavProduct(userId, jewelId) {
  http.get(`${BASE_URL}/users/add/${userId}/${jewelId}`).then((res) => {
    return res.data;
  });
}

export function removeUserFavProduct(userId, jewelId) {
  http.get(`${BASE_URL}/users/remove/${userId}/${jewelId}`).then((res) => {
    return res.data;
  });
}

export function getUserFavorites(userId) {
  return http.get(`${BASE_URL}/users/${userId}`).then((res) => {
    return res.data;
  });
}
