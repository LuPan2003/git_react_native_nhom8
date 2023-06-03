import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './comp/Home';
import Login from './comp/Login';
import Chao from './comp/Chao';
import Product from './comp/Product';
import Seting from './comp/Seting';
import Profile from './comp/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:() =>(
          <Image source={require('./assets/home.png')} styles={{width:30, height:30}} resizeMode="stretch"/>
        )
      }}/>
      <Tab.Screen name="Product" component={Product} options={{
        tabBarIcon:() =>(
          <Image source={require('./assets/product.png')} styles={{width:25, height:15}} resizeMode="stretch"/>
        )
      }}/>
      {/* <Tab.Screen name="Seting" component={Seting} options={{
        tabBarIcon:() =>(
          <Image source={require('./assets/seting.png')} styles={{width:25, height:15}} resizeMode="stretch"/>
        )
      }}/> */}
 <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon:() =>(
          <Image source={require('./assets/profile.png')} styles={{width:25, height:15}} resizeMode="stretch"/>
        )
      }}/>
    </Tab.Navigator>
  );
}




export default function App() {
  return (
    // <View>
    //   <Profile/>
    // </View>
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Chao" screenOptions={{headerShown:false}}>
        <Stack.Screen name='ManHinhCHao' component={Chao} />
          <Stack.Screen name='Login' component={Login} options={{title:"Login"}}/>
          <Stack.Screen name='Hometabs' component={MyTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
