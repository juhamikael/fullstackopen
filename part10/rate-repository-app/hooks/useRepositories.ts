import { GET_REPOSITORIES } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { RepositoryNode } from '@/types';

export interface RepositoryEdge {
    node: RepositoryNode;
}

export interface RepositoryConnection {
    edges: RepositoryEdge[];
}

const useRepositories = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES);
    return { repositories: data?.repositories, loading, error };
};

export default useRepositories;
