import { useNavigation } from "@react-navigation/native";
import { NavStatelessComponent } from "interfaces";
import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors } from "style";
import navigationOptions from "./ImagesScreen.navigationOptions";

const data = [
  {
    id: "1",
    imageUrl: require("../../../assets/images/autismcare/LearnsayingAaah.png"),
    header: "Learn Saying Aaah",
    subHeaderText: "Practice opening mouth and vocalizing for medical prep",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=learn_saying_aaah',
    points: [
      { text: "The voice agent models saying 'Aaah' with mouth open." },
      { text: "Child mimics the sound and gesture." },
      { text: "Uses a fun mirror animation to show their face." },
      { text: "Reinforces with praise and progress stars." }
    ],
    agent: [
      { text: "Demonstrates clear 'Aaah' sound with exaggeration." },
      { text: "Says: 'Wow, that was a big Aaah!'" },
      { text: "Encourages consistency: 'Try one more time just like that.'" }
    ]
  },
  
  {
    id: "2",
    imageUrl: require("../../../assets/images/autismcare/EmotionPop.png"),
    header: "Emotion Pop",
    subHeaderText: "Recognize and pop balloons with different emotions",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=emotion_pop',
    points: [
      { text: "Balloons float up with faces showing emotions like happy, sad, or angry." },
      { text: "The child hears a prompt: 'Can you pop the happy balloon?'" },
      { text: "Correctly popping the balloon rewards them with sounds and stars." },
      { text: "The game progresses to more complex emotions." }
    ],
    agent: [
      { text: "Labels emotions: 'That's a happy face!'" },
      { text: "Gives hints: 'Look for the balloon with a big smile.'" },
      { text: "Praises accuracy: 'Great job recognizing emotions!'" }
    ]
  },
  {
    id: "3",
    imageUrl: require("../../../assets/images/autismcare/Friend_sturn.png"),
    header: "Friend's Turn",
    subHeaderText: "Learn turn-taking through interactive play",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=friends_turn',
    points: [
      { text: "Takes turns playing a simple game like catching falling apples." },
      { text: "The agent says, 'Now it's your turn!' or 'Now it's my turn!'" },
      { text: "Encourages waiting and observing others’ turns." },
      { text: "Reinforces with stars when the child waits their turn." }
    ],
    agent: [
      { text: "Narrates turns: 'I'm catching the apple. Now it's your turn!'" },
      { text: "Uses timers or cues to help with waiting." },
      { text: "Rewards patient behavior: 'You waited so well!'" }
    ]
  },
  {
    id: "4",
    imageUrl: require("../../../assets/images/autismcare/FriendFinding.png"),
    header: "Friend Finding",
    subHeaderText: "Identify appropriate social choices in peer interactions",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=friend_finding',
    points: [
      { text: "The child is shown scenes with kids playing." },
      { text: "They choose who is being friendly and kind." },
      { text: "Correct choices light up with a happy response." },
      { text: "Incorrect choices get gentle correction and tips." }
    ],
    agent: [
      { text: "Asks reflective questions: 'What do you see this child doing?'" },
      { text: "Provides reasoning: 'Sharing toys is a friendly thing to do.'" },
      { text: "Encourages retry: 'Let’s look again together.'" }
    ]
  },
  {
    id: "5",
    imageUrl: require("../../../assets/images/autismcare/EchoMatch.png"),
    header: "Echo Match",
    subHeaderText: "Practice vocal imitation and pronunciation",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=echo_match',
    points: [
      { text: "The voice agent says a simple word (e.g., 'apple')." },
      { text: "The child repeats the word as closely as possible." },
      { text: "A visual meter shows how closely the child matched the word." },
      { text: "The child gets a star if they reach the green zone." }
    ],
    agent: [
      { text: "Encourages clarity with feedback like 'Almost there! Try to match the p sound.'" },
      { text: "Uses praise: 'Great job matching the word!'" },
      { text: "Adjusts difficulty from single words to short phrases." }
    ]
  },
 
  {
    id: "6",
    imageUrl: require("../../../assets/images/autismcare/MakingLegoTrain.png"),
    header: "Making Lego Train",
    subHeaderText: "Follow multi-step directions to build a Lego train",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=making_lego_train',
    points: [
      { text: "The agent gives a step: 'Put the red block on the blue block.'" },
      { text: "The child follows instructions in sequence." },
      { text: "Each correct step builds the Lego train visually." },
      { text: "Finishing the train earns a celebration animation." }
    ],
    agent: [
      { text: "Gives one step at a time with clear pauses." },
      { text: "Praises effort: 'You followed the step perfectly!'" },
      { text: "Adds challenge: 'Now let’s do three steps in a row!'" }
    ]
  },
  {
    id: "7",
    imageUrl: require("../../../assets/images/autismcare/SequencingChef.png"),
    header: "Sequencing Chef",
    subHeaderText: "Arrange cooking steps in the correct sequence",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=sequencing_chef',
    points: [
      { text: "The agent gives steps: 'First, crack the egg. Then stir.'" },
      { text: "Child drags steps into the correct order." },
      { text: "Correct sequences animate a finished dish." },
      { text: "Wrong sequences reset with encouragement." }
    ],
    agent: [
      { text: "Uses sequence words: 'First, next, then, last.'" },
      { text: "Provides praise: 'You got all the steps in the right order!'" },
      { text: "Supports retrying with hints: 'What comes before we stir?'" }
    ]
  },
  {
    id: "8",
    imageUrl: require("../../../assets/images/autismcare/SocialScriptKaraoke.png"),
    header: "Social Script Karaoke",
    subHeaderText: "Practice speaking and turn-taking with scripted conversations",
    emilyURL: 'https://dasion-guider.com/autismcare?email=wayne@dasion.ai&conversationname=social_script_karaoke',
    points: [
      { text: "Agent reads one line: 'Hi, my name is Sam. What’s yours?'" },
      { text: "Child repeats or responds with their own name." },
      { text: "Visual cues show whose turn it is." },
      { text: "The conversation continues with predictable responses." }
    ],
    agent: [
      { text: "Models clear speech with engaging tone." },
      { text: "Encourages participation: 'Your turn to say hi!'" },
      { text: "Uses reinforcement: 'That was a great introduction!'" }
    ]
  }
];


const ImagesScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const numColumns = 2; // Adjust based on your needs
  const itemWidth = width / numColumns - 10; // Subtract margin/padding if needed

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          width: itemWidth,
        },
      ]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ImageDetails", { data: item })}
    >
      <Image source={item.imageUrl} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        // contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    paddingHorizontal:10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    // padding: 5,
    // marginVertical: 5,
    alignItems: "center",
    // backgroundColor:'red'
    // flex: 1,
    // width: 190,
    // height: 180,
    // // margin: 5,
    // backgroundColor: '#f8f8f8',
    // borderRadius: 8,
    // padding: 5,
    // alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 10,
    borderRadius: 10,
    // backgroundColor:'yellow'
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

ImagesScreen.navigationOptions = navigationOptions();

export default ImagesScreen;
