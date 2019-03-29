const completeRoutePatch=(state)=> {

    const patchObject = {
        isComplete: true,
        timeToComplete: state.time,
        dateCompleted: state.date
    }

    return patchObject;
}

export default completeRoutePatch