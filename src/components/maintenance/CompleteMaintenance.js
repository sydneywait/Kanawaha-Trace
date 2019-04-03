const CompleteMaintenance = (description, date) => {

    const PatchObject = {
        isComplete: true,
        updatedDescription: description,
        date: date
    }
    return PatchObject
}

export default CompleteMaintenance