import axios from "axios";
import { SERVER_URL, getAccessToken, removeAccessToken } from "../utils/consts";
import { sendUser } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const userService = axios.create({
  baseURL: `${SERVER_URL}/user`,
});

export function updateProfileImage(formBody) {
  return userService
    .patch("/updateProfileImage", formBody, sendUser())
    .then(onSuccess("update-profile"))
    .catch(onError("update-profile"));
}

export function deleteUser(userId) {
  console.log("User to delete", { userId });
  return userService
    .delete(`/${userId}`, {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then((res) => {
      removeAccessToken();
      return onSuccess("deleted-User", res);
    })
    .catch(onError("deleted-user"));
}
