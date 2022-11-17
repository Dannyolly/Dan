import React, { Component } from 'react'
import { Text, View ,RefreshControl} from 'react-native'
import {imageStore , observer } from '../../mobx/lock'
 class index extends Component {

    state={
        isRefreshing:false
    }
    
    /**
     * @description callback 是刷新時調用的回調函數... 比如刷新時請求數據
     * @param {function} callback 
     */
    onPageRefresh(callback){
        if (this.state.isRefreshing) {
            return;
        }

        this.setState({
            isRefreshing: true
        })
        
        if(callback !== undefined) callback()

        setTimeout(() => {
            if (this.state.isRefreshing == true) {
              this.setState({
                isRefreshing: false
              })
            }
          }, 1000)
    }

    render() {
        
        const { title, tintColor, titleColor } = this.props
        const { callback } = this.props
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={()=>this.onPageRefresh(callback)}
                tintColor={tintColor}
                title={title}
                titleColor={titleColor}
            />
            
        )
    }
}

export default index