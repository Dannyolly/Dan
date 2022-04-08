
import { Button } from 'antd'
import {  makeAutoObservable } from 'mobx'

class PagesStore {

    currentPage = "Home"
  
    constructor(){
        makeAutoObservable(this)
    }
    
    setCurrentPage( page :string ){
        this.currentPage = page
    }
}




const pagesStore = new PagesStore()
//pagesStore.currentPage= 'Home'
export {
    pagesStore
}