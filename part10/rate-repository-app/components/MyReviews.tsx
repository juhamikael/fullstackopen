import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS_BY_USER } from "@/graphql/queries";
import MyReviewItem from "./ReviewItem";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        padding: 16
    },
    reviewItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e4e8',
    },
    repositoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    rating: {
        fontSize: 16,
        color: '#0366d6',
        marginBottom: 8
    },
    reviewText: {
        fontSize: 16,
        color: '#24292e'
    },
    date: {
        fontSize: 14,
        color: '#586069',
        marginTop: 8
    }
});

const MyReviews = () => {
    const { data, loading, error } = useQuery(GET_REVIEWS_BY_USER);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const reviews = data?.me?.reviews?.edges.map((edge: any) => edge.node) || [];

    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <MyReviewItem review={item} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>No reviews yet</Text>}
            />
        </View>
    );
};

export default MyReviews;