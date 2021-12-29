import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ViewProps, ViewStyle, StyleProp } from 'react-native'
import { imageStore, observer } from '../../mobx/lock'
import AutoSizeMaskView from './AutoSizeMaskView'
interface AutoZIndexViewProps   {
  children?: JSX.Element,
  index?: number,
  props?: any,
  style? : StyleProp<ViewStyle>
}


const AutoZIndexView = ({ children, index, ...props }: AutoZIndexViewProps) => {

  
  return (
    <View {...props} style={{ zIndex: imageStore.index === index ? 10000 : index }} >
      
      {children}
      
    </View>
  );
}

export default observer(AutoZIndexView)
