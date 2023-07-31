import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

const MultiSelectInput = ({ data, syncSelectedItems }) => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleItemPress = (item) => {
    let newSelectedItems = [];

    setSelectedItems((prevSelected) => {
      const doesItemExists = prevSelected.some(
        (currItem) => currItem.id == item.id
      );

      if (doesItemExists)
        newSelectedItems = prevSelected.filter(
          (selected) => selected.id !== item.id
        );
      else newSelectedItems = [...prevSelected, item];

      return newSelectedItems;
    });

    syncSelectedItems(newSelectedItems);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.some((currItem) => currItem.id == item.id);

    return (
      <TouchableOpacity
        style={[
          styles.pill,
          isSelected && styles.selectedPill,
          { backgroundColor: isSelected ? "#0098C6" : "#fff" },
        ]}
        onPress={() => handleItemPress(item)}
      >
        <Image
          source={item.image}
          style={[styles.pillImage, isSelected && { tintColor: "#fff" }]}
        />
        <Text
          style={[styles.pillText, { color: isSelected ? "#fff" : "#000" }]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.pillsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  pillsContainer: {
    paddingTop: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0098C6",
    margin: 4,
  },
  selectedPill: {
    backgroundColor: "#007BFF",
  },
  pillImage: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  pillText: {
    fontSize: 14,
  },
});

export default MultiSelectInput;
