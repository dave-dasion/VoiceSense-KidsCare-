import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Switch, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigationOptions from "./AdminPage.navigationOptions";
import { Button } from "components";
import { Colors } from "style";

const STORAGE_KEY_FEATURES = "@admin_features";
const STORAGE_KEY_EMAIL = "@admin_email";

const AdminPage = () => {
  const [features, setFeatures] = useState([
    { id: "1", name: "Dictation Tool", price: "$10", enabled: false },
    { id: "2", name: "Assesments", price: "$20", enabled: true },
    { id: "3", name: "Billing", price: "$15", enabled: false },
    { id: "4", name: "Call Doctor", price: "$18", enabled: false },
    { id: "5", name: "Add My EMR Document", price: "$18", enabled: false },
    { id: "6", name: "Let it Out - Talk to me!", price: "$22", enabled: false },
    { id: "7", name: "Performance Score", price: "$22", enabled: false },
  ]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedFeatures = await AsyncStorage.getItem(STORAGE_KEY_FEATURES);
        const savedEmail = await AsyncStorage.getItem(STORAGE_KEY_EMAIL);

        if (savedFeatures) setFeatures(JSON.parse(savedFeatures));
        if (savedEmail) setEmail(savedEmail);
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };

    loadData();
  }, []);

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
      )
    );
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_FEATURES, JSON.stringify(features));
      await AsyncStorage.setItem(STORAGE_KEY_EMAIL, email);
      Alert.alert("Success", "Settings saved successfully!");
    } catch (e) {
      console.error("Failed to save data", e);
      Alert.alert("Error", "Failed to save settings.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.featureItem}>
            <View>
              <Text style={styles.featureName}>{item.name}</Text>
              <TextInput
                style={styles.input}
                placeholder="price"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={item.price}
                onChangeText={setEmail}
              />
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleFeature(item.id)}
              trackColor={{ false: Colors.AppColor, true: Colors.AppColor }} // background of the switch track
            />
          </View>
        )}
      />

      <Button.Primary
        fullWidth
        style={{
          backgroundColor: Colors.AppColor,
          bottom: 10,
        }}
        onPress={saveData}
        text={"Save "}
      />

      {/* <Button title="Save Settings" onPress={saveData} /> */}
    </View>
  );
};

AdminPage.navigationOptions = navigationOptions;

export default AdminPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
  },
  list: {
    marginTop: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  featureName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  featurePrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
