import { View } from "react-native";
import AppBar from "@/components/AppBar";
import RepositoryList from "@/components/RepositoryList";
import { Route, Routes, Navigate } from 'react-router-native';
import SignInRoute from "./sign-in";
import { defaultStyles } from "@/theme";
import Repository from "@/components/Repository";
import ReviewForm from "@/components/ReviewForm";
import MyReviews from "@/components/MyReviews";

const Main = () => {
    return (
        <View style={defaultStyles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/sign-in" element={<SignInRoute />} />
                <Route path="/repository/:id" element={<Repository />} />
                <Route path="/review" element={<ReviewForm />} />
                <Route path="/my-reviews" element={<MyReviews />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
