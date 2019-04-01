const ReverseRoutePatch = (route) => {


    const name = route.name
    // split the name to reverse which trailhead name comes first
    const splitName = name.split(" to ")
    const newName = `${splitName[1]} to ${splitName[0]}`

    // build the patch object with reversed start and end points and reversed name
    const patchObject = {
        name: newName,
        direction: (route.direction === true ? route.direction = false : route.direction = true),
        startId: route.endId,
        endId: route.startId
    }

    return patchObject
}

export default ReverseRoutePatch