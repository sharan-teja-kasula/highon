import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useRoute, CommonActions } from "@react-navigation/native";

import IconButton from "../components/IconButton";
import TextButton from "../components/TextButton";
import SelectorInput from "../components/SelectorInput";
import MultiSelectInput from "../components/MultiSelectInput";
import Pill from "../components/Pill";

import postApi from "../apis/post";

const windowWidth = Dimensions.get("window").width;

const PostScreen = ({ navigation }) => {
  const route = useRoute();
  const { imageUri, currentAspectRatio, width, height } = route.params;

  const [description, setDescription] = React.useState("");
  const [inputText, setInputText] = React.useState("");

  const [tagItems, setTagItems] = React.useState([]);
  const [location, setLocation] = React.useState("");

  const [vibeItems, setVibeItems] = React.useState([]);
  const [modalFor, setModalFor] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const popScreen = () => {
    navigation.pop();
  };

  const handleDescriptionChange = (inputText) => {
    setDescription(inputText);
  };

  const handleChangeInputText = (inputText) => {
    setInputText(inputText);
  };

  const multiSelectData = [
    {
      id: "1",
      label: "Photography",
      image: require("../../assets/icons/photography.png"),
    },
    {
      id: "2",
      label: "Food vlogs",
      image: require("../../assets/icons/food.png"),
    },
    {
      id: "3",
      label: "Gaming",
      image: require("../../assets/icons/gaming.png"),
    },
  ];

  let imageStyle = null;

  if (currentAspectRatio == 1)
    imageStyle = StyleSheet.compose(styles.image, {
      width: windowWidth / 4.5,
      height: (windowWidth / 4.5 / width) * height,
      overflow: "hidden",
    });
  else if (currentAspectRatio == 2)
    imageStyle = StyleSheet.compose(styles.image, {
      aspectRatio: 4 / 5,
    });
  else
    imageStyle = StyleSheet.compose(styles.image, {
      aspectRatio: 16 / 9,
    });

  const addTag = () => {
    if (inputText.length == 0) {
      ToastAndroid.show("Type text!", ToastAndroid.SHORT);
      return;
    }

    if (modalFor == "tagPeople") {
      setTagItems((prevItems) => [...prevItems, inputText]);
    }
    if (modalFor == "location") {
      setLocation(inputText);
    }
    setModalVisible(!modalVisible);
    setInputText("");
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderPillItem = ({ item, index }) => {
    const handlePillPress = () => {
      const updatedTagItems = [...tagItems];
      updatedTagItems.splice(index, 1);
      setTagItems(updatedTagItems);
    };

    return (
      <Pill
        iconSource={require("../../assets/icons/strike.png")}
        text={item}
        iconWidth={18}
        iconHeight={18}
        onPress={handlePillPress}
      />
    );
  };

  const submitForm = async () => {
    try {
      if (tagItems.length == 0) {
        ToastAndroid.show("Tag atleast one person!", ToastAndroid.SHORT);
        return;
      }

      const imageProps = {
        width,
        height,
        currentAspectRatio,
      };

      const payload = {
        description,
        tagItems,
        location,
        vibeItems,
        imageProps,
      };

      setIsLoading(true);

      const { statusCode, resInfo } = await postApi.addPost(payload, imageUri);

      if (statusCode == 200) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      } else {
        ToastAndroid.show(resInfo.msg, ToastAndroid.SHORT);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    }
  };

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        color="#4285F4"
        style={{ flex: 1, alignSelf: "center" }}
      />
    );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <IconButton
          icon={require("../../assets/icons/back_arrow.png")}
          action={popScreen}
          width={22}
          height={22}
        />
        <TextButton
          text="Post"
          action={submitForm}
          buttonBackgroundColor="#01B2E8"
        />
      </View>
      <View style={styles.postForm}>
        <Image
          source={{ uri: imageUri }}
          resizeMode="contain"
          style={imageStyle}
        />
        <Text style={styles.text}>Descrption</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={handleDescriptionChange}
        />
        <View style={styles.horizontalRule} />
        <View style={styles.selectorInput}>
          <SelectorInput
            icon={require("../../assets/icons/tag.png")}
            text="Tag People"
            action={() => {
              setModalVisible(!modalVisible);
              setModalFor("tagPeople");
            }}
            width={30}
            height={30}
          />
          {tagItems.length > 0 && (
            <View style={styles.pillsContainer}>
              <FlatList
                data={tagItems}
                renderItem={renderPillItem}
                ItemSeparatorComponent={renderSeparator}
                // keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>
        <View style={styles.horizontalRule} />
        <View style={styles.selectorInput}>
          <SelectorInput
            icon={require("../../assets/icons/location.png")}
            text="Location"
            action={() => {
              setModalVisible(!modalVisible);
              setModalFor("location");
            }}
            width={25}
            height={25}
          />
          {location.length > 0 && (
            <Pill
              iconSource={require("../../assets/icons/close.png")}
              text={location}
              iconWidth={25}
              iconHeight={25}
              onPress={() => setLocation("")}
            />
          )}
        </View>

        <View style={styles.horizontalRule} />
        <Text style={styles.vibetagText}>Add your vibetags</Text>
        <MultiSelectInput
          data={multiSelectData}
          syncSelectedItems={setVibeItems}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeIconPosition}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../../assets/icons/close.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Type here"
                style={styles.input}
                placeholderTextColor="#ffffff"
                onChangeText={handleChangeInputText}
                autoFocus={true}
              />
              <TextButton text="Add" action={addTag} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#01BDF6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#ffffff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30,
    alignItems: "center",
  },
  image: {
    height: 100,
    marginBottom: 10,
    borderRadius: 15,
  },
  postForm: {
    marginLeft: 30,
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    color: "#0098C6",
    fontWeight: "500",
  },
  textArea: {
    fontSize: 16,
    textAlignVertical: "top",
    height: 120,
    borderWidth: 2,
    borderColor: "#0098C6",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  horizontalRule: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 2,
    height: 10,
    marginBottom: 5,
  },
  vibetagText: {
    fontSize: 16,
    color: "#7B7B7B",
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "25%",
    borderRadius: 20,
  },
  closeIconPosition: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
  closeIcon: {
    width: 42,
    height: 42,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  pillsContainer: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  separator: {
    width: 8,
  },
});

export default PostScreen;
