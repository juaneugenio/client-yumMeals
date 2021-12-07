import axios from "axios";
import { SERVER_URL } from "../utils/consts";
import { sendUser, getUserToken } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const ratingService = axios.create({
  baseURL: `${SERVER_URL}/ratings`,
});

export function createRating(formBody) {
  console.log(`body`, { formBody });
  return ratingService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-rating"))
    .catch(onError(formBody));
}
