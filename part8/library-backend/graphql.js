const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const Books = require("./models/books");
const Authors = require("./models/authors");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
    type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }
    type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
    }
    type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre:String): [Book!]!
      allAuthors: [Author!]!
      allGenres: [String!]!
      me: User
    }
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Token {
      value: String!
    }
    type Mutation {
      addBook(
        title: String!
        author: ID!
        published: Int!
        genres: [String!]!
      ): Book!
      
      addAuthor(
          name: String!
          born: Int
          bookCount: Int
      ): Author
      editAuthor(name: String!, setBornTo: Int): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
    }

  `;

const resolvers = {
  Query: {
    bookCount: async () => await Books.collection.countDocuments(),
    authorCount: async () => await Authors.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        console.log("args.genre", args.genre);
        return await Books.find({ genres: { $in: [args.genre] } });
      }
      return await Books.find({});
    },
    allGenres: async () => {
      const books = await Books.find({});
      const genres = books.map((book) => book.genres);
      const flattenedGenres = genres.flat();
      const uniqueGenres = [...new Set(flattenedGenres)];
      return uniqueGenres;
    },
    allAuthors: async () => await Authors.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    name: (root) => root.name,
    id: (root) => root._id,
    born: (root) => root.born,
    bookCount: async (root) => {
      return await Books.countDocuments({ author: root._id });
    },
  },

  Book: {
    author: async (book) => {
      if (!book.author) {
        console.log("Book does not have an author ID:", book);
        return null;
      }

      try {
        const author = await Authors.findById(book.author);
        if (!author) {
          console.log("Author not found for book", book);
          return null;
        }
        return author;
      } catch (error) {
        console.error("Error fetching author for book:", book, error);
        return null;
      }
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        const existingUser = await User.findOne({ username: args.username });
        if (existingUser) {
          throw new GraphQLError("Username must be unique", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.username,
            },
          });
        }

        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      console.log("userForToken", userForToken);

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      const book = new Books({ ...args });

      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          code: "UNAUTHENTICATED",
        });
      }

      if (args.title.length < 3) {
        throw new GraphQLError("Title must be at least 3 characters long", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }
      if (args.published < 0) {
        throw new GraphQLError("Published must be a positive number", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }
      if (args.genres.length < 1) {
        throw new GraphQLError("Book must have at least one genre", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      try {
        await book.save();
        return book;
      } catch (error) {
        console.log("error", error);
        throw new GraphQLError("Saving book failed", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
          error: error.message,
        });
      }
    },
    addAuthor: (root, args) => {
      const author = new Authors({ ...args });
      if (args.name.length < 4) {
        throw new GraphQLError("Name must be at least 4 characters long", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      if (authors.find((author) => author.name === args.name)) {
        throw new GraphQLError("Name must be unique", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      if (args.born < 0) {
        throw new GraphQLError("Born must be a positive number", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      if (args.bookCount < 0) {
        throw new GraphQLError("Book count must be a positive number", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      try {
        author.save();
        return author;
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
          error: error.message,
        });
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          code: "UNAUTHENTICATED",
        });
      }
      const author = await Authors.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      if (args.setBornTo < 0) {
        throw new GraphQLError("Born must be a positive number", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      if (args.name.length < 4) {
        throw new GraphQLError("Name must be at least 4 characters long", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      if (args.bookCount < 0) {
        throw new GraphQLError("Book count must be a positive number", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
        });
      }

      try {
        const updatedAuthor = await Authors.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo, name: args.name, bookCount: args.bookCount },
          { new: true }
        );
        return updatedAuthor;
      } catch (error) {
        throw new GraphQLError("Updating author failed", {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(args),
          error: error.message,
        });
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
