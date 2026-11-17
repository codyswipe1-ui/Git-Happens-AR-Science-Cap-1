// Lesson screen: walks through one cell, one part at a time (Back / Next part).
// Opened from Home with /lesson?id=2. Matches the "Lesson" screen in the UI design.
import { SymbolView } from 'expo-symbols';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCellModel, getLesson } from '@/api';
import { CellModel, Lesson } from '@/api/types';
import CellViewer from '@/components/cell-viewer';
import { colors, fonts, radius, size, space } from '@/constants/design';

// Leave the lesson: go back if we can, otherwise go Home.
function close() {
  if (router.canGoBack()) router.back();
  else router.replace('/dashboard');
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | undefined>();
  const [model, setModel] = useState<CellModel | undefined>();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0); // which part we're on, counting from 0

  useEffect(() => {
    setLoading(true);
    getLesson(Number(id))
      .then(async (l) => {
        setLesson(l);
        // Pick up where the student left off.
        // A finished lesson starts again from the first part.
        const last = (l?.steps?.length ?? 1) - 1;
        setStep(l && l.status !== 'done' ? Math.min(l.partsDone, last) : 0);
        setModel(l ? await getCellModel(l.modelId) : undefined);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator size="large" color={colors.ink} style={{ marginTop: space.xxl }} />
      </SafeAreaView>
    );
  }

  const steps = lesson?.steps ?? [];
  if (!lesson || steps.length === 0) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={[styles.page, styles.emptyPage]}>
          <Text style={styles.title}>This lesson is coming soon</Text>
          <Pressable onPress={close} accessibilityRole="button" style={[styles.next, styles.emptyButton]}>
            <Text style={styles.nextText}>Back to Home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const current = steps[step];
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.page}>
        {/* Header: close button, lesson name, one progress segment per part */}
        <View style={styles.header}>
          <Pressable onPress={close} accessibilityRole="button" accessibilityLabel="Close lesson" style={styles.round}>
            <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} tintColor={colors.ink} size={18} />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.lessonName} numberOfLines={1}>
              Lesson {lesson.id} · {lesson.title}
            </Text>
            <View
              style={styles.segments}
              accessibilityRole="progressbar"
              accessibilityLabel="Lesson progress"
              accessibilityValue={{ min: 1, max: steps.length, now: step + 1 }}>
              {steps.map((s, i) => (
                <View
                  key={s.part}
                  style={[
                    styles.segment,
                    { backgroundColor: i < step ? colors.ink : i === step ? colors.progress : 'rgba(21,21,26,0.14)' },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* The 3D cell, with this step's part circled */}
        <View style={styles.stage}>
          {model?.modelUrl ? (
            <CellViewer model={model.modelUrl} meshes={current.meshes} label={current.part} hint={false} />
          ) : null}
        </View>

        {/* The explanation for this part */}
        <ScrollView style={styles.card} contentContainerStyle={styles.cardContent}>
          <Text style={styles.count}>
            Part {step + 1} of {steps.length}
          </Text>
          <Text style={styles.title} accessibilityRole="header">
            {current.title}
          </Text>
          <Text style={styles.body}>{current.body}</Text>
          <Pressable
            onPress={() => router.push({ pathname: '/model', params: { id: String(lesson.modelId) } })}
            accessibilityRole="button"
            style={({ pressed }) => [styles.chip, pressed && styles.pressed]}>
            <SymbolView name={{ ios: 'cube', android: 'view_in_ar', web: 'view_in_ar' }} tintColor={colors.ink} size={18} />
            <Text style={styles.chipText}>Explore the model</Text>
          </Pressable>
        </ScrollView>

        {/* Back / Next part */}
        <View style={styles.footer}>
          <Pressable
            onPress={() => setStep(step - 1)}
            disabled={isFirst}
            accessibilityRole="button"
            accessibilityState={{ disabled: isFirst }}
            style={({ pressed }) => [styles.back, isFirst && styles.disabled, pressed && styles.pressed]}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Pressable
            onPress={() => (isLast ? close() : setStep(step + 1))}
            accessibilityRole="button"
            style={({ pressed }) => [styles.next, pressed && styles.pressed]}>
            <Text style={styles.nextText}>{isLast ? 'Finish lesson' : 'Next part'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.butter },
  // On a big screen, keep the lesson phone-width and centered.
  page: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center', padding: space.lg, gap: 14 },
  emptyPage: { justifyContent: 'center', alignItems: 'center' },

  header: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  round: {
    width: size.touch,
    height: size.touch,
    borderRadius: size.touch / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, minWidth: 0, gap: space.xs },
  lessonName: { fontFamily: fonts.bodySemibold, fontSize: 14, color: colors.ink },
  segments: { flexDirection: 'row', gap: space.xxs },
  segment: { flex: 1, height: 6, borderRadius: radius.chip },

  stage: {
    height: 300,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },

  card: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.card },
  cardContent: { padding: space.xl, gap: 10, flexGrow: 1 },
  count: { fontFamily: fonts.mono, fontSize: 13, color: colors.textMuted },
  title: { fontFamily: fonts.display, fontSize: 28, lineHeight: 31, letterSpacing: -0.3, color: colors.ink },
  body: { fontFamily: fonts.body, fontSize: 17, lineHeight: 25, color: colors.textOnPastel },
  chip: {
    marginTop: 'auto',
    alignSelf: 'flex-start',
    minHeight: size.touch,
    paddingHorizontal: 14,
    borderRadius: radius.small,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
  chipText: { fontFamily: fonts.bodySemibold, fontSize: 15, color: colors.ink },

  footer: { flexDirection: 'row', gap: 10 },
  back: {
    width: 120,
    height: size.button,
    borderRadius: radius.button,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.ink },
  next: {
    flex: 1,
    height: size.button,
    borderRadius: radius.button,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyButton: { flex: 0, paddingHorizontal: space.xl, marginTop: space.lg },
  nextText: { fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.surface },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.85 },
});
