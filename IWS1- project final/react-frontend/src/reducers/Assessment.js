export default (assessment = [], actions) => {
    switch (actions.type) {
        case "FETCH":
            return [...assessment, actions.payload]
        case "ERROR":
            return [...assessment, actions.payload]
        default:
            return assessment = []
    }
}