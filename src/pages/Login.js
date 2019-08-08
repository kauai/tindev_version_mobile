import React,{ useState } from 'react'
import { View, Text, StyleSheet, Image,TextInput,TouchableOpacity } from 'react-native'
import logo from '../assets/logo.png'
import api from '../services/api'

export default function Login({ navigation }) {
    const [ user, setUser ] = useState('')

    function handleLogin(){
        api.post('/devs',{
            username:user
        }).then(({ data:{ _id } }) => {
            // console.log(_id)
            navigation.navigate('Main',{ _id })
        }).catch(e => {
            console.log(e)
        })
    }


   return (
         <View style={styles.container}>
            <Image source={logo}/>
            <TextInput 
                onChangeText={setUser}
                value={user}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="#999" 
                placeholder="Digite seu usuario"/>
            <TouchableOpacity 
            onPress={handleLogin}
            style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View> )
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#f5f5f5',
     justifyContent:'center',
     alignItems:'center',
     padding:30
    },
    input:{
        height:46,
        alignSelf:'stretch',
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:4,
        marginTop:20,
        padding:15
    },
    button:{
      height:46,
      alignSelf:'stretch',
      backgroundColor:'#df4723',
      borderRadius:4,
      marginTop:10,
      justifyContent:'center',
      alignItems:'center'
    },
    buttonText:{
       color:'#fff',
       fontWeight:'bold',
       fontSize:16
    }
 })