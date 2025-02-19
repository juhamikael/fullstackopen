import { GET_REPOSITORY_WITH_REVIEWS } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { Repository, ReviewEdge } from '@/types';

interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
}

interface SingleRepositoryData {
    repository: Repository & {
        reviews: {
            edges: (ReviewEdge & { cursor: string })[];
            pageInfo: PageInfo;
        };
    };
}

const useRepository = (repositoryId: string) => {
    const { data, error, loading, fetchMore } = useQuery<SingleRepositoryData>(GET_REPOSITORY_WITH_REVIEWS, {
        variables: { 
            repositoryId,
            first: 5
        },
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
        
        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                first: 5
            },
        });
    };

    return { 
        repository: data?.repository,
        loading, 
        error,
        reviews: data?.repository?.reviews?.edges || [],
        fetchMore: handleFetchMore,
        hasNextPage: data?.repository.reviews.pageInfo.hasNextPage
    };
};

export default useRepository;
