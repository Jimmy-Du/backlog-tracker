const isEmpty = require('./isEmpty')

// Function:    mergeGameAndImageData()
// Description: takes in game and image objects and returns a new object that contains the fields and data from
//              both data objects
// Parameters:  gameData: the game data that will be merged
//              imageData: the image data that will be merged
// Return:      result: an object containing fields from both of the game and image data passed in
const mergeGameAndImageData = (gameData, imageData) => {
    const result = []
    let matchingResponseData = null

    // loop to go through each game data response and match it with its corresponding image data into 1 object
    for (i = 0; i < gameData.length; i++) {
        result[i] = {}
        for (key in gameData[i]) {
            if(gameData[i].hasOwnProperty(key)){
                result[i][key] = gameData[i][key];
            }
        }

        matchingResponseData = imageData.filter(data => data.id === gameData[i].cover)

        // if there is matching image and game response data then the 2 responses are merged
        if (!isEmpty(matchingResponseData)) {
            result[i].image_id = matchingResponseData[0].image_id
            result[i].url = matchingResponseData[0].url
        }
    }

    return result
}

module.exports = mergeGameAndImageData