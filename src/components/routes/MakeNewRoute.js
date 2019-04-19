// This function is called when a user plans a new route in the 'explore' page
const makeNewRoute=(state)=> {

    let message = "";
    let newRoute={};
    let startSelected = false;
    let endSelected = false;
    // First, make sure they have selected a start and end point
    state.start !== null ? startSelected = true : startSelected = false
    state.end !== null ? endSelected = true : endSelected = false
    // Next, set constants for working with the function
    if (startSelected === true && endSelected === true) {
        const startId = state.start.id
        const endId = state.end.id
        //  check to see that the start point and the end point are not the same
        if (startId !== endId) {

            // create an object to post to the database
            newRoute = {
                name: `${state.start.name} to ${state.end.name}`,
                userId: state.userId,
                startId: parseInt(startId),
                endId: parseInt(endId),
                direction: (parseInt(startId) < parseInt(endId) ? true : false),
                isComplete: false,
                timeToComplete: "",
                dateCompleted: ""

            }
            // set a success message to state
            message= "Your route was created!"
            // post to the database
        }
        // set an error message to state
        else {
            message="You must choose different start and end points"
        }
    }
    // set an error message to state
    else {
         message= "You must choose a start and end point"
    }
    const thingToReturn = [message, newRoute]


    return(thingToReturn)
}

export default makeNewRoute