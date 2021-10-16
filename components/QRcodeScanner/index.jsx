import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { screenSize } from '../../util/screenSize';
import {
  AntDesign,
  Ionicons
}from '../../util/Icon'
import { useNavigation } from '@react-navigation/native';
function QrcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    

    // 結果...
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}


export default ()=>{

    const navigation = useNavigation();

    return(
        <View style={{}}>
            <View style={{position:'absolute',top:60,left:30,zIndex:1}}>
              <Ionicons name='arrow-back-circle' 
              size={35} 
              style={{color:"#FFFFFF"}} 
              onPress={()=>navigation.goBack()}
              />
            </View>
           <QrcodeScanner/>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:screenSize.height,
        zIndex:0
    },
    absoluteFillObject:{
        width:screenSize.width,
        height:screenSize.height
    }
})