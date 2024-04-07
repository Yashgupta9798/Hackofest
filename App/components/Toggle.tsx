import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Toggle() {
  return (
    <View style={styles.ToggleMenu}>
      <Text style={styles.ToggleText}>Sign In</Text>
      <Text style={styles.ToggleText}>Aboout Us</Text>
      <Text style={styles.ToggleText}>Contact Us</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    ToggleMenu:{
        padding:34,
        position:"relative",
        bottom:40,
        left:0,
        height:400,
        width:150,
        backgroundColor:"#F5BCBA",
        borderTopRightRadius:30,
        borderBottomRightRadius:30
    },
    ToggleText:{
        color:"black",
        position:"relative",
        top:20,
        right:15,
        marginTop:34,
        fontSize:18,
        //!font-family
        fontFamily:"",
        backgroundColor:"#DAE0E2",
        width:100,
        borderRadius:30,
        height:50,
        textAlign:"center",
        textAlignVertical:"center",
        justifyContent:"center",

    }
})