import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import React from 'react';
import Main from 'routes/main';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createApolloClient from './utils/apolloClient';
import AuthStorage from './utils/AuthStorage';
import AuthStorageContext from './contexts/AuthStorageContext';
import { PaperProvider } from 'react-native-paper';

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={client}>
          <AuthStorageContext.Provider value={authStorage}>
            <PaperProvider>
              <Main />
            </PaperProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}

