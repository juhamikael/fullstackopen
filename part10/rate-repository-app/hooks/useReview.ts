import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const createReview = async ({ ownerName, repositoryName, rating, text }: { ownerName: string, repositoryName: string, rating: number, text?: string }) => {
        const { data } = await mutate({
            variables: {
                ownerName,
                repositoryName,
                rating,
                text
            }
        });
        
        try {
            if (data.createReview) {
                apolloClient.resetStore();
                console.log("Review created successfully");
                navigate('/');
            } else {
                throw new Error("Failed to create review");
            }
        } catch (error) {
            console.error("Error creating review", error);
        }
    };

    return [createReview, result] as const;
};

export default useReview;