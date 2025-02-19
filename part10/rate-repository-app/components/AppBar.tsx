import { View, StyleSheet, Text, ScrollView, Pressable, Modal } from 'react-native';
import Constants from 'expo-constants';
import { theme } from '../theme';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '@/hooks/useAuthStorage';
import useMe from '@/hooks/useMe';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

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
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuModal: {
        position: 'absolute',
        right: 10,
        top: 80,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuText: {
        marginLeft: 10,
        color: theme.colors.primary,
        fontSize: 16,
    }
});

const AppBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { me } = useMe();
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signOut = async () => {
        await authStorage?.removeAccessToken();
        apolloClient.resetStore();
        setMenuVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {me ? (
                    <>
                        <Pressable
                            onPress={() => setMenuVisible(!menuVisible)}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginRight: 10,
                                padding: 10,
                                borderRadius: 20,
                            }}
                        >
                            <Feather name="menu" size={24} color="white" />
                        </Pressable>
                        <Modal
                            visible={menuVisible}
                            transparent={true}
                            animationType="fade"
                            onRequestClose={() => setMenuVisible(false)}
                        >
                            <Pressable
                                style={{ flex: 1 }}
                                onPress={() => setMenuVisible(false)}
                            >
                                <View style={styles.menuModal}>
                                    <Pressable
                                        style={styles.menuItem}
                                        onPress={signOut}
                                    >
                                        <Ionicons name="log-out" size={20} color={theme.colors.primary} />
                                        <Text style={styles.menuText}>Sign out</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        </Modal>
                    </>
                ) : (
                    <Link to="/sign-in">
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginRight: 10,
                            padding: 10,
                            borderRadius: 20,
                        }}>
                            <Ionicons name="log-in" size={24} color="white" />
                        </View>
                    </Link>
                )}
                <Link to="/">
                    <View>
                        <Text style={styles.text}>Repositories</Text>
                    </View>
                </Link>
                <Link to="/review">
                    <View>
                        <Text style={styles.text}>Create Review</Text>
                    </View>
                </Link>
                <Link to="/my-reviews">
                    <View>
                        <Text style={styles.text}>My Reviews</Text>
                    </View>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;