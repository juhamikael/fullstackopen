import { StyleSheet, Platform } from "react-native";

export const theme = {
    colors: {
        primary: '#24292e',
        secondary: '#586069',
        white: '#ffffff',
    },
    typography: {
        fontSize: {
            small: 12,
            body: 16,
            large: 20,
        },
        fontWeight: {
            regular: 'normal',
            bold: 'bold'
        },
        fontFamily: {
            main: Platform.OS === "ios" ? "Roboto" : (Platform.OS === "android" ? "Arial" : "System")
        }
    },
    spacing: {
        tiny: 4,
        small: 8,
        medium: 16,
        large: 24,
    },
    layout: {
        appBar: {
            height: 100,
        }
    },
    components: {
        appBar: {
            backgroundColor: '#24292e',
            text: {
                color: '#ffffff',
                fontSize: 20,
                padding: 10,
                paddingLeft: 20,
            }
        },
    }
};

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});