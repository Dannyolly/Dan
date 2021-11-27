import AsyncStorage from "@react-native-async-storage/async-storage"
import { makeObservable, observable, action } from "mobx"
import { observer } from 'mobx-react'


class ImageStore {

    isZooming  = false

    constructor() {
        makeObservable(this, {
            /* field */
            isZooming:observable,

            /* function  */
            setIsZooming:action
        })
    }

    /** @param {boolean } [state] */
    setIsZooming=( state )=>{
        this.isZooming = ! this.isZooming
    }
    

   
}

let imageStore = new ImageStore()




export {
    observer,
    imageStore
}