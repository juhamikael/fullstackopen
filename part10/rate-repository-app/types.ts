export interface RepositoryNode {
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

export interface RepositoryEdge {
    node: RepositoryNode;
}

export interface RepositoryConnection {
    edges: RepositoryEdge[];
}

export interface Review {
    id: string;
    text: string;
    rating: number;
    createdAt: string;
    user: {
        id: string;
        username: string;
    };
    repository?: {
        id: string;
        fullName: string;
    };
}

export interface ReviewEdge {
    node: Review;
}

export interface Repository {
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
    reviews: {
        edges: ReviewEdge[];
    };
}

