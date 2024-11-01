import { useState, useEffect } from 'react';

interface RepositoryNode {
    id: string;
    name: string;
    ownerName: string;
    createdAt: Date | null;
    fullName: string;
    reviewCount: number;
    ratingAverage: number;
    forksCount: number;
    stargazersCount: number;
    description: string | null;
    language: string | null;
    ownerAvatarUrl: string | null;
}

interface RepositoryEdge {
    node: RepositoryNode;
}

interface RepositoryConnection {
    edges: RepositoryEdge[];
}

const useRepositories = () => {
    const [repositories, setRepositories] = useState<RepositoryConnection | null>(null);

    const fetchRepositories = async () => {
        try {
            const response = await fetch('http://192.168.1.167:5000/api/repositories');
            const json: RepositoryConnection = await response.json();
            setRepositories(json);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories };
};

export default useRepositories;