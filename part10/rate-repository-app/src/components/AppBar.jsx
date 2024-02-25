//src/components/AppBar.jsx
import { View, StyleSheet, Text as NativeText, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#0f0f0f",
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    fontFamily: theme.fonts.main,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <NativeText style={styles.text}>Repositories</NativeText>
        </Link>
        <Link to="/sign-in">
          <NativeText style={styles.text}>Sign In</NativeText>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
