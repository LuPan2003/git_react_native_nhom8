import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ImageBackground,Modal,Button,Image
} from "react-native";
import React , {useEffect , useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login  = ({navigation}) =>{

    const[Usre, setUsre] = useState("");
    const[Pass,setPass] = useState("");

    const doLogin =()=>{
        if(Usre.length == 0){
            alert("Chưa nhập Email");
            return;
        }
         if(Pass.length ==0){
            alert("Chưa nhập Password");
            return;
        }
        let uri_check_login ='http://192.168.0.101:3000/users?email='+Usre;
        fetch(uri_check_login)
        .then((res) =>{return res.json();})
        .then( async (arr_user)=>{
            if(arr_user.length !=1){
                alert(Usre);
            return;
            }
            let obju = arr_user[0];
            if(obju.passwd != Pass){
            alert("Sai pass");
            return;
        }
        try {
            await AsyncStorage.setItem('loginInfo',   JSON.stringify(obju)   );
            console.log("Ghi dữ liệu thành công");
            navigation.navigate('Hometabs');
          } catch (e) {
            console.log(e); 
          }

        })
        .catch((err) =>{
            console.log(err);
        })
        
    }

    const [showModalDialog, setshowModalDialog] = useState(false);
    const [nguoidung, setnguoidung] = useState("");
    const [email_add, setEmail_add] = useState("");
    const [phone_add, setPhone_add] = useState("");
    const [pass_add,  setpass_add]   = useState("");

    const SaveProduct = () => {
        let objSP = { fullname: nguoidung ,  email: email_add  ,passwd: pass_add , phone: phone_add };
        if(nguoidung.length==0){
            alert("Vui lòng nhập Họ Tên");  
            return;
        }
       if(email_add.length==0){
            alert('Vui lòng nhập Email');
            return;
        }
        if(pass_add.length==0){
            alert('Vui lòng nhập Password');
            return;
        }
        if(phone_add.length==0){
            alert('Vui lòng nhập số điện thoại');
            return;
        }
        try {
            let url_api ="http://192.168.0.101:3000/users";
            fetch(url_api, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objSP),
            })
              .then((res) => {
                if (res.status == 201)
                alert("Thêm thành công");
               
              }).catch((ex) => {
                console.log(ex);
              });        
        }catch (err) {
            console.log('loc doc thong tin');
            console.log(err);
        }
      };


    return(
        <View style={styles.container}>
            <Text style={styles.text1}>Welcome</Text>
            <Text style={styles.text2}>To LuPan</Text>
            <Text style={styles.text}>Email</Text>
            <TextInput  style={styles.textInput} placeholder="Nhập Email" onChangeText={(txt)=>{setUsre(txt)}}></TextInput>
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.textInput} placeholder="Nhập Password" onChangeText={(txt)=>{setPass(txt)}} textContentType='password' secureTextEntry={true}></TextInput>
            <View style={styles.box1}>
            <Pressable style={styles.btnDangNhap} >
                            <Text style={styles.textLogin} onPress={doLogin} >Đăng Nhập</Text></Pressable>

            <Modal visible={showModalDialog}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={
                        ()=>{
                            setshowModalDialog (false);
                        }
                    }>
                         <View style={styles.khung_dialog}>
          <View style={styles.noidung_dialog}>
             <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 21, fontWeight: 'bold' }}>Thêm Tài Khoản</Text>
            <TextInput style={styles.textInput} id="txtNguoidung" placeholder="Nhập Họ Tên " onChangeText={(txt) =>{setnguoidung(txt)}}/>
            
            <TextInput style={styles.textInput} placeholder="Nhập Email" onChangeText={(txt) => { setEmail_add(txt);}}/>
            <TextInput style={styles.textInput} placeholder="Nhập Mật Khẩu" onChangeText={(txt) => { setpass_add(txt);}}/>
            <TextInput style={styles.textInput} placeholder="Nhập Số Điện Thoại" onChangeText={(txt) => { setPhone_add(txt);}}/>
            <View style={styles.view_btn}>
              <TouchableOpacity style={styles.btnDangNhap1} onPress={SaveProduct} >
                <Text style={styles.textLogin}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDangNhap2} onPress={()=>{ setshowModalDialog(false)}} >
            <Text style={styles.textLogin} onPress={()=>{setshowModalDialog(false)}} >Hủy</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
            </Modal>
            <Pressable id="myBottom" style={styles.btnDangNhap}> 
                             <Text style={styles.textLogin} onPress={()=>{setshowModalDialog(true)}} >Đăng Ký</Text></Pressable>  
            </View>
            <Text style={[styles.text , {fontSize:15 , textAlign:'center', margin:10}]}>or continue with</Text>
           
            <View style={styles.rememberme}>
                <Pressable  style={styles.buttonSocial1}>
                                <Image style={{width:21,height:21 ,marginEnd:10}} source={require('../assets/Facebook-logo.png')}></Image>
                                <Text>Facebook</Text>
                            </Pressable>
                            <Pressable  style={styles.buttonSocial2}>
                                <Image style={{width:21,height:21 ,marginEnd:10}} source={require('../assets/lggg.jpg')}></Image>
                                <Text>Google</Text>
                            </Pressable>
            </View>
        </View>
    )
}
export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        flexDirection:'column',
    },
    img:{
        width:300,
        height:20,
    },
    text1:{
        color:'#00FF99',
        fontSize:55,
        marginLeft:160,
        marginTop:20,
        fontWeight:'bold',
     },
     text:{
        fontSize:15,
        marginLeft:50,
        marginTop:20,
        fontWeight:'bold',
     },
     text2:{
        color:'red',
        fontSize:45,
        marginLeft:204,
        fontStyle:'italic',
        fontWeight:'bold',
     },
     imgbgr:{
        width:200,
        flex:1,
     },
     textInput:{
        height:40,
        borderRadius:10,
        borderWidth:2,
        marginTop:10,
        marginLeft:50,
        marginRight:50,
        margin:5
    },
    btnDangNhap:{
        backgroundColor:'#888888',
        height:50,
        width:100,
        marginLeft:70,
        marginTop:30,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
    },
    textLogin:{
        color:'black',
        fontSize:16,
        fontWeight:'bold',
    },
    box1:{
        flexDirection:"row",
    },
    rememberme:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonSocial1:{
        flexDirection:'row',
        width:154,
        height:48,
        backgroundColor:'#EEF1F4',
        marginLeft:40,
        borderRadius:10,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',

    },
    buttonSocial2:{
        flexDirection:'row',
        width:154,
        height:48,
        backgroundColor:'#EEF1F4',
        marginRight:40,
        marginTop:30,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    khung_dialog: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    noidung_dialog: {
        backgroundColor: '#CCFF66',
        height: 350,
        width: '90%',
        borderRadius: 10
    },
    khung_itempost: {
        margin: 10,
        backgroundColor: '#bdc3c7',
        padding: 10,
        borderRadius: 9
    },
    view_btn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        padding:10,
        justifyContent:'space-between'
    },
    btnDangNhap1:{
        backgroundColor:'#888888',
        height:40,
        width:100,
        marginLeft:60,        
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    btnDangNhap2:{
        backgroundColor:'#888888',
        height:40,
        width:100,
        marginRight:60,        
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
});