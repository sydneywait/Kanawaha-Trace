# Welcome to the Kanawha Trace Trail Guide

The Kanawha Trace Trail (also known as The KT Trail) is an approximately 32-mile trail that runs from Barboursville to Frasiers Bottom in West Virginia.  The Kanawha Trace Trail guide is a web-based application that allows users of the KT Trail to plan routes, record dates and times of routes they have completed, and submit maintenance requests.  The purpose of this application is to provide current and updated information about the status of the trail, and allow users to plan and navigate with tools that are easier to understand than paper-based topographical maps.  A secondary purpose is to improve the visibility of the trail and encourage new and existing users to venture out more often.

The target users are trail runners, hikers, mountain-bikers and backpackers who are interested in learning more about the features and technical aspects the KT trail.

See the application online at https://kanawha-trace.herokuapp.com

## Home Page

Users begin their experience with the Home Page, which gives them a little background and history of the Kanawha Trace.  From here, they must log-in or register to utilize all the features of this application.

## Explore

When a user logs in, they can view the Explore page to see a map of the entire KT with blue markers showing access points.  Clicking on the markers will show a popup on the map that gives details about the point, such as the name and mile point.

Using the dropdowns on the left, users can select a start and end point for their route.  Once both are selected, they can hit 'submit' and the route will be created.
![Explore Demo](http://g.recordit.co/qLTq3eSmiP.gif)

Two links will appear below the submit button that allow the user to go directly to the details of the newly created route, or navigate to a page to view all of their routes.

## Routes

Routes on the 'Routes' page are separated into two categories--planned and completed.  Newly created routes will show up in the planned column.  The route card includes the name of the route (based on the start and end points) a trail marker which shows the direction of travel on the trail and corresponds to the trail markings that a user would see on trees and signs on the actual KT trail. White-yellow-white indicates they are travelling north-east (in the direction of increasing mile markers), and yellow-white-yellow indicates they are travelling south-west (in the direction of decreasing mile markers). Users may click on the affordance to change the direction of the route should they decide they want to travel in the opposite direction.  The name and trail marker will update accordingly.


Users may click on the 'complete' button if they want to mark a route as completed.  A form will pop up that allows them to submit the date they completed the route as well as how long it took them to complete (in the time format hh:mm:ss).

### Route Details
Users may click on the 'edit' button to change the start and end points of the route.  A form will pop up with dropdown-selects to allow them to make this change.  Clicking submit will update the route on their page.
## Maintenance

### Maintenance Details










This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
