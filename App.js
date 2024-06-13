
/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
        {props => <Chat db={db} storage={storage} isConnected={connectionStatus.isConnected} {...props}/>}
                </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });*/import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});