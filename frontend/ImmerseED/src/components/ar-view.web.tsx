import { Text, View } from 'react-native';

// Browser version: ViroReact only runs in the phone app.
export default function ARView() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AR view runs in the phone app.</Text>
    </View>
  );
}
