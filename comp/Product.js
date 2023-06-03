import { StyleSheet, Image, Text, View } from 'react-native'
import React ,{useEffect} from 'react'

const Product = (props) => {
  return (
    <View>
       <Text>Product</Text>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
    logo:{
        marginTop:30,
        width:300,
        height:100,
        alignSelf:'center',
        marginBottom:40,
    },
})