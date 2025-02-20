import useRepository from "@/hooks/useRepository";
import { formattedStats } from "@/utils/lib";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, FlatList } from "react-native";
import { useParams } from "react-router-native";
import { useState } from 'react';
import { Review } from "@/types";
import { formatDate } from "@/utils/lib";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
    },
    contentContainer: {
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e4e8',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        overflow: 'hidden',
    },
    header: {
        padding: 16,
        paddingBottom: 0,
    },
    headerText: {
        flex: 1,
        marginLeft: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    repoName: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 17,
        color: '#666',
        marginBottom: 12,
    },
    language: {
        backgroundColor: '#007aff',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
    languageText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    stats: {
        marginTop: 16,
    },
    stat: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e4e8',
    },
    statLeft: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '600',
        marginRight: 8,
    },
    statLabel: {
        fontSize: 20,
        color: '#666',
    },
    button: {
        backgroundColor: '#007aff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
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
    separator: {
        height: 8,
    }
});



const ReviewItem = ({ review }: { review: Review }) => (
    <View style={styles.review}>
        <View style={styles.reviewHeader}>
            <View style={styles.ratingCircle}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfo}>
                <Text style={styles.username}>{review.user.username}</Text>
                <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
            </View>
        </View>
        <Text style={styles.reviewText}>{review.text}</Text>
    </View>
);

const Repository = () => {
    const { id } = useParams();
    const { repository, loading, error, reviews, fetchMore, hasNextPage } = useRepository(id as string);
    const [isOpeningGithub, setIsOpeningGithub] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    if (loading) return <Text style={styles.title}>Loading...</Text>;
    if (error) return <Text style={styles.title}>Error: {error.message}</Text>;
    if (!repository) return <Text style={styles.title}>Repository not found</Text>;

    const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } = repository;

    const handleOpenGithub = async () => {
        setIsOpeningGithub(true);
        try {
            await Linking.openURL(`https://github.com/${fullName}`);
        } finally {
            setIsOpeningGithub(false);
        }
    };

    const onEndReach = async () => {
        if (loadingMore || !hasNextPage) return;
        
        setLoadingMore(true);
        try {
            await fetchMore();
        } catch (error) {
            console.error('Error loading more reviews:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    const renderHeader = () => (
        <>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image source={{ uri: ownerAvatarUrl || "" }} style={styles.avatar} />
                    <View style={styles.headerText}>
                        <Text style={styles.repoName} numberOfLines={1}>{fullName}</Text>
                        <Text style={styles.description} numberOfLines={2}>{description}</Text>
                        <View style={styles.language}>
                            <Text style={styles.languageText}>{language}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <View style={styles.statLeft}>
                            <Text style={styles.statNumber}>{formattedStats(stargazersCount)}</Text>
                            <Text style={styles.statLabel}>Stars</Text>
                        </View>
                    </View>
                    <View style={styles.stat}>
                        <View style={styles.statLeft}>
                            <Text style={styles.statNumber}>{formattedStats(forksCount)}</Text>
                            <Text style={styles.statLabel}>Forks</Text>
                        </View>
                    </View>
                    <View style={styles.stat}>
                        <View style={styles.statLeft}>
                            <Text style={styles.statNumber}>{formattedStats(reviewCount)}</Text>
                            <Text style={styles.statLabel}>Reviews</Text>
                        </View>
                    </View>
                    <View style={styles.stat}>
                        <View style={styles.statLeft}>
                            <Text style={styles.statNumber}>{formattedStats(ratingAverage)}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleOpenGithub}
                    disabled={isOpeningGithub}
                >
                    <Text style={styles.buttonText}>
                        {isOpeningGithub ? 'Opening...' : 'Open in GitHub'}
                    </Text>
                </TouchableOpacity>
            </View>

            {reviews.length > 0 && (
                <Text style={styles.reviewTitle}>Reviews</Text>
            )}
        </>
    );

    const renderFooter = () => {
        if (loadingMore) {
            return (
                <View style={{ padding: 16 }}>
                    <Text style={{ textAlign: 'center' }}>Loading more reviews...</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item.node} />}
            keyExtractor={(item, index) => `${item.node.id}-${index}`}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default Repository;