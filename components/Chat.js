
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, backgroundColor, userId } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (isConnected) {
          const messagesRef = collection(db, 'messages');
          const q = query(messagesRef, orderBy('createdAt', 'desc'));

          const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
              _id: doc.id,
              text: doc.data().text,
              createdAt: doc.data().createdAt.toDate(),
              user: doc.data().user,
            }));

            setMessages(messagesData);
            AsyncStorage.setItem('messages', JSON.stringify(messagesData));
          });

          return () => unsubscribe();
        } else {
          const cachedMessages = await AsyncStorage.getItem('messages');
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          }
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [db, isConnected]);

  const onSend = (newMessages) => {
    if (isConnected) {
      addDoc(collection(db, 'messages'), newMessages[0]);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    }
    return null;
  };

  // Check if there's no internet connection
  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.noConnectionText}>No internet connection</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: userId,
            name: name,
          }}
          renderInputToolbar={renderInputToolbar}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noConnectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Chat;