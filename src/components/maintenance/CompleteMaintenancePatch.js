const CompleteMaintenance = (description, date) => {

    const PatchObject = {
        isComplete: true,
        updatedDescription: description,
        dateCompleted: date
    }
    return PatchObject
}

export default CompleteMaintenance