import { StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import RepositoryList from "../components/RepositoryList";
import { StatusBar } from 'expo-status-bar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignInRoute from "./sign-in";
import { defaultStyles } from "../theme";

const Main = () => {
    return (
        <View style={defaultStyles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/sign-in" element={<SignInRoute />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
