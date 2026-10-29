import { StyleSheet, View } from 'react-native';
import { StudioSceneNavigator } from '@reactvision/react-viro';

// Phone version: full AR with ViroReact.
// The browser uses ar-view.web.tsx instead, so ViroReact never loads on the web.
export default function ARView() {
  return (
    <View style={styles.container}>
      <StudioSceneNavigator
        autofocus
        sceneId="877e0989-706e-49be-99c7-e17073f20c18"
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
