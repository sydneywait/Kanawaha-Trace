// A maintenance object is created to be used in a patch request to the maintenance database

const CompleteMaintenance = (description, date) => {

    const PatchObject = {
        isComplete: true,
        updatedDescription: description,
        dateCompleted: date
    }
    return PatchObject
}

export default CompleteMaintenance