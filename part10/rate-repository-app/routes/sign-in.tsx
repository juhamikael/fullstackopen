import { View } from "react-native";
import SignIn from "../components/SignIn";

const SignInRoute = () => {
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <SignIn />
        </View>
    );
};

export default SignInRoute;