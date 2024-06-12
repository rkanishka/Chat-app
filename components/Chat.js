/*import React from 'react';
// ...

const Chat = () => {
  // ...
};

export default Chat;*/
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Add your chat screen components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
