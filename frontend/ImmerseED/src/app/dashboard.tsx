// Home dashboard: pick up your lesson, jump into any model, see all lessons.
// Built from the same pieces as the Model Library (ModelCard, CellArt, design tokens).
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCellModels, getLessons } from '@/api';
import { CellModel, Lesson } from '@/api/types';
import CellArt from '@/components/cell-art';
import LessonRow from '@/components/lesson-row';
import ModelCard, { kindOf } from '@/components/model-card';
import ProgressBar from '@/components/progress-bar';
import SectionHeader from '@/components/section-header';
import { colors, fonts, maxContentWidth, radius, space } from '@/constants/design';

// Width of each card in the sideways-scrolling model row.
const MODEL_CARD_WIDTH = 280;

function openModel(id: number) {
  router.push({ pathname: '/model', params: { id: String(id) } });
}

export default function DashboardScreen() {
  const [models, setModels] = useState<CellModel[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    // Ask for both at the same time and wait until both arrive.
    Promise.all([getCellModels(), getLessons()])
      .then(([m, l]) => {
        setModels(m);
        setLessons(l);
      })
      .catch(() => setError('We couldn’t load your progress. Check your connection and try again.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  // The lesson in progress, and the model it uses, for the Continue card.
  const current = lessons.find((l) => l.status === 'current');
  const currentModel = models.find((m) => m.id === current?.modelId);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.greeting}>
          <Text style={styles.title} accessibilityRole="header">
            Hi there
          </Text>
          <Text style={styles.subtitle}>Ready for the next part?</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.ink} style={{ marginTop: space.xxl }} />
        ) : error ? (
          <View style={styles.message}>
            <Text style={styles.messageTitle}>Something went wrong</Text>
            <Text style={styles.messageBody}>{error}</Text>
            <Pressable onPress={load} accessibilityRole="button" style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
              <Text style={styles.buttonText}>Try again</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {current && currentModel ? <ContinueCard lesson={current} model={currentModel} /> : null}

            <View style={styles.section}>
              <SectionHeader title="Explore models" action="See all" onAction={() => router.push('/library')} />
              <Text style={styles.note}>Play around with any cell. Nothing’s locked.</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.modelScroll}
                contentContainerStyle={styles.modelRow}>
                {models.map((m) => (
                  <ModelCard key={m.id} model={m} width={MODEL_CARD_WIDTH} onPress={() => openModel(m.id)} />
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <SectionHeader title="Lessons" />
              <View style={styles.list}>
                {lessons.map((l) => (
                  <LessonRow
                    key={l.id}
                    lesson={l}
                    onPress={l.status === 'locked' ? undefined : () => openModel(l.modelId)}
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// The big peach card at the top: where you left off.
function ContinueCard({ lesson, model }: { lesson: Lesson; model: CellModel }) {
  return (
    <View style={styles.continue}>
      <View style={styles.continueText}>
        <Text style={styles.eyebrow}>Continue · Lesson {lesson.id}</Text>
        <Text style={styles.continueTitle}>{lesson.title}</Text>
        <ProgressBar
          value={lesson.partsDone / lesson.partsTotal}
          color={colors.ink}
          track="rgba(255,255,255,0.7)"
          label={`Lesson ${lesson.id} progress`}
        />
        <Text style={styles.continueMeta}>
          {lesson.partsDone} of {lesson.partsTotal} parts
        </Text>
        <Pressable
          onPress={() => openModel(model.id)}
          accessibilityRole="button"
          accessibilityLabel={`Continue lesson ${lesson.id}, ${lesson.title}`}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
      <CellArt kind={kindOf(model)} size={112} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.xxl,
    gap: space.xl,
  },
  greeting: { gap: space.xxs },
  title: { fontFamily: fonts.display, fontSize: 32, letterSpacing: -0.6, color: colors.ink },
  subtitle: { fontFamily: fonts.body, fontSize: 15, color: colors.textMuted },

  continue: {
    backgroundColor: colors.peach,
    borderRadius: radius.card,
    padding: space.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.sm,
  },
  continueText: { flex: 1, minWidth: 0, gap: space.sm },
  eyebrow: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textOnPastel,
  },
  continueTitle: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 29, color: colors.ink },
  continueMeta: { fontFamily: fonts.body, fontSize: 14, color: colors.textOnPastel },

  button: {
    alignSelf: 'flex-start',
    minHeight: 48,
    paddingHorizontal: 22,
    borderRadius: radius.button,
    backgroundColor: colors.ink,
    justifyContent: 'center',
    marginTop: space.xxs,
  },
  buttonText: { fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.surface },
  pressed: { opacity: 0.85 },

  section: { gap: space.sm },
  note: { fontFamily: fonts.body, fontSize: 15, color: colors.textMuted, marginTop: -space.xs },
  // Let the row run to the screen edges, but start in line with the text.
  modelScroll: { marginHorizontal: -space.lg },
  modelRow: { paddingHorizontal: space.lg, gap: space.sm },
  list: { gap: 10 },

  message: {
    backgroundColor: colors.surface,
    borderRadius: radius.row,
    padding: space.xl,
    alignItems: 'center',
    gap: 6,
  },
  messageTitle: { fontFamily: fonts.heading, fontSize: 20, color: colors.ink, textAlign: 'center' },
  messageBody: { fontFamily: fonts.body, fontSize: 15, color: colors.textMuted, textAlign: 'center' },
});
