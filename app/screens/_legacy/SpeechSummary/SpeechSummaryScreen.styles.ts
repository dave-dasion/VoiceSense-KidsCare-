import { Dimensions, StyleSheet } from "react-native";

import { Layout as ConstantsLayout } from "constant";
import { Colors, Font, Layout } from "style";
const Height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  circleView: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: Colors.AppColor,
    marginTop:'-15%',
    justifyContent: "center",
    alignItems: 'center'
  },
  microphoneIcon: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    tintColor:Colors.white
  },
  headerText: {
    fontSize: 27,
    fontFamily: Font.FontWeight.Bold,
    color: Colors.white,
    // marginLeft: '13%',
    // marginTop: '8%',
    // alignSelf: "center",
    textAlign:'center'
  },
  firstText: {
    fontSize: 45,
    fontFamily: Font.FontWeight.Bold,
    color: Colors.black,
    // marginLeft: '13%',
    marginTop: '8%',
    textAlign:'center'
  },
  secondText: {
    fontSize: 45,
    fontFamily: Font.FontWeight.Bold,
    color: Colors.black,
    // marginLeft: '13%',
    textAlign:'center'
    // marginTop:1,
    // fontWeight:'100'
  },
  musicWaveIcon: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    tintColor: Colors.black,
    top: -90,
    alignSelf: 'center'
  },
  rowView: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white',
    // bottom: 60,
    margin:40,
    // top: -200,
    // right:10
  },
  appLogoStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: Colors.AppColor
  },
  appBannerStyle: {
    height: 130,
    width: 130,
    resizeMode: 'contain',
    tintColor: Colors.AppColor,
    marginLeft: '5%'
  },
  zoomIconStyle: {
    height: 130,
    width: 130,
    resizeMode: 'contain',
    tintColor:Colors.black,
    // backgroundColor: Colors.white,
    // borderRadius:65,
    marginLeft: '5%'
  },
  imgBackGround: {
    height: Height - 100, width: '100%'
  },
  PlayRowView: {
    flexDirection: "row",
    marginTop: '35%',
    alignSelf: 'center',
  },
  playIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  videoZoom: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 160,
  },
  bottomView: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 110
  },
  relatedText:{
    fontSize: 30,
    fontFamily: Font.FontWeight.Medium,
    color: Colors.black,
    
  }
});
