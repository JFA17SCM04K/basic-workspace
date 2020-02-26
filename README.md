# Monofunworkspace

- This project was generated using [Nx](https://nx.dev).
- This project was generated with Angular CLI version 8.3.10.
- 🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

<p align="center"><img src="https://res.cloudinary.com/brandpad/image/upload/v1574454881/3483/lockup2x.png" width="450"></p>

## Development server
Run ng serve for a dev server. Navigate to http://localhost:8888/. The app will automatically reload if you change any of the source files.

## Code scaffolding
We suggest using the Nx Console to generate new components

## Available routes:
home page (default route: `/`)
user profile page (route: `/profile-details`)

## Assignment details
Instructions:
Fork this repo and complete the following task. Please do not spend more than 3 hours on this project. Please submit a pull request with your work once finished.

## Task
One of the goals of this task is to measure your understanding of ngrx and the redux pattern.
Use ngrx and create or modify appropriate actions, reducers, effects and selectors.

* The user profile page currently has no data. Use the public API at [Random User Generator](https://randomuser.me) to pull in a random user and populate the profile page (`/profile-details`). You should query the relevant data from the API and add it to the `ProfileStore`.
  * A link to API documentation is in the profile service.

* Create a new page, a profiles grid. This page should accomplish the following:
      
* Use the table component from the `/libs/ui` folder.

* Pull in 15 profiles to populate this grid.

* Store these results in the state.
  * Each profile row item should have a link to the specific detail page of that user.

* Upon clicking a profile row link, the user should be sent to the profile details page with that user data.
      
* The user profile details page route should be adjusted to take an optional id param.
  * Routing is located in app.module.

* If the optional id param is missing, query a random user to show from the api.

The UI is up to you, although it is recommended to use Angular Material components.

## Solution

Redux Pattern Implementation 

* Below are the Actions implemented using Redux pattern

  * getProfile - gets one random user from the API.
  * getProfiles - gets fifteen random users from the API.
  * getProfileSuccess - when API returns one user successfully, the user is loaded into the application state.
  * getProfilesSuccess - when API returns fifteen users successfully, the users are loaded into the application state.
  * getProfileFailure - incase of API failure, load the error message in the application state.
  * getProfilesFailure - incase of API failure, load the error message in the application state.
  * loadUser - loading a selected user from the list of users into the application state.
  * reset - resets the application state to initialstate.

 
Edge case scenarios handled by code -

* API Failure - Occasionally the Random Generator API throws 502 Bad Gateway, which is handled by checking the application state for errors and displaying the error message on the UI.

* User not present in the state of the app which is loaded with 15 random users. When user tries to append the profile-details/:id route with any random id, code pulls up the default initial state pointing to John Doe profile details.

* In attempt to manually change the route profile-details/:id, if the id is not present in the list of 15 users it will default to John Doe's profile. Say, if id -111 is not present in the list of users then on hitting the route - profile-details/111 shall pull up John Doe's profile.
