import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import AuthStorage from './AuthStorage';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: Constants.expoConfig?.extra?.apolloUri,
});

const createApolloClient = (authStorage: AuthStorage) => {
    const authLink = setContext(async (_, { headers }) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        return {
          headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        };
      } catch (e) {
        console.log(e);
        return {
          headers,
        };
      }
    });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };


export default createApolloClient;