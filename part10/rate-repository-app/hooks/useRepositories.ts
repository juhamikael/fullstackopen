import { GET_REPOSITORIES } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { RepositoryNode } from '@/types';

export interface RepositoryEdge {
    node: RepositoryNode;
}

export interface RepositoryConnection {
    edges: RepositoryEdge[];
}

interface UseRepositoriesParams {
    orderBy?: 'CREATED_AT' | 'RATING_AVERAGE';
    orderDirection?: 'ASC' | 'DESC';
    searchKeyword?: string;
}

const useRepositories = ({ orderBy = 'CREATED_AT', orderDirection = 'DESC', searchKeyword = "" }: UseRepositoriesParams = {}) => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        variables: {
            orderBy,
            orderDirection,
            searchKeyword,
        },
        fetchPolicy: 'cache-and-network',
    });

    return { repositories: data?.repositories, loading, error };
};

export default useRepositories;
