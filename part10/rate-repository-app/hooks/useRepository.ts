import { GET_REPOSITORY_WITH_REVIEWS } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { ReviewEdge } from '@/types';



const useRepository = (id: string) => {
    const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY_WITH_REVIEWS, {
        variables: {
            repositoryId: id,
            first: 2,
        },
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) {
            return;
        }

        await fetchMore({
            variables: {
                repositoryId: id,
                first: 2,
                after: data.repository.reviews.pageInfo.endCursor,
            },
        });
    };

    const reviews = data?.repository?.reviews?.edges || [];
    const uniqueReviews = reviews.filter((review: ReviewEdge & { cursor: string }, index: number, self: (ReviewEdge & { cursor: string })[]) => 
        index === self.findIndex((r: ReviewEdge & { cursor: string }) => r.node.id === review.node.id)
    );

    return {
        repository: data?.repository,
        reviews: uniqueReviews,
        loading,
        error,
        fetchMore: handleFetchMore,
        hasNextPage: data?.repository?.reviews?.pageInfo?.hasNextPage,
    };
};

export default useRepository;
