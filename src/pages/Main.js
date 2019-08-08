import React,{ useState, useEffect } from 'react'
import { SafeAreaView, View, Text,StyleSheet, Image,TextInput,TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'
import api from '../services/api'

// SafeAreaView //para ios,Usar no lugar da view

const Main = ({ navigation }) => {
    const id = navigation.getParam('user')
    const [ users, setUsers ] = useState([])
  
    useEffect(() => {
       const header = { headers: { user:id } }
       api.get('/devs',header)
       .then(item => setUsers(item.data))
    },[id])

    const handleLike = async () => {
        const [ user,...rest ] = users
        await api.post(`/devs/${user._id}/likes`,null,{ 
            headers: { user: id } 
        })
        setUsers(rest)
    }

    const handleDeslike = async () => {
        const [ user,...rest ] = users
        await api.post(`/devs/${user._id}/deslikes`,null,{ 
            headers: { user: id } 
        })
        setUsers(rest)
    }

    async function handleLogout(){
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
              <Image style={styles.logo} source={logo}/>
            </TouchableOpacity>


            <View style={styles.cardsContainer}>
              {users.map((item,key) => {
                 return (<View key={item._id} style={[ styles.card,{zIndex: users.length - key }]}>
                   <Image style={styles.avatar} source={{uri:item.avatar}}/>
                   <View style={styles.footer}>
                       <Text style={styles.name}>{item.name}</Text>
                       <Text numberOfLines={3} style={styles.bio}>{item.bio}</Text>
                   </View>
                  </View>)
              })}
            </View>

        <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleDeslike} style={styles.button}><Image source={dislike}/></TouchableOpacity>
            <TouchableOpacity onPress={handleLike} style={styles.button}><Image source={like}/></TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'space-between'
    },
    cardsContainer:{
        flex:1,
        alignSelf:'stretch',
        justifyContent:'center',
        maxHeight:500
    },
    card:{
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:8,
        margin:30,
        overflow:'hidden',
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    avatar:{
        flex:1,
        height:300
    },
    footer:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:15
    },
    name:{
        fontWeight:'bold',
        fontSize:16,
        color:'#333'
    },
    bio:{
        fontSize:14,
         color:'#999',
         marginTop:5,
         lineHeight:18
    },
    logo:{
        marginTop:30
    },
    buttonsContainer:{
        flexDirection:'row',
        marginBottom:30
    },
    button:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:20,
        elevation:2
    }
})

export default Main
