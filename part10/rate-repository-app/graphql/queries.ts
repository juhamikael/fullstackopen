import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    createdAt
  }
`;

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_MY_INFO = gql`  
  query {
    me {
      id
      username
    }
  }
`;


export const GET_ALL_USERS = gql`
  query {
    users {
      edges {
        node {
          username
        }
      }
    }
}
`;


export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;

export const GET_REPOSITORY_WITH_REVIEWS = gql`
  query($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetails 
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`;


export const GET_REVIEWS_BY_USER = gql`
  query GetMyReviews {
    me {
      id
      username
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES_BY_SEARCH = gql`
  query($searchKeyword: String!) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;
