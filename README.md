A messaging app built with React Native for mobile devices, allowing users to exchange messages, share images, send their location, and access existing messages offline. The app is theme-customizable and works on both iOS and Android devices, utilizing Google Firestore/Firebase for storing messages and images. Guest authentication is handled via Google Firebase authentication.
Technologies Used
React Native
Expo
Expo ImagePicker
Expo Location
Google Firestore/Firebase
Gifted Chat Library
Android Studio
Dependencies
@react-navigation/native@^6.1.17
@react-navigation/native-stack@^6.9.26
expo@~50.0.13
expo-status-bar@~1.11.1
firebase@^10.3.1
react@18.2.0
react-native@0.73.5
react-native-gifted-chat@^2.4.0
react-native-safe-area-context@4.8.2
react-native-screens@~3.29.0
@react-native-async-storage/async-storage@1.21.0
@react-native-community/netinfo@11.1.0
expo-image-picker@~14.7.1
expo-location@~16.5.5
react-native-maps@1.10.0
Project Setup
Prerequisites
Use Node.js version 16
nvm install 16.19.0
nvm use 16.19.0
nvm alias default 16.19.0
Google Firestore/Firebase
Create an account and a new project.
Obtain the configuration code and add it to App.js.
Set up the database under build --> Firestore Database.
Activate storage.
Change rules to allow read, write: if true for both database and storage.
Activate anonymous authentication.
Installation
Clone the repository: git clone https://github.com/Eliaslichi96/chat-app
Navigate to the project directory.
Install dependencies: npm install
Start the Expo project: npx expo start
Testing Options
Download and connect the Expo app on your mobile device.
Use Android Studio (for Android).
Use Xcode (for iOS).
