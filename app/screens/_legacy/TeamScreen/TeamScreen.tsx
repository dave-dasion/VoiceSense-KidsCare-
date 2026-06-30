import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Linking,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "style";
import { NavStatelessComponent } from "interfaces";

import navigationOptions from "./TeamScreen.navigationOptions";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const TeamScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<any>(null);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [dob, setDOB] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [dateOfInjury, setDateOfInjury] = useState("");
  const [isDatePickerVisibleDOI, setDatePickerVisibleDOI] = useState(false);

  const players = [
    {
      id: 1,
      name: "John Doe",
      teamNumber: 15,
      onField: true,
      injured: false,
      skills: ["Dribbling", "Passing", "Shooting"],
    },
    {
      id: 2,
      name: "James Smith",
      teamNumber: 16,
      onField: true,
      injured: false,
      skills: ["Tackling", "Passing", "Speed"],
    },
    {
      id: 3,
      name: "Robert Johnson",
      teamNumber: 169,
      onField: true,
      injured: false,
      skills: ["Heading", "Shooting", "Defense"],
    },
    {
      id: 4,
      name: "Michael Brown",
      onField: true,
      teamNumber: 186,
      injured: true,
      skills: ["Passing", "Dribbling"],
    },
    {
      id: 5,
      name: "William Jones",
      onField: true,
      teamNumber: 163,
      injured: false,
      skills: ["Dribbling", "Speed", "Shooting"],
    },
    {
      id: 6,
      name: "David Garcia",
      onField: true,
      injured: false,
      teamNumber: 94,
      skills: ["Tackling", "Defense", "Strength"],
    },
    {
      id: 7,
      name: "Richard Miller",
      onField: true,
      teamNumber: 114,
      injured: false,
      skills: ["Speed", "Dribbling"],
    },
    {
      id: 8,
      name: "Joseph Wilson",
      onField: true,
      teamNumber: 58,
      injured: false,
      skills: ["Shooting", "Tackling"],
    },
    {
      id: 9,
      name: "Charles Moore",
      onField: true,
      teamNumber: 72,
      injured: false,
      skills: ["Passing", "Defense"],
    },
    {
      id: 10,
      name: "Thomas Taylor",
      onField: true,
      teamNumber: 74,
      injured: false,
      skills: ["Speed", "Shooting", "Passing"],
    },
    {
      id: 11,
      name: "Daniel Anderson",
      onField: true,
      teamNumber: 63,
      injured: true,
      skills: ["Shooting", "Dribbling"],
    },
    {
      id: 12,
      name: "Matthew Thomas",
      onField: true,
      teamNumber: 90,
      injured: false,
      skills: ["Passing", "Defense"],
    },
    {
      id: 13,
      name: "Anthony Jackson",
      onField: true,
      teamNumber: 12,
      injured: false,
      skills: ["Strength", "Shooting"],
    },
    {
      id: 14,
      name: "Mark White",
      onField: true,
      teamNumber: 109,
      injured: false,
      skills: ["Tackling", "Passing"],
    },
    {
      id: 15,
      name: "Donald Harris",
      onField: true,
      teamNumber: 136,
      injured: false,
      skills: ["Speed", "Dribbling"],
    },
    {
      id: 16,
      name: "Steven Clark",
      onField: true,
      teamNumber: 172,
      injured: false,
      skills: ["Passing", "Shooting"],
    },
  ];

  const familyTree = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/men/43.jpg",
      name: "John Doe",
      relation: "Father",
      mobile: "123-456-7890",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/women/53.jpg",
      name: "Jane Doe",
      relation: "Mother",
      mobile: "987-654-3210",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      name: "Emily Doe",
      relation: "Sister",
      mobile: "555-123-4567",
    },
    {
      id: 4,
      image: "https://randomuser.me/api/portraits/men/59.jpg",
      name: "Edward",
      relation: "Brother",
      mobile: "555-987-6543",
    },
    {
      id: 5,
      image: "https://randomuser.me/api/portraits/women/14.jpg",
      name: "Alice Doe",
      relation: "Grandmother",
      mobile: "111-222-3333",
    },
    {
      id: 6,
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      name: "George Doe",
      relation: "Grandfather",
      mobile: "444-555-6666",
    },
    {
      id: 7,
      image: "https://www.hmc.edu/mathematics/wp-content/uploads/sites/49/2023/01/faculty-gu.jpg",
      name: "Weiqing Gu",
      relation: "Friend",
      mobile: "909-373-7968",
    },
  ];

  // Animation values - initialized with proper arrays
  const [fadeAnims] = useState(() => 
    familyTree.map(() => new Animated.Value(0))
  );
  const [slideAnims] = useState(() => 
    familyTree.map(() => new Animated.Value(50))
  );
  const [scaleAnims] = useState(() => 
    familyTree.map(() => new Animated.Value(0.8))
  );

  // Initialize animation values - runs every time screen is visited
  useFocusEffect(
    React.useCallback(() => {
      // Reset animations to initial values
      familyTree.forEach((_, index) => {
        fadeAnims[index].setValue(0);
        slideAnims[index].setValue(50);
        scaleAnims[index].setValue(0.8);
      });

      // Animate items
      const animations = familyTree.map((_, index) =>
        Animated.parallel([
          Animated.timing(fadeAnims[index], {
            toValue: 1,
            duration: 600,
            delay: index * 100,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnims[index], {
            toValue: 0,
            delay: index * 100,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnims[index], {
            toValue: 1,
            delay: index * 100,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ])
      );

      Animated.stagger(50, animations).start();
    }, [])
  );

  const renderMobileView = () => (
    <ScrollView
      style={styles.playerList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {familyTree.map((player, index) => (
        <Animated.View
          key={player.id}
          style={{
            opacity: fadeAnims[index] || 0,
            transform: [
              { translateX: slideAnims[index] || 0 },
              { scale: scaleAnims[index] || 1 },
            ],
          }}
        >
          <TouchableOpacity
            style={styles.playerItem}
            onPress={() => {
              navigation.navigate("FamilyTranscript");
            }}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: player.image }}
                />
                <View style={styles.relationBadge}>
                  <Text style={styles.relationBadgeText}>{player.relation}</Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${player.mobile}`);
                  }}
                  style={styles.mobileContainer}
                >
                  <Ionicons name="call" size={16} color={Colors.AppColor} />
                  <Text style={styles.playerSkills}>{player.mobile}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.chevronContainer}>
                <Ionicons
                  suppressHighlighting={true}
                  name={"chevron-forward-outline"}
                  size={20}
                  color={Colors.black50}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );

  const renderTabletView = () => (
    <ScrollView
      style={styles.playerList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.tabletGrid}>
        {familyTree.map((player, index) => (
          <Animated.View
            key={player.id}
            style={[
              styles.tabletCardWrapper,
              {
                opacity: fadeAnims[index] || 0,
                transform: [
                  { translateY: slideAnims[index] || 0 },
                  { scale: scaleAnims[index] || 1 },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.tabletCard}
              onPress={() => {
                navigation.navigate("FamilyTranscript");
              }}
              activeOpacity={0.7}
            >
              <View style={styles.tabletCardHeader}>
                <Image
                  style={styles.tabletProfileImage}
                  source={{ uri: player.image }}
                />
                <View style={styles.tabletRelationBadge}>
                  <MaterialCommunityIcons
                    name="account-heart"
                    size={14}
                    color="#fff"
                  />
                  <Text style={styles.tabletRelationText}>{player.relation}</Text>
                </View>
              </View>

              <View style={styles.tabletCardBody}>
                <Text style={styles.tabletPlayerName}>{player.name}</Text>
                
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${player.mobile}`);
                  }}
                  style={styles.tabletMobileContainer}
                >
                  <View style={styles.tabletCallButton}>
                    <Ionicons name="call" size={18} color="#fff" />
                    <Text style={styles.tabletMobileText}>{player.mobile}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.tabletViewButton}
                  onPress={() => {
                    navigation.navigate("FamilyTranscript");
                  }}
                >
                  <Text style={styles.tabletViewButtonText}>View Details</Text>
                  <Ionicons name="arrow-forward" size={16} color={Colors.AppColor} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.mainView}>
      {isTablet ? renderTabletView() : renderMobileView()}
    </View>
  );
};

TeamScreen.navigationOptions = navigationOptions();

export default TeamScreen;

const styles = StyleSheet.create({
  input1: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  mainView: {
    flex: 1,
    padding: isTablet ? 20 : 10,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: Platform.OS == "ios" ? 20 : 10,
    position: "absolute",
    top: "5%",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },
  playerList: {
    width: "100%",
  },
  
  // Mobile styles
  playerItem: {
    margin: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.AppColor,
  },
  relationBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: Colors.AppColor,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  relationBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  playerName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  mobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  playerSkills: {
    fontSize: 14,
    color: Colors.AppColor,
    fontWeight: "600",
    marginLeft: 6,
  },
  chevronContainer: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 20,
  },

  // Tablet styles
  tabletGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  tabletCardWrapper: {
    width: "48%",
    marginBottom: 20,
  },
  tabletCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  tabletCardHeader: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
    position: "relative",
  },
  tabletProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.AppColor,
  },
  tabletRelationBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: Colors.AppColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tabletRelationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  tabletCardBody: {
    padding: 20,
  },
  tabletPlayerName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  tabletMobileContainer: {
    marginBottom: 16,
  },
  tabletCallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.AppColor,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tabletMobileText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
  tabletViewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f9ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.AppColor,
  },
  tabletViewButtonText: {
    color: Colors.AppColor,
    fontSize: 15,
    fontWeight: "700",
    marginRight: 6,
  },

  activePlayer: {},
  injuredPlayer: {
    color: "red",
  },
  texTeamContain: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.AppColor,
    borderRadius: 10,
    marginBottom: 10,
    width: "95%",
  },
  texTeam: {
    fontSize: 18,
    fontWeight: "700",
    padding: 10,
    color: Colors.white,
  },
});