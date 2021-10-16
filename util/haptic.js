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


export{
    tapResponser,
    messageResponser,
    selectionResponser
}
