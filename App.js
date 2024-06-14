
/*import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useNetInfo }from '@react-native-community/netinfo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



// Import your screen components
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();

export default function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyBZh2LOaFgGXPT1VpYsnm5v2J86sansHZU",
    authDomain: "chat-app-78c53.firebaseapp.com",
    projectId: "chat-app-78c53",
    storageBucket: "chat-app-78c53.appspot.com",
    messagingSenderId: "284420096753",
    appId: "1:284420096753:web:93b12b4db80cebf7e79f50"
   
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const connectionStatus = useNetInfo();
 
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props}  />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBZh2LOaFgGXPT1VpYsnm5v2J86sansHZU",
    authDomain: "chat-app-78c53.firebaseapp.com",
    projectId: "chat-app-78c53",
    storageBucket: "chat-app-78c53.appspot.com",
    messagingSenderId: "284420096753",
    appId: "1:284420096753:web:93b12b4db80cebf7e79f50"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected, db]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}