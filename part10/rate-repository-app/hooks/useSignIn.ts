import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from '@/hooks/useAuthStorage';
import { useNavigate } from "react-router-native";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGN_IN);
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const signIn = async ({ username, password }: { username: string, password: string }) => {
        const { data } = await mutate({ variables: { username, password } });
        
        try {
            if (data.authenticate.accessToken) {
                await authStorage?.setAccessToken(data.authenticate.accessToken);
                apolloClient.resetStore();
                navigate('/');
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    return [signIn, result] as const;
};

export default useSignIn;