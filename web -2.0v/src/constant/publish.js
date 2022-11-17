import { getDimension, getPlatform , Platform } from "../utils";

const height = getDimension().height

/**
 * @description the pulish height
 */


const modalHeight = {
    ipad : {
        height: height * 0.2
    },
    windows : {
        height: height * 0.3
    },
    ios : {
        height: height * 0
    }
}

export {
    modalHeight 
}