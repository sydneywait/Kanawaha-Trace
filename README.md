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

Routes on the 'Routes' page are separated into two categories--planned and completed.  Newly created routes will show up in the planned column.  The route card includes the name of the route (based on the start and end points) a trail marker which shows the direction of travel on the trail and corresponds to the trail markings that a user would see on trees and signs on the actual KT trail. White-yellow-white indicates they are travelling north-east (in the direction of increasing mile markers), and yellow-white-yellow indicates they are travelling south-west (in the direction of decreasing mile markers).

![Reverse Demo](http://g.recordit.co/vo29lufMGH.gif)

Users may click on the affordance to change the direction of the route should they decide they want to travel in the opposite direction.  The name and trail marker will update accordingly.

![Complete Demo](http://g.recordit.co/d54AhyD4eU.gif)
Users may click on the 'complete' button if they want to mark a route as completed.  A form will pop up that allows them to submit the date they completed the route as well as how long it took them to complete (in the time format hh:mm:ss).


### Route Details
From the 'Routes' page, users may click on the 'details' button of any of the routes to go to a detailed view of that route.

![Edit Route Demo](http://g.recordit.co/n9qneyq9qE.gif)

Users may click on the 'edit' button to change the start and end points of the route.  A form will pop up with dropdown-selects to allow them to make this change.  Clicking submit will update the route on their page.

Once a route is marked as complete, the user may edit the date and time of that route, but may no longer edit the start and end points.

A user can delete a route from either the 'Routes' page or the details view.  A dialog will pop up asking them to confirm before deleting the route.

![Delete Route Demo](http://g.recordit.co/l5BrV7nvD5.gif)

## Maintenance
Another feature of this application allows users to submit reports of issues on the trail that require maintenance or other interventions.  From the 'Maintenance' tab, users can see ongoing requests (sorted by mile) or submit one of their own.  There is an affordance to allow the user to be contacted about the request should further information be required.
![Maintenance Request](http://g.recordit.co/zEULs3VX2B.gif)

If the user logs in with administrative credentials, the admin view looks a little different.  They not only have the ability to create a maintenance request, but they can assign the request to themselves or others, add additional details, mark the request as "complete", or delete maintenance requests.
![Admin View](http://g.recordit.co/nJFWkPUpW3.gif)

### Maintenance Details
Clicking on the name of the request will allow the user to view more details about the request, such as when it was submitted or to whom it is assigned.  Clicking on the 'edit' button will allow the user to make clarifications to the description or assign the task to another admin.  Clicking on the 'complete' button will allow the user to mark the task as 'complete' and provide a description of what work was done.  The task may also be marked as complete from the 'Maintenance' page by clicking on the empty checkbox next to the task.  This brings up a form that allows the user to submit the date completed and any pertinent details or recommendations.











This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

