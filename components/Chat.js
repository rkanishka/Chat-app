import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text, Image } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
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
              image: doc.data().image || null,
              location: doc.data().location || null, // Add the location property
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

  const renderCustomActions = (props) => {
    return <CustomActions {...props} storage={storage} userID={userId} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 200, height: 200, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    if (currentMessage.image) {
      return (
        <View style={{ borderRadius: 15, padding: 5 }}>
          <Image
            source={{ uri: currentMessage.image }}
            style={{ width: 200, height: 200, resizeMode: 'cover', borderRadius: 10 }}
          />
        </View>
      );
    }
    return null;
  };

  const renderBubble = (props) => {
    const { currentMessage } = props;
    const { user } = currentMessage;
    const bubbleColor = getUserBubbleColor(user.name);

    if (currentMessage.image) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: { backgroundColor: 'transparent' },
            right: { backgroundColor: 'transparent' },
          }}
        />
      );
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { backgroundColor: bubbleColor },
          right: { backgroundColor: bubbleColor },
        }}
        timeTextStyle={{
          right: { color: 'red' },
        }}
      />
    );
  };

  // Helper function to get the bubble color based on the user's name
  const getUserBubbleColor = (userName) => {
    switch (userName) {
      case 'John':
        return 'blue';
      case 'Jane':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          onSend={(messages) => onSend(messages)}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          renderMessageImage={renderMessageImage}
          user={{
            _id: userId,
            name: name,
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
  noConnectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Chat;