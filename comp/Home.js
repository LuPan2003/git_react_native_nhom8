import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Switch,
  Dimensions,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useEffect, useState } from "react";
import Update from "./UpDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
// json-server --watch thuchanh.json  -H 192.168.0.103
const Home = (props) => {
  
  const [isLoading, setisLoading] = useState(true);
  const [dssp, setdssp] = useState([]);

  const getListPro = async () => {
    let url_api = "http://192.168.0.101:3000/posts";
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setdssp(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };
  const renderProduct = (row) => {
    console.log(row);
    return (
      <View style={styles.box}>
        <ScrollView >
          <View style={styles.view_item}>
            <Image source={{ uri: row.item.anh_dienthoai }} style={styles.itemImage} />
                     <Text style={styles.headerItem}>{row.item.ten_dienthoai}</Text>
              <Text style={styles.contentItem}>{row.item.gia_dienthoai}</Text>
                
              </View>
        </ScrollView>
      </View>
    );
  };

  useEffect(() => {
    getListPro();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text_t}>Sản Phẩm</Text>
    
     <View style={styles.container1}>
        <FlatList
          data={dssp}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={renderProduct}
          
        />

      </View>

    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container1:{
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  itemImage: {
    height: 80,
    width: 80,
    marginLeft:7,
    borderRadius: 10,
  },

  headerItem: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  contentItem: {
    color: "#576574",
  },
box:{
  width: '100%',
  flexDirection:"row",
  justifyContent:'space-between',
},
  text_t: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  
  box1:{
    marginLeft:10,
    marginTop:10,
  },
  view_item: {
  flexDirection: "row",
    // flexDirection: "",
    margin: 10,
  },
});
