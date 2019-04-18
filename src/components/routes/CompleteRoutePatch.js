// This is the object created when a route is marked as complete
// and used to make a patch request to the database.
const completeRoutePatch=(state)=> {

    const patchObject = {
        isComplete: true,
        timeToComplete: state.time,
        dateCompleted: new Date (state.date)
    }

    return patchObject;
}

export default completeRoutePatch