export default (image = [], action) => {
    switch (action.type) {
        case "UPLOAD":
            return [...image, action.payload];
        case "ERROR":
            return [...image, action.payload];
        default:
            return image = [];
    }
}