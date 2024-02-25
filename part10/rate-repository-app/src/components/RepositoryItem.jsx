//src/components/RepositoryItem.jsx
import { View, Text as NativeText, Image, StyleSheet } from "react-native";
import theme from "../theme";
const styles = StyleSheet.create({
  h1: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: theme.fonts.main,
  },
  description: {
    color: "grey",
    fontSize: 14,
    fontFamily: theme.fonts.main,
  },
  languageBg: {
    backgroundColor: "#3b82f6",
    padding: 5,
    borderRadius: 5,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  language: {
    color: "white",
    padding: 5,
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ repository }) => {
  const DataCard = ({ dataType, text }) => {
    const suffix = text > 1000 ? "k" : "";
    const formattedText =
      text > 1000 ? (text / 1000).toFixed(1) + suffix : text;
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NativeText style={styles.h1}>{formattedText}</NativeText>
        <NativeText style={styles.description}>{dataType}</NativeText>
      </View>
    );
  };

  return (
    <View
      id="mainContainer"
      style={{
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <View
        id="imageAndTextContainer"
        style={{
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Image
          style={styles.image}
          source={{ uri: repository.ownerAvatarUrl }}
        />

        <View
          id="textContainer"
          style={{
            flexDirection: "column",
          }}
        >
          <View id="headerContainer">
            <NativeText style={styles.h1}>{repository.fullName}</NativeText>
            <NativeText style={styles.description}>
              {repository.description}
            </NativeText>
          </View>
          <View style={styles.languageBg}>
            <NativeText style={styles.language}>
              {repository.language}
            </NativeText>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <DataCard dataType="Forks" text={repository.forksCount} />
        <DataCard dataType="Stars" text={repository.stargazersCount} />
        <DataCard dataType="Rating" text={repository.ratingAverage} />
        <DataCard dataType="Reviews" text={repository.reviewCount} />
      </View>
    </View>
  );
};

export default RepositoryItem;
