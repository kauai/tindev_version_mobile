
import React, {Fragment} from 'react';
import {View, Text,StyleSheet } from 'react-native';

function App(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hellow World</Text>
      <Text style={styles.text}>Hellow World</Text>
    </View>
   );
}

const styles = StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:'#7159c1',
    justifyContent:'center',
    alignItems:'center'
   },
   text:{
     fontSize:20,
     fontWeight:'bold',
     color:'#fff'
   }
})

export default App;
