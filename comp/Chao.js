import { StyleSheet, Image, Text, View } from 'react-native'
import React ,{useEffect} from 'react'

const Chao = (props) => {
    const chuyentrang = () =>{
        setTimeout(()=>{
            props.navigation.navigate('Login');
        },3000);
    }
    useEffect(()=>{
        chuyentrang();
    },[]);
  return (
    <View>
         <Image  style={styles.logo} source={require('../assets/FPT_Polytechnic.png')}></Image>
</View>
  )
}

export default Chao

const styles = StyleSheet.create({
    logo:{
        marginTop:30,
        width:300,
        height:100,
        alignSelf:'center',
        marginBottom:40,
    },
})