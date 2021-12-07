import axios from "axios";
import { SERVER_URL } from "../utils/consts";
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
