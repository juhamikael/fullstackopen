import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView as View } from "react-native";
import RepositoryList from "./src/components/RepositoryList";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RepositoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
