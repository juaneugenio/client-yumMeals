# YUMMEALS FEATURES

Frontend:

HomePage / ✅
AboutPage /about
LogIn /login ✅
Signup /signup ✅
Search result page      (NEW!!!!!)
Profile Page (public) /:user
Profile Settings (private) /account
Carnet Page (logged in) /carnet      (NEW!!!!!)
Recipe Page (individual, public) /recipe/:recipeId    (NEW!!!!!)

Backend:
/auth/login POST ✅
/auth/signup POST ✅
/auth/logout DELETE 
/auth/delete-account
/profile/:userId GET
/profile/:userId/edit PUT
/auth/me GET (get loggedin user data)
/feed GET
/recipe/:recipeId GET
/recipe/add POST
/recipe/edit POST
/recipe/delete DELETE
/recipe/like PUT
/recipe/rating PUT
/user/follow PUT

??? Images

IF WE HAVE TIME:
FOLLOW USERS

MODELS

# User

email : string and unique
username/nickName: string
password: string
userPic: string
following: User[]

# RECIPE

title: string
cuisine : [] : asian, indian, tex-mex, french, ...
category : string : breakfast, lunch, dinner, snack, appetizer
time-to-prepare : number
cookingTime : number
level : string => values (Amateur Chef,Chef, Ultra Pro Chef)
price : string => values(cheap,..., expensive)
pictures : []
ingredients : ["100g of rice", "10 cl of cream", ...]
ratings : []
ratingsUser: User[]
owner: User

Session
userId: ObjectId(User)


From the videos:

module3-week3-day2 ✅  singleRecipe.page.jsx/recipeservice/creating a mock data

module3-week3-day3 ❌  dealing with cors, http error codes, Handing errors in backend & frontend

module3-week4-day1 ❌  need to check implementing authentication

module3-week4-day2 ❌  navbar links, Implementing the Authentication logic, Setting up local storage with the auth token, Middlewares (IsLoggedIn & IsLoggedOut)

module3-week4-day3 ❌  Backend Deployment Instructions, Deploying the DB, Deploying the Frontend, Updating CORS allowed domains, Create a post feature, Abstraction of the Protected Routes, Image Upload | Adding a, profile picture, Updating the user, Creating a Post (Model | Page | Route) class not recorded creating post.

module3-week5-day1 ❌ Create a Single Post Page, Building the Follow/Unfollow feature

...


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
