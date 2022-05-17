# Server (BackEnd)
## Installation
- Go to the server folder.
- run `npm i` in the terminal
- create a `.env file` with the following options
   ``` 
  SERVER_PORT=XXXX
  SERVER_BASE_URL=http://localhost:XXXX
  SESSION_SECRET=XXXXXX
  ```
    where:
  - *SERVER_PORT: Is the port where the server will be listening.
  - SESSION_SECRET: Is the passphrase used in the session management. This field is optional, the default value is 'default_secret') 
  - SERVER_BASE_URL: This field is optional. The frontend baseurl will be used for testing purposes only.
- run `npm run dev` to run the server in development mode or run `npm run build` to build the server and then `npm start` to start the server in production mode.

## Testing
- Go to the server folder
- Run `npm i`
- Run `npm test`

## Folder Structure
- auth: Includes the auth settings files (passport).
- const: Include the constants thatt would be used in the project.
- interfaces: Contains all the typescript interfaces used in the project.
- prisma: Prisma schema files and will contain the database file since the project is using sqlite.
- routes: All the routes of the application. `appConfig.ts` is an array of settings that will be applied to the express server BEFORE applying any route. `errors.ts` is an array of functions that will be used as fallback endpoints and will catch any error throw by `next(error)`.
- services: Include services and utils files that are used as logic abstractions in repetitive tasks.
- test: Contains all the test files.

## Design 
- Routes: Every aspect of the app has its own route file. Also, in order make the main file smaller and make it easier to add new express middlewares, all the server setting config are in `appConfig.ts`, so you only need to add the new middleware to the exported array and it'll be loaded in the server. Errors handling work in a similar way, all the errors will be catch by the `error.ts` router, and just like the app config we can edit it adding a new error handling function at the exported array. In order to make the import of these routes and the error handling easier  `intex.ts` is used to import, prioritize and exports the routers and error handling functions.

- Database: Since the project is using typescript i chose prisma as ORM, since it  offers typing, easy model design and some other useful tools. I know typeorm works similar but i think prisma is better (just an opinion). Since prisma makes it really easy to work with sqlite i prefered it over saving the data in memory.

- Auth: Since i used express passport.js is the "just go with it" option.

- Interfaces: Every main data type of the project has its own interface file. I also like to create a "server responses" interfaces files and share it with the frontend so they both will be sync about how the endpoint works. Unfortunately, since i made the client app using create-react-app it seems to have troubles using ts files outside its working directory. I think that ejecting the app and setting the webpack config would do it, but i went with the easy solution because of the context of the project.

- const: The idea was to have every const values of every part of the project in the const folder, but i barely found myself using the prisma error codes (at least in non-testing code).


## Known issues
- The endpoints need more work on catching exceptions and sending a more descriptive error info.
- Not sure if using a /:username/:customcode params in the root route was a good idea if i need to add new features/endpoints to the app, but i wanted it to work like the popular url shorteners services (with a very simple url).

# Client (FrontEnd)

## Installation
- Go to the client folder.
- run `npm i` in the terminal
- create a `.env file` with the following options
   ``` 
    REACT_APP_API_BASE_URL=http://localhost:XXXX
    REACT_APP_CLIENT_BASE_URL=http://localhost:XXXX
    ```
    where:
  - *REACT_APP_API_BASE_URL: is the base API (server) base url.
  - *REACT_APP_CLIENT_BASE_URL: Is the client base URL (used to generate the shorten urls)
- run `npm start` to run the development server or run `npm run build` to build the react application and serve it using another tool.

## Testing
- Go to the client folder
- Run `npm i`
- Create a `.env.test` file with the following options:
```
REACT_APP_API_BASE_URL=http://localhost:XXX
REACT_APP_CLIENT_BASE_URL=http://url-shortener
```
where REACT_APP_API_BASE_URL will be the api url.
- Run `npm test`

## Folder Structure (src)
- Components: Reusable components that can be used in many pages.
- Context: All the contexts used by the app.
- Interfaces: All the interfaces' files related to the main data used by the app. Also includes the interfaces of the responses that the application needs to be returned by the backend API.
- Pages: All the main pages of the application, every one of them has their own folder with its own tests.
- Router: The router config files.
- Services: Contains some abstractions of logic related to the business logic or specific aspects of this project. 
- Utils: Contains reusable abstractions of code of general purpose not related to the business logic.


## Design 
- Similar to the backend, i've written the client using typescript and also have an interface of the maily data used and the backend endpoints responses.
- Due to the small amount of code i've decided to hardcore all the routes inside the Router component.
- For practical reasons i've used chakraUi instead of any external css solution.
- Due to some compatibility issues between chakraUi and the tests. I've created my own useToast that will mock it automatically when a testing enviroment is detected.
- Thought the app doesnt have too many form i've use formik as form builder/validator.

## Knwon issues
- ChakraUi seems to have some issues with testing due to it context (it hardly depends on the browserAPI to properly work).
- The errors shown to the user are not too much descriptive about what wen wrong.
- If both (client and server) are local apps the redirect happens too fast.

# General notes

## Improvements
- Add a timeout to the redirect page and some kind of animation.
- If the shortenURL is a custom link show the user that have created it in the redirect page.
- Show the visit counter in the redirect page.
- Add seeds and mock db in the backend testing.
- Share interfaces between the two projects so it will be always sync.
- Add a passphrase to the shorten links so only allowed people will actually use it.

## About the old link shortener code
I have replaced the (text + salt) encryption to a random bytes generator so the same link could be shortened twice. Using text + salt will result in the same hashcode and will lead to troubles when different users try to shorten the same url.