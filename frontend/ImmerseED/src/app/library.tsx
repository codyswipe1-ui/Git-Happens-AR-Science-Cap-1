import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCellModels } from '@/api';
import { CellModel } from '@/api/types';
import ModelCard from '@/components/model-card';
import { colors, fonts, maxContentWidth, radius, size, space } from '@/constants/design';

// 1 column on phones, 2 on tablets and small laptops, 3 on wide screens.
function columnsFor(width: number) {
  if (width >= 1050) return 3;
  if (width >= 700) return 2;
  return 1;
}

export default function ModelLibraryScreen() {
  const [models, setModels] = useState<CellModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();
  const columns = columnsFor(width);
  // Exact card width, so every card in the grid is the same size.
  const contentWidth = Math.min(width, maxContentWidth) - space.lg * 2;
  const cardWidth = (contentWidth - space.sm * (columns - 1)) / columns;

  const load = () => {
    setLoading(true);
    setError(null);
    getCellModels()
      .then(setModels)
      .catch(() => setError('We couldn’t load the models. Check your connection and try again.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter(
      (m) => !q || m.name.toLowerCase().includes(q),
    );
  }, [models, query]);

  // In a grid, fill the last row with empty spacers so a lone card keeps its column width.
  const cells: (CellModel | null)[] = [...shown];
  while (columns > 1 && cells.length % columns !== 0) cells.push(null);

  const openModel = (model: CellModel) => {
    router.push({ pathname: '/model', params: { id: String(model.id) } });
  };

  const header = (
    <View style={styles.header}>
      <Text style={styles.title} accessibilityRole="header">
        Model Library
      </Text>
      <Text style={styles.subtitle}>Explore any cell, any time. Nothing is locked.</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search models"
        placeholderTextColor={colors.textMuted}
        accessibilityLabel="Search models"
        autoCorrect={false}
        style={styles.search}
      />

    </View>
  );

  const empty = loading ? (
    <ActivityIndicator size="large" color={colors.ink} style={{ marginTop: space.xxl }} />
  ) : error ? (
    <View style={styles.message}>
      <Text style={styles.messageTitle}>Something went wrong</Text>
      <Text style={styles.messageBody}>{error}</Text>
      <Pressable onPress={load} accessibilityRole="button" style={({ pressed }) => [styles.retry, pressed && styles.pressed]}>
        <Text style={styles.retryText}>Try again</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.message}>
      <Text style={styles.messageTitle}>{query ? 'No models match your search' : 'No models here yet'}</Text>
      <Text style={styles.messageBody}>
        {query ? 'Try a different name.' : 'New cells show up when they’re added to the library.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FlatList
        key={columns} // FlatList must remount when the column count changes
        data={shown.length ? cells : []}
        numColumns={columns}
        keyExtractor={(m, i) => (m ? String(m.id) : `spacer-${i}`)}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        columnWrapperStyle={columns > 1 ? { gap: space.sm } : undefined}
        ItemSeparatorComponent={() => <View style={{ height: space.sm }} />}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) =>
          item ? (
            <ModelCard model={item} width={cardWidth} onPress={() => openModel(item)} />
          ) : (
            <View style={{ width: cardWidth }} />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: space.lg,
    paddingBottom: space.xxl,
  },
  header: { paddingTop: space.lg, paddingBottom: space.md, gap: space.md },
  title: { fontFamily: fonts.display, fontSize: 32, letterSpacing: -0.6, color: colors.ink },
  subtitle: { fontFamily: fonts.body, fontSize: 15, color: colors.textMuted, marginTop: -space.sm },
  search: {
    height: size.input,
    borderRadius: radius.button,
    backgroundColor: colors.surface,
    paddingHorizontal: space.md,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.ink,
  },
  pressed: { opacity: 0.85 },
  message: {
    backgroundColor: colors.surface,
    borderRadius: radius.row,
    padding: space.xl,
    alignItems: 'center',
    gap: 6,
  },
  messageTitle: { fontFamily: fonts.heading, fontSize: 20, color: colors.ink, textAlign: 'center' },
  messageBody: { fontFamily: fonts.body, fontSize: 15, color: colors.textMuted, textAlign: 'center' },
  retry: {
    marginTop: space.sm,
    minHeight: size.touch,
    paddingHorizontal: space.lg,
    borderRadius: radius.button,
    backgroundColor: colors.ink,
    justifyContent: 'center',
  },
  retryText: { fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.surface },
});
