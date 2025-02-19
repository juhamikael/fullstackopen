import { Review } from "@/types";
import { View, Text, StyleSheet, Alert } from "react-native";
import { formatDate } from "@/utils/lib";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "@/graphql/mutations";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    buttonEdit: {
        backgroundColor: '#007aff',
    },
    buttonDelete: {
        backgroundColor: '#ff0000',
    },
    reviewsSection: {
        marginTop: 16,
    },
    reviewTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        marginHorizontal: 16,
    },
    review: {
        backgroundColor: 'white',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    reviewHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    ratingCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#007aff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    ratingText: {
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
    },
    reviewInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    reviewText: {
        fontSize: 15,
        lineHeight: 20,
        color: '#333',
    },
});




const MyReviewItem = ({ review }: { review: Review }) => {
    const navigate = useNavigate();
    const [deleteReview] = useMutation(DELETE_REVIEW);
    const apolloClient = useApolloClient();
    const handleDeleteReview = async () => {
        await deleteReview({ variables: { id: review.id } });
        apolloClient.resetStore();
    }

    return (
        <View style={styles.review}>
            <View style={styles.reviewHeader}>
                <View style={styles.ratingCircle}>
                    <Text style={styles.ratingText}>{review.rating}</Text>
                </View>
                <View style={styles.reviewInfo}>
                    <Text style={styles.username}>{review.repository?.fullName}</Text>
                    <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
                </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.buttonEdit}
                    mode="contained"
                    textColor="white"
                    onPress={() => {
                        navigate(`/repository/${review.repository?.id}`);
                    }}>
                    View Repository
                </Button>
                <Button
                    style={styles.buttonDelete}
                    mode="contained"
                    textColor="white"
                    onPress={() => {
                        Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Delete', style: 'destructive', onPress: handleDeleteReview },
                        ]);
                    }}>
                    Delete Review
                </Button>
            </View>
        </View>
    );
};

export default MyReviewItem;