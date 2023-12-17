/**

query Query {
  allGenres
}

mutation {
    addBook(
      title: "NoSQL Distilled2"
      author: "655ab3e1e2c166bd9e7654ca"
      published: 2012
      genres: ["database", "nosql"]
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

query {
  allBooks(genre: "refactoring") {
    title
    
  }
}


mutation {
  editAuthor(name: "Robert Martin", setBornTo: 1952) {
    name
    born
    bookCount
  }
}



mutation {
  addAuthor(
    name: "Martin Fowler",
  ) {
    name
    id
    born
  }
}



mutation {
  addBook(author: "655aa9580a08b1577b27e054", title:"Testing2", genres:["test1"], published:2020) {
    author {
      name
    }
  id
  title
  }
}

mutation {
  createUser(username: "juha", favoriteGenre: "fantasy") {
    favoriteGenre
    username
  }
}

mutation {
  login(username: "juha", password: "secret") {
    value
  }
}

query Me {
  me {
    username
    id
    favoriteGenre
  }
}

query Query {
  authorCount
  bookCount
}


query AllAuthors {
  allAuthors {
    bookCount
    born
    id
    name
  }
}


query AllAuthors {
  allAuthors {
    bookCount
    born
    id
    name
  }
}





query AllBooks {
  allBooks {
    author {
      id
      name
      born
    }
    id
    published
    title
    genres
    
  }
}

 */
