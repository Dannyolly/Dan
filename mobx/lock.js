import AsyncStorage from "@react-native-async-storage/async-storage"
import { makeObservable, observable, action } from "mobx"
import { observer } from 'mobx-react'


class ImageStore {

    isZooming = false

    scale = 0

    index = 0

    // 控制tabBar 消失...
    isStart = false

    // 控制discover 頁面的maskView高度
    maskViewHeight = 0

    constructor() {
        makeObservable(this, {
            /* field */
            isZooming: observable,
            scale: observable,
            index: observable,
            isStart: observable,
            maskViewHeight: observable,
            /* function  */
            setIsZooming: action,
            setScale: action,
            setIndex: action,
            setIsStart: action,
        })
    }

    /** @param {boolean } [state] */
    setIsZooming = (state) => {
        state ?
            this.isZooming = state :
            this.isZooming = !this.isZooming
    }

    /** @param {number } [scale] */
    setScale = (scale) => {
        this.scale = scale
    }

    setIndex = (index) => {
        this.index = index
    }

    setIsStart = (state) => {
        this.isStart = state
    }

    setMaskViewHeight = (height) => {
        this.maskViewHeight = height
    }

}

let imageStore = new ImageStore()




export {
    observer,
    imageStore
}