import { useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CELL_MODELS } from '@/api/mock-data/cell-models';
import ModelView from '@/components/model-view';
import ARView from '@/components/ar-view';

export default function ModelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const model = CELL_MODELS.find((item) => String(item.id) === id);
  const [mode, setMode] = useState<'3D' | 'AR'>('3D');
  return <SafeAreaView style={styles.screen} edges={['top']}>
    <Link href="/library" style={styles.back}>← Model Library</Link>
    {!model?.modelUrl ? <Text style={styles.title}>Model not found.</Text> : <>
      <Text style={styles.title}>{model.name}</Text>
      <Text style={styles.description}>{model.description}</Text>
      <View style={styles.tabs} accessibilityRole="tablist">
        {(['3D', 'AR'] as const).map((tab) => <Pressable key={tab} accessibilityRole="tab" accessibilityState={{ selected: mode === tab }} onPress={() => setMode(tab)} style={[styles.tab, mode === tab && styles.selected]}>
          <Text style={styles.tabText}>{tab}</Text>
        </Pressable>)}
      </View>
      <Text style={styles.hint}>{mode === '3D' ? (Platform.OS === 'web' ? 'Drag to rotate · Scroll or pinch to zoom' : 'Use the controls to rotate and zoom') : 'Preview: all cells currently use the same AR scene.'}</Text>
      <View style={styles.viewer}>
        {mode === '3D' ? <ModelView key={model.id} model={model.modelUrl} /> : Platform.OS === 'web' ? <View style={styles.message}><Text style={styles.tabText}>AR is available in the phone app.</Text><Text style={styles.description}>Use the 3D tab to explore this cell in your browser.</Text></View> : <ARView />}
      </View>
    </>}
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b0a3d', padding: 16 },
  back: { color: '#89c9ff', paddingVertical: 12 },
  title: { color: 'white', fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  description: { color: '#a3b9db', fontSize: 15, lineHeight: 22 },
  tabs: { flexDirection: 'row', backgroundColor: '#15134f', borderRadius: 12, padding: 4, marginTop: 16, alignSelf: 'flex-start' },
  tab: { paddingVertical: 12, paddingHorizontal: 32, borderRadius: 9 },
  selected: { backgroundColor: '#376b88' },
  tabText: { color: 'white', fontSize: 16, fontWeight: '600' },
  hint: { color: '#a3b9db', fontSize: 13, marginVertical: 12 },
  viewer: { flex: 1, minHeight: 260, backgroundColor: '#15134f', borderRadius: 16, overflow: 'hidden' },
  message: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
});
