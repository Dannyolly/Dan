//import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import * as Haptics from 'expo-haptics';

/* const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};
 */


const tapResponser = async () =>{
    ///ReactNativeHapticFeedback.trigger('selection', options);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
}

const messageResponser = async ()=>{

  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

}

const selectionResponser = async ()=>{

  await Haptics.selectionAsync()
}

class TouchResponser{
    
  tapResponser = async () =>{
    ///ReactNativeHapticFeedback.trigger('selection', options);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

   messageResponser = async ()=>{

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  
  }
  
  selectionResponser = async ()=>{
  
    await Haptics.selectionAsync()
  }

}

let  touchResponser  = new TouchResponser()


export{
    tapResponser,
    messageResponser,
    selectionResponser,
    touchResponser
}
