import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { theme } from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        height: theme.layout.appBar.height,
        backgroundColor: theme.components.appBar.backgroundColor,
        width: "100%",
        flexDirection: "row",
    },
    text: {
        color: theme.components.appBar.text.color,
        fontSize: theme.components.appBar.text.fontSize,
        fontWeight: theme.typography.fontWeight.bold as "bold",
        padding: theme.components.appBar.text.padding,
        paddingLeft: theme.components.appBar.text.paddingLeft,
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.text}>Repositories</Text>
                </Link>
                <Link to="/sign-in">
                    <Text style={styles.text}>Sign in</Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;