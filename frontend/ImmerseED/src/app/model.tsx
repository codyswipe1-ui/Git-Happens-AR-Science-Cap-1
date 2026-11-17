// "Explore the model": one cell in 3D (or AR on a phone). Tap a part on the model,
// or pick it from the list, to circle it and read what it does.
// Matches the "Model3D" screen in the UI design.
import { SymbolView } from 'expo-symbols';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCellModel, getCellParts, getLessons } from '@/api';
import { CellModel, CellPart, Lesson } from '@/api/types';
import ARView from '@/components/ar-view';
import CellViewer from '@/components/cell-viewer';
import { colors, fonts, radius, size, space } from '@/constants/design';

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/library');
}

export default function ModelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [model, setModel] = useState<CellModel | undefined>();
  const [parts, setParts] = useState<CellPart[]>([]);
  const [lesson, setLesson] = useState<Lesson | undefined>();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'3D' | 'AR'>('3D');
  const [selected, setSelected] = useState(0); // which part is circled

  useEffect(() => {
    setLoading(true);
    setMode('3D');
    setSelected(0);
    Promise.all([getCellModel(Number(id)), getLessons()])
      .then(async ([m, lessons]) => {
        setModel(m);
        setParts(m ? await getCellParts(m) : []);
        // A lesson that uses this cell, for the "guided tour" link. Prefer the one in progress.
        const forThis = lessons.filter((l) => l.modelId === m?.id && l.status !== 'locked');
        setLesson(forThis.find((l) => l.status === 'current') ?? forThis[0]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // The student tapped the model: select the first part we know among what was hit.
  const onTapMeshes = (names: string[]) => {
    for (const name of names) {
      const i = parts.findIndex((p) => p.meshes.some((m) => name.startsWith(m)));
      if (i >= 0) {
        setSelected(i);
        return;
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator size="large" color={colors.ink} style={{ marginTop: space.xxl }} />
      </SafeAreaView>
    );
  }

  if (!model?.modelUrl) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.page}>
          <BackButton />
          <Text style={styles.title}>We couldn’t find that model.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const part = parts[selected];
  const partsText = model.partsCount > 0 ? `${model.partsCount} parts` : 'Parts coming soon';

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <View style={styles.headerText}>
            <Text style={styles.title} accessibilityRole="header">
              {model.name}
            </Text>
            <Text style={styles.subtitle}>
              {model.level} · {partsText}
            </Text>
          </View>
        </View>

        {/* 3D / AR switch */}
        <View style={styles.tabs} accessibilityRole="tablist">
          {(['3D', 'AR'] as const).map((tab) => {
            const on = mode === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setMode(tab)}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                style={[styles.tab, on && styles.tabOn]}>
                <Text style={[styles.tabText, on && styles.tabTextOn]}>{tab}</Text>
                {tab === 'AR' ? <Text style={[styles.tabNote, on && styles.tabTextOn]}>see it in your room</Text> : null}
              </Pressable>
            );
          })}
        </View>

        {/* The cell */}
        <View style={styles.stage}>
          {mode === '3D' ? (
            <CellViewer
              model={model.modelUrl}
              meshes={part?.meshes ?? []}
              label={part?.name}
              onTapMeshes={onTapMeshes}
            />
          ) : Platform.OS === 'web' ? (
            <View style={styles.arMessage}>
              <Text style={styles.cardTitle}>AR works in the phone app</Text>
              <Text style={styles.cardBody}>Use 3D to explore this cell in your browser.</Text>
            </View>
          ) : (
            <ARView />
          )}
        </View>

        {/* Parts: pick one to circle it */}
        {parts.length > 0 ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipScroll}
              contentContainerStyle={styles.chips}
              accessibilityLabel="Cell parts">
              {parts.map((p, i) => {
                const on = i === selected;
                return (
                  <Pressable
                    key={p.name}
                    onPress={() => setSelected(i)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    style={[styles.chip, on && styles.chipOn]}>
                    <Text style={[styles.chipText, on && styles.chipTextOn]}>{p.name}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {part ? (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{part.name}</Text>
                <Text style={styles.cardBody}>{part.summary}</Text>
              </View>
            ) : null}
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Parts coming soon</Text>
            <Text style={styles.cardBody}>{model.description}</Text>
          </View>
        )}

        {/* Guided tour */}
        {lesson ? (
          <Pressable
            onPress={() => router.push({ pathname: '/lesson', params: { id: String(lesson.id) } })}
            accessibilityRole="link"
            style={({ pressed }) => [styles.tour, pressed && styles.pressed]}>
            <View style={styles.tourText}>
              <Text style={styles.tourNote}>Want a guided tour? This cell is in</Text>
              <Text style={styles.tourTitle}>
                Lesson {lesson.id} · {lesson.title}
              </Text>
            </View>
            <SymbolView name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }} tintColor={colors.ink} size={20} />
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function BackButton() {
  return (
    <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Back" style={styles.round}>
      <SymbolView name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }} tintColor={colors.ink} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  page: { width: '100%', maxWidth: 700, alignSelf: 'center', padding: space.lg, paddingBottom: space.xxl, gap: 14 },

  header: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  round: {
    width: size.touch,
    height: size.touch,
    borderRadius: size.touch / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, minWidth: 0 },
  title: { fontFamily: fonts.display, fontSize: 26, letterSpacing: -0.5, color: colors.ink },
  subtitle: { fontFamily: fonts.body, fontSize: 14, color: colors.textMuted },

  tabs: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.button, padding: space.xxs },
  tab: {
    flex: 1,
    minHeight: size.touch,
    borderRadius: radius.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
  },
  tabOn: { backgroundColor: colors.ink },
  tabText: { fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.ink },
  tabNote: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  tabTextOn: { color: colors.surface },

  stage: { height: 340, borderRadius: 28, backgroundColor: colors.sky, overflow: 'hidden' },
  arMessage: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl, gap: 6 },

  chipScroll: { marginHorizontal: -space.lg },
  chips: { paddingHorizontal: space.lg, gap: space.xs },
  chip: {
    minHeight: size.touch,
    paddingHorizontal: space.md,
    borderRadius: radius.chip,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  chipOn: { backgroundColor: colors.ink },
  chipText: { fontFamily: fonts.bodySemibold, fontSize: 15, color: colors.ink },
  chipTextOn: { color: colors.surface },

  card: { backgroundColor: colors.surface, borderRadius: radius.row, padding: 18, gap: 6 },
  cardTitle: { fontFamily: fonts.heading, fontSize: 20, color: colors.ink },
  cardBody: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.textOnPastel },

  tour: {
    minHeight: 64,
    borderRadius: radius.button,
    backgroundColor: colors.butter,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  tourText: { flex: 1, gap: 2 },
  tourNote: { fontFamily: fonts.body, fontSize: 13, color: colors.textOnPastel },
  tourTitle: { fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.ink },
  pressed: { opacity: 0.85 },
});
