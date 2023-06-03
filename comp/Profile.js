import { View, Text, StyleSheet, Linking, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const Profile = (props) => {
  const [objU, setobjU] = useState({});
  console.log(objU.Role);
  const getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem("loginInfo");
      if (value !== null) {
        setobjU(JSON.parse(value));
      }
    } catch (e) {}
  };
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getLoginInfo();
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/goku.jpg")} style={styles.itemImage} />

      <View style={styles.view_cach}>
        <View style={styles.view_item}>
          <Image source={require("../assets/user.png")} style={styles.img_icon} />
          <Text style={styles.txtfont1}> {objU.fullname}</Text>
        </View>
        <View style={styles.view_item}>
          <Image source={require("../assets/email.png")} style={styles.img_icon} />
          <Text style={styles.txtfont}> {objU.email} </Text>
        </View>
        <View style={styles.view_item_call}>
          <Image source={require("../assets/telephone-call.png")} style={styles.img_icon} />
          <Text style={styles.txtfont}
            onPress={() => {
              let phoneNumber = objU.phone;
              Linking.openURL(`tel:${phoneNumber}`);
            }}
          >
            {objU.phone}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  
  },
  itemImage: {
    height: 150,
    width: 150,
    borderRadius: 90,
  },
  txtfont:{
    fontSize:15,
    marginLeft:10,
    marginTop:5,
  },
  txtfont1:{
    marginRight:145,
    marginTop:5,
    fontSize:15
  },
  view_cach: {
    marginTop: 20,
    padding: 10,
  },
  img_icon: {
    width: 40,
    height: 40,
  },
  view_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  view_item_call: {
    flexDirection: "row",
    margin: 10,
  },
});

export default Profile;
