import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCellModels } from '@/api';
import { CellModel } from '@/api/types';

// Colors match the login screen (index.tsx) so the app feels like one product.
const COLORS = {
  background: '#0b0a3d',
  card: '#15134f',
  cardBorder: '#26236e',
  text: '#ffffff',
  textSecondary: '#749bdb',
  accent: '#579fbb',
};

// One color per kind of cell, like the Model Library mockup in the design doc.
const TYPE_COLORS: Record<CellModel['modelType'], string> = {
  animal: '#3b82f6',
  plant: '#10b981',
  bacteria: '#d97706',
  specialized: '#8b5cf6',
};

type Filter = 'all' | CellModel['modelType'];

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Models' },
  { value: 'animal', label: 'Animal' },
  { value: 'plant', label: 'Plant' },
  { value: 'bacteria', label: 'Bacteria' },
  { value: 'specialized', label: 'Specialized' },
];

export default function ModelLibraryScreen() {
  const [models, setModels] = useState<CellModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const { width } = useWindowDimensions();
  const columns = width >= 600 ? 2 : 1; // 2 columns on tablets, 1 on phones

  useEffect(() => {
    getCellModels()
      .then(setModels)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const shown = filter === 'all' ? models : models.filter((m) => m.modelType === filter);

  const openModel = (model: CellModel) => {
    if (model.locked) return;
    router.push({ pathname: '/model', params: { id: String(model.id) } });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Text style={styles.title} accessibilityRole="header">
        Model Library
      </Text>

      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const selected = f.value === filter;
          return (
            <Pressable
              key={f.value}
              onPress={() => setFilter(f.value)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {loading ? (
        <ActivityIndicator color={COLORS.accent} style={styles.center} />
      ) : error ? (
        <Text style={[styles.message, styles.center]}>Couldn't load the cells. {error}</Text>
      ) : (
        <FlatList
          key={columns} // FlatList needs a new key when the column count changes
          data={shown}
          numColumns={columns}
          keyExtractor={(m) => String(m.id)}
          contentContainerStyle={styles.list}
          columnWrapperStyle={columns > 1 ? styles.row : undefined}
          ListEmptyComponent={<Text style={styles.message}>No cells in this group yet.</Text>}
          renderItem={({ item }) => (
            <ModelCard model={item} onPress={() => openModel(item)} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function ModelCard({ model, onPress }: { model: CellModel; onPress: () => void }) {
  const color = TYPE_COLORS[model.modelType];
  return (
    <Pressable
      onPress={onPress}
      disabled={model.locked}
      accessibilityRole="button"
      accessibilityLabel={
        model.locked
          ? `${model.name}, locked`
          : `${model.name}, ${model.level}, 3D and AR views`
      }
      style={({ pressed }) => [styles.card, model.locked && styles.cardLocked, pressed && styles.pressed]}>
      <View style={[styles.preview, { backgroundColor: model.locked ? '#1b1a52' : color + '33' }]}>
        {model.locked ? (
          <Text style={styles.lockText}>Locked</Text>
        ) : (
          // Simple cell drawing until real thumbnails exist
          <View style={[styles.cell, { borderColor: color }]}>
            <View style={[styles.nucleus, { backgroundColor: color }]} />
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: model.locked ? COLORS.textSecondary : color }]}>
          {model.name}
        </Text>
        {model.locked ? (
          <Text style={styles.cardMeta}>Finish the Animal Cell to unlock</Text>
        ) : (
          <View style={styles.metaRow}>
            <Text style={[styles.badge, { color, borderColor: color }]}>{model.level}</Text>
            <Text style={styles.cardMeta}>3D + AR</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  title: { color: COLORS.text, fontSize: 30, fontWeight: 'bold', marginTop: 12, marginBottom: 16 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minHeight: 44, // big enough to tap easily
    justifyContent: 'center',
  },
  chipSelected: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { color: COLORS.textSecondary, fontWeight: '600' },
  chipTextSelected: { color: COLORS.background },
  list: { paddingBottom: 120, gap: 16 },
  row: { gap: 16 },
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  cardLocked: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
  preview: { height: 140, alignItems: 'center', justifyContent: 'center' },
  cell: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nucleus: { width: 28, height: 28, borderRadius: 14 },
  lockText: { color: COLORS.textSecondary, fontWeight: 'bold', fontSize: 16 },
  cardBody: { padding: 14, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  cardMeta: { color: COLORS.textSecondary, fontSize: 13 },
  message: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 24 },
  center: { marginTop: 40 },
});
