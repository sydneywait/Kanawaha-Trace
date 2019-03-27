import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "./Auth";

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();

    // Needs to be refactored, put in its own module, etc
    fetch(`http://localhost:5002/users?aud=${auth0Client.getProfile().sub}`)
      .then(matchingUser => matchingUser.json())
      .then(matchingUser => {
        console.log("This is our array of users that have the current user's aud", matchingUser);

        // If the the fetch call comes back empty, it means that the user who just logged in with Auth 0 doesn't exist in our json-server database. We need to register them!
        if (matchingUser.length === 0) {
          console.log("User not found, registering a new user!");

          // Create a new user object to post to the db
          const newUser = {
            aud: auth0Client.getProfile().sub,
            name: auth0Client.getProfile().nickname,
            isAdmin: false
          };

          // Post it!!
          fetch(`http://localhost:5002/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
          })
            .then(newlyCreatedUser => newlyCreatedUser.json())
            .then(parsedUser => {

              //Once the POST request is successfully completed, store the PK json-server generated for us in session storage
              console.log(
                "We created this new user in the json-server db and we're about to log them in",
                parsedUser
              );
              sessionStorage.setItem("credentials", parsedUser.id);
            });
        } else {
          // If something DOES come back from the fetch call (i.e. the array has a user in it), that means the user already exists in our db and we just need to log them in
          console.log(
            "We found that user! Here's their id!",
            matchingUser[0].id
          );
          sessionStorage.setItem("credentials", matchingUser[0].id);
        }
      });
    this.props.history.replace("/");
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);