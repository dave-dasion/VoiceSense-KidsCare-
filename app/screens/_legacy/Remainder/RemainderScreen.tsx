import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

import { NavStatelessComponent } from "interfaces";
import { Button } from "components";
import { Colors } from "style";

import navigationOptions from "./RemainderScreen.navigationOptions";
import styles from "./RemainderScreen.styles";

const RemainderScreen = ({ navigation }) => {
  const bottomSheetAddNewRemainderRef = useRef<any>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [RemainderList, setRemainderList] = useState([]);
  const [text, setText] = useState("");

  const openBottomSheet = () => {
    setText("");
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    if (bottomSheetAddNewRemainderRef.current) {
      bottomSheetAddNewRemainderRef.current.open();
    }
  };
  useEffect(() => {
    navigation.setOptions(navigationOptions(openBottomSheet));
  }, [navigation]);
  const handleChange = (inputText) => {
    setText(inputText);
  };

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please enable notifications in settings.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    requestPermissions();
    loadData();
  }, []);

  // Function to load data from AsyncStorage
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("RemainderList");
      if (storedData !== null) {
        setRemainderList(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const getCombinedDateTime = () => {
    const dateObj = new Date(selectedDate);
    const timeObj = new Date(selectedTime);

    // Extract Date parts
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    // Extract Time parts
    const hours = timeObj.getHours();
    const minutes = timeObj.getMinutes();
    const seconds = timeObj.getSeconds();

    // Combine into a new Date object
    return new Date(year, month, day, hours, minutes, seconds);
  };

  const addRemainder = async (title: string, date: string, time: string) => {
    const notificationDateTime = getCombinedDateTime();

    console.log(notificationDateTime.toLocaleString());

    const now = new Date();
    if (text === "") {
      alert("Please enter reminder title.");
      return;
    }

    if (notificationDateTime <= now) {
      alert("Please select a future date and time!");
      return;
    }

    try {
      const newItem = {
        title: title,
        date: date,
        time: time,
        id: Date.now().toString() + Math.floor(Math.random() * 1000),
      };

      const updatedData = [...RemainderList, newItem]; // Add new object to array
      setRemainderList(updatedData);
      await AsyncStorage.setItem("RemainderList", JSON.stringify(updatedData));
      sendNotification(notificationDateTime, title);
      bottomSheetAddNewRemainderRef.current?.close();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDatePickerOpen = () => {
    setDatePickerVisible(true);
    setTimePickerVisible(false);
  };

  const handleTimePickerOpen = () => {
    setTimePickerVisible(true);
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);

    setDatePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);

    setTimePickerVisible(false);
  };

  const sendNotification = async (notificationDateTime: any, body: string) => {
    console.log("notificationDateTime", notificationDateTime);
    console.log("body", body);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: body,
        sound: "default",
      },
      trigger: {
        date: notificationDateTime,
      },
    });
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
      }}
      onPress={() => {
        handleDelete(id);
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
    </TouchableOpacity>
  );

  const handleDelete = (id) => {
    setRemainderList((prevData) => {
      const updatedList = prevData.filter((item) => item.id !== id);
      setRemainderList(updatedList);
      updateAsyncArray(updatedList);
      return updatedList;
    });
  };

  const updateAsyncArray = async (updatedList: any) => {
    await AsyncStorage.setItem("RemainderList", JSON.stringify(updatedList));
  };

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <FlatList
          style={styles.container}
          data={RemainderList}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            return (
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgray",
                    paddingVertical: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "gray" }}>Reminder Title :- </Text>
                    <Text>{item.title}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "gray" }}>Reminder Date :- </Text>
                    <Text>{item.date}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "gray" }}>Reminder Time :- </Text>
                    <Text>{item.time}</Text>
                  </View>
                </View>
              </Swipeable>
            );
          }}
        />
      </GestureHandlerRootView>
      <RBSheet
        ref={bottomSheetAddNewRemainderRef}
        draggable={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          container: {
            borderRadius: 10,
          },
        }}
        height={320}
      >
        <View style={styles.bottomSheetView}>
          <TouchableOpacity
            onPress={() => bottomSheetAddNewRemainderRef.current.close()}
            style={styles.closeView}
          >
            <MaterialCommunityIcons name="close" color={"black"} size={15} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => handleDatePickerOpen()}
              style={{ flex: 1, height: 80 }}
            >
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="calendar" color={"black"} size={30} />
                <Text style={{ color: "gray", paddingLeft: 10 }}>Date</Text>
              </View>
              <Text style={{ color: "black", fontSize: 15, fontWeight: "600" }}>
                {selectedDate && selectedDate?.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleTimePickerOpen()} style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="clock" color={"black"} size={30} />
                <Text style={{ color: "gray", paddingLeft: 10 }}>Time</Text>
              </View>
              <Text style={{ color: "black", fontSize: 15, fontWeight: "600" }}>
                {selectedTime && selectedTime?.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={text}
            placeholder="Enter Reminder Title...."
            keyboardType="default"
          />

          <TouchableOpacity
            onPress={() => {
              addRemainder(
                text,
                selectedDate?.toLocaleDateString(),
                selectedTime?.toLocaleTimeString()
              );
            }}
            style={{
              width: "100%",
              backgroundColor: Colors.AppColor,
              alignSelf: "center",
              borderRadius: 9999,
              // marginBottom:10
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                padding: 10,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Add Reminder
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />
        {/* DateTimePicker Modal for Time */}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisible(false)}
        />
      </RBSheet>
    </View>
  );
};
RemainderScreen.navigationOptions = navigationOptions();
export default RemainderScreen;
