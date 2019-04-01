const completeRoutePatch=(state)=> {

    const patchObject = {
        isComplete: true,
        timeToComplete: state.time,
        dateCompleted: new Date (state.date)
    }

    return patchObject;
}

export default completeRoutePatch