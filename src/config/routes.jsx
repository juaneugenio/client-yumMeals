import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Profile from "../pages/profile/ProfilePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import ProtectedPage from "../pages/ProtectedPage";
import * as PATHS from "../utils/paths";
import SingleRecipe from "../pages/Recipe/SingleRecipe.page";
import CreateRecipe from "../pages/Recipe/CreateRecipe";
import UpdateProfile from "../pages/updateProfile/UpdateProfilePage";

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOME_PAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUP_PAGE,
      element: <Signup {...props} />,
    },

    {
      path: PATHS.LOGIN_PAGE,
      element: <Login {...props} />,
    },

    {
      path: PATHS.SINGLE_RECIPE_PAGE,
      element: <SingleRecipe {...props} />,
    },

    //////////PROTECTED PATHS/////////////////////////////////////////////////
    {
      path: PATHS.CREATE_RECIPE_PAGE,
      element: user ? (
        <CreateRecipe {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: PATHS.CURRENT_USER_PROFILE,
      element: user ? (
        <Profile {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: PATHS.EDIT_PROFILE_PAGE,
      element: user ? (
        <UpdateProfile {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: PATHS.PROTECTEDPAGE,
      element: user ? (
        <ProtectedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
  ];
};

export default routes;
