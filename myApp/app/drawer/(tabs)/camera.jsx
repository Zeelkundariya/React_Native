// import React, {
//   useRef,
//   useState,
//   useEffect
// } from "react";


// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Dimensions,
//   Animated
// } from "react-native";


// import {
//   CameraView,
//   useCameraPermissions
// } from "expo-camera";


// import * as MediaLibrary from "expo-media-library";


// import * as Haptics from "expo-haptics";


// import Slider from
// "@react-native-community/slider";


// import {
//  Gesture,
//  GestureDetector
// }
// from "react-native-gesture-handler";



// const {width,height}=Dimensions.get("window");



// export default function Camera(){


// const cameraRef=useRef(null);



// const [permission,requestPermission]
// =useCameraPermissions();



// const [facing,setFacing]
// =useState("back");


// const [flash,setFlash]
// =useState("off");


// const [mode,setMode]
// =useState("photo");


// const [zoom,setZoom]
// =useState(0);


// const [baseZoom,setBaseZoom]
// =useState(0);



// const [photo,setPhoto]
// =useState(null);


// const [video,setVideo]
// =useState(null);



// const [recording,setRecording]
// =useState(false);



// const [time,setTime]
// =useState(0);



// const scale =
// useRef(new Animated.Value(1))
// .current;



// const [focus,setFocus]
// =useState(null);






// useEffect(()=>{


// let interval;


// if(recording){

// interval=setInterval(()=>{

// setTime(t=>t+1);

// },1000);

// }

// else{

// setTime(0);

// }


// return()=>clearInterval(interval);


// },[recording]);








// /* PINCH ZOOM */


// const pinch=Gesture.Pinch()


// .onUpdate((e)=>{


// let value=
// baseZoom+(e.scale-1)*0.4;


// if(value<0)
// value=0;


// if(value>1)
// value=1;


// setZoom(value);


// })


// .onEnd(()=>{


// setBaseZoom(zoom);


// });









// const saveToGallery=async(uri)=>{


// try{


// const permission=
// await MediaLibrary.requestPermissionsAsync();


// if(!permission.granted)
// return;



// const asset=
// await MediaLibrary.createAssetAsync(uri);



// await MediaLibrary.createAlbumAsync(
// "Camera App",
// asset,
// false
// );



// }

// catch(error){

// console.log(error);

// }


// };








// const capturePhoto=async()=>{


// try{


// Haptics.notificationAsync(
// Haptics.NotificationFeedbackType.Success
// );



// Animated.sequence([


// Animated.timing(
// scale,
// {
// toValue:.85,
// duration:100,
// useNativeDriver:true
// }),


// Animated.timing(
// scale,
// {
// toValue:1,
// duration:100,
// useNativeDriver:true
// })



// ]).start();



// const result=
// await cameraRef.current
// .takePictureAsync();



// setPhoto(result.uri);



// await saveToGallery(
// result.uri
// );



// }

// catch(e){

// console.log(e);

// }


// };








// const startVideo=async()=>{


// try{


// setRecording(true);


// Haptics.impactAsync(
// Haptics.ImpactFeedbackStyle.Heavy
// );



// const result=
// await cameraRef.current
// .recordAsync({

// quality:"1080p"

// });



// setVideo(result.uri);



// await saveToGallery(
// result.uri
// );



// }

// catch(e){

// console.log(e);

// }


// };







// const stopVideo=()=>{


// cameraRef.current
// .stopRecording();


// setRecording(false);


// };








// const focusCamera=(e)=>{


// setFocus({

// x:e.nativeEvent.locationX,

// y:e.nativeEvent.locationY

// });


// };










// if(!permission)
// return <View/>;




// if(!permission.granted){


// return(

// <View style={styles.center}>


// <TouchableOpacity

// style={styles.permission}

// onPress={requestPermission}

// >


// <Text>
// Allow Camera
// </Text>


// </TouchableOpacity>


// </View>


// );


// }









// return(


// <View style={styles.container}>


// <GestureDetector
// gesture={pinch}
// >


// <TouchableOpacity

// activeOpacity={1}

// style={styles.camera}

// onPress={focusCamera}

// >


// <CameraView

// ref={cameraRef}

// style={styles.camera}

// facing={facing}

// flash={flash}

// zoom={zoom}

// mode={mode}

// videoQuality="1080p"

// />



// </TouchableOpacity>


// </GestureDetector>








// {
// recording &&

// <View style={styles.timer}>

// <Text style={styles.red}>

// 🔴 {time}s

// </Text>

// </View>

// }










// <View style={styles.top}>


// <TouchableOpacity

// style={styles.circle}

// onPress={()=>{

// setFlash(
// flash==="off"
// ?"on"
// :"off"
// )

// }}

// >

// <Text style={styles.icon}>
// 🔦
// </Text>

// </TouchableOpacity>






// <TouchableOpacity

// style={styles.circle}

// onPress={()=>{

// setFacing(

// facing==="back"
// ?
// "front"
// :
// "back"

// )

// }}

// >

// <Text style={styles.icon}>
// 🔄
// </Text>


// </TouchableOpacity>



// </View>









// <View style={styles.zoom}>


// <Text style={styles.white}>
// Zoom
// </Text>


// <Slider

// minimumValue={0}

// maximumValue={1}

// value={zoom}

// onValueChange={setZoom}

// style={{
// width:width-40
// }}

// />


// </View>









// <View style={styles.bottom}>


// <TouchableOpacity

// onPress={()=>setMode("photo")}

// style={styles.mode}

// >

// <Text style={styles.icon}>
// 📸
// </Text>


// </TouchableOpacity>







// <Animated.View
// style={{
// transform:[
// {
// scale
// }
// ]
// }}
// >


// <TouchableOpacity

// style={styles.capture}

// onPress={

// mode==="photo"

// ?

// capturePhoto

// :

// recording

// ?

// stopVideo

// :

// startVideo

// }


// >


// <Text style={{fontSize:35}}>

// {

// mode==="photo"

// ?

// "📸"

// :

// recording

// ?

// "⏹"

// :

// "🎥"

// }


// </Text>


// </TouchableOpacity>


// </Animated.View>









// <TouchableOpacity

// onPress={()=>setMode("video")}

// style={styles.mode}

// >


// <Text style={styles.icon}>
// 🎥
// </Text>


// </TouchableOpacity>



// </View>









// {
// (photo||video)&&


// <Image

// source={{
// uri:photo||video
// }}

// style={styles.thumb}

// />


// }



// </View>


// );


// }









// const styles=StyleSheet.create({


// container:{
// flex:1,
// backgroundColor:"black"
// },



// camera:{
// flex:1
// },



// center:{
// flex:1,
// justifyContent:"center",
// alignItems:"center"
// },



// permission:{
// padding:20,
// backgroundColor:"white",
// borderRadius:30
// },



// top:{
// position:"absolute",
// top:50,
// width:"100%",
// flexDirection:"row",
// justifyContent:"space-around"
// },



// circle:{
// backgroundColor:"#0008",
// padding:15,
// borderRadius:50
// },



// icon:{
// fontSize:25
// },



// zoom:{
// position:"absolute",
// bottom:160,
// alignItems:"center",
// width:"100%"
// },



// white:{
// color:"white",
// fontSize:18
// },



// bottom:{
// position:"absolute",
// bottom:40,
// width:"100%",
// flexDirection:"row",
// justifyContent:"space-around",
// alignItems:"center"
// },



// capture:{
// width:80,
// height:80,
// borderRadius:50,
// backgroundColor:"white",
// justifyContent:"center",
// alignItems:"center"
// },



// mode:{
// backgroundColor:"#0009",
// padding:15,
// borderRadius:50
// },



// timer:{
// position:"absolute",
// top:110,
// alignSelf:"center"
// },



// red:{
// color:"red",
// fontSize:25,
// fontWeight:"bold"
// },



// thumb:{
// position:"absolute",
// bottom:45,
// left:20,
// width:65,
// height:65,
// borderRadius:10
// }



// });