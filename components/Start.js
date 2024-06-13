import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../images/Image.png';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#090C08');

  const auth = getAuth();

  const colors = {
    black: '#090C08',
    purple: '#474056',
    grey: '#8A95A5',
    green: '#B9C6AE',
  };

  const handleSignInAnonymously = () => {
    signInAnonymously(auth)
      .then((result) => {
        if (result.user) {
          navigation.navigate('Chat', {
            userId: result.user.uid,
            name,
            backgroundColor,
          });
        } else {
          Alert.alert('Sign In Error', 'Unable to sign in anonymously.');
        }
      })
      .catch((error) => {
        console.error('Error signing in anonymously:', error);
        Alert.alert('Sign In Error', 'Unable to sign in, try later again.');
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Set Your Nickname</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
        />
        <View style={styles.colorContainer}>
          {Object.keys(colors).map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorCircle, { backgroundColor: colors[color] }]}
              onPress={() => setBackgroundColor(colors[color])}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignInAnonymously}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Start;