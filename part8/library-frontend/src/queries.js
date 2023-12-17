import { gql } from "@apollo/client";
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      id
      author {
        name
        born
        id
      }
      published
      genres
    }
  }
`;

export const ALL_GENRES = gql`
  query Query {
    allGenres
  }
`;

export const PERSONAL_INFO = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: ID!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        id
      }
      id
      published
      genres
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation addAuthor($name: String!, $bookCount: Int!) {
    addAuthor(name: $name, bookCount: $bookCount) {
      name
      id
      bookCount
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
