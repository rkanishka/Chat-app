/*import React from 'react';
// ...

const Chat = () => {
  // ...
};

export default Chat;*/
/*import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Add your chat screen components here }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});export default Chat;*/
import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Welcome to the chat, ${name}!`,
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: 'Hello there!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          
        },
      },
    ]);
  }, [name]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => setMessages(GiftedChat.append(messages, newMessages))}
          user={{
            _id: 1,
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;