import { Dimensions, Platform, StyleSheet } from "react-native";
import { Colors, Font, Layout } from "style";
const Height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    ...Layout.containerWithPadding,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  // },
heading:{
  flexDirection: 'column',
  // alignItems: 'center',
  },
  innerSteps:{
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    // backgroundColor:'purple'
    },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    height:'20%',
    width:'100%',
    borderRadius:10,
    borderColor:Colors.AppColor,
    borderWidth:2
  },
  titleText: {
    fontSize: 15,
    // fontWeight:700,
    // margin:20,
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    paddingVertical: 5,
    marginLeft:15,
    width:'90%',
    // backgroundColor:'yellow',
    // flex: 1,

  },
headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    // marginBottom: 20,
    
    width: '80%',
    height:50,
    backgroundColor:'white',
    marginTop: Platform.OS == 'ios' ? '15%' : 10,

    // position: 'absolute', top: '5%'
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
