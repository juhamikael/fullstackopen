import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import React from 'react';
import Main from './routes/main';

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}

