import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_UP, SIGN_IN } from "../graphql/mutations";
import useAuthStorage from '@/hooks/useAuthStorage';
import { useNavigate } from "react-router-native";

const useSignUp = () => {
    const authStorage = useAuthStorage();
    const [mutateSignUp, signUpResult] = useMutation(SIGN_UP);
    const [mutateSignIn] = useMutation(SIGN_IN);
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const signUp = async ({ username, password }: { username: string, password: string }) => {
        try {
            const { data: signUpData } = await mutateSignUp({ 
                variables: { username, password } 
            });
            
            if (!signUpData.createUser) {
                throw new Error("Error creating user");
            }

            const { data: signInData } = await mutateSignIn({ 
                variables: { username, password } 
            });

            if (signInData.authenticate.accessToken) {
                await authStorage?.setAccessToken(signInData.authenticate.accessToken);
                apolloClient.resetStore();
                navigate('/');
            } else {
                throw new Error("Error signing in after creation");
            }
        } catch (error) {
            console.error("Error in sign up process:", error);
            throw error;
        }
    };

    return [signUp, signUpResult] as const;
};

export default useSignUp;