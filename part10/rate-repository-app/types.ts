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


export type { RepositoryNode, RepositoryEdge, RepositoryConnection };