import { StyleSheet } from "react-native";

import { Colors, Layout } from "style";

const styles = StyleSheet.create({
    RightTextStyle:{
        fontSize:30,
        fontWeight:"800",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: "100%",
        paddingLeft: 10,
        marginTop:10,
        borderRadius:5,
        fontSize:15,
        fontWeight:"500"
      },
      bottomSheetView:{
        padding:10
      },
      closeView:{
        backgroundColor:"#D3D3D3",
            height:30,
            width:30,
            borderRadius:15,
            justifyContent:"center",
            alignItems:"center"
      },
      container: {
        backgroundColor: Colors.white,
        flex:1,
        padding:10
      },
});

export default styles;