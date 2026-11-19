// One lesson in a list. Three looks: done (mint), current (white with progress), not started (white, "Start").
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Lesson } from '@/api/types';
import ProgressBar from '@/components/progress-bar';
import { colors, fonts, radius, space } from '@/constants/design';

type Props = { lesson: Lesson; onPress?: () => void };

export default function LessonRow({ lesson, onPress }: Props) {
  const pct = Math.round((lesson.partsDone / lesson.partsTotal) * 100);

  if (lesson.status === 'todo') {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Lesson ${lesson.id}, ${lesson.title}, not started`}
        style={({ pressed }) => [styles.row, styles.todo, pressed && styles.pressed]}>
        <View style={[styles.circle, { backgroundColor: colors.background }]}>
          <Text style={styles.number}>{lesson.id}</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.meta}>
            Lesson {lesson.id} · {lesson.partsTotal} parts + quiz
          </Text>
          <Text style={styles.title}>{lesson.title}</Text>
        </View>
        <Text style={styles.start}>Start</Text>
      </Pressable>
    );
  }

  const done = lesson.status === 'done';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Lesson ${lesson.id}, ${lesson.title}, ${pct}% done`}
      style={({ pressed }) => [styles.row, done ? styles.done : styles.current, pressed && styles.pressed]}>
      {done ? (
        <View style={[styles.circle, { backgroundColor: colors.ink }]}>
          <SymbolView name={{ ios: 'checkmark', android: 'check', web: 'check' }} tintColor={colors.surface} size={18} />
        </View>
      ) : (
        <View style={[styles.circle, { backgroundColor: colors.progress }]}>
          <Text style={styles.number}>{lesson.id}</Text>
        </View>
      )}
      <View style={styles.text}>
        {done ? <Text style={styles.meta}>Lesson {lesson.id} · done</Text> : null}
        <Text style={styles.title}>{lesson.title}</Text>
        {done ? null : (
          <ProgressBar value={pct / 100} color={colors.progress} height={6} label={`Lesson ${lesson.id} progress`} />
        )}
      </View>
      <Text style={styles.pct}>{pct}%</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    borderRadius: radius.row,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  done: { backgroundColor: colors.mint },
  current: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink },
  todo: { backgroundColor: colors.surface },
  circle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, minWidth: 0, gap: 4 },
  meta: { fontFamily: fonts.body, fontSize: 13, color: colors.textOnPastel },
  title: { fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.ink },
  number: { fontFamily: fonts.mono, fontSize: 15, color: colors.ink },
  pct: { fontFamily: fonts.mono, fontSize: 14, color: colors.ink },
  start: { fontFamily: fonts.bodySemibold, fontSize: 14, color: colors.ink },
  pressed: { opacity: 0.85 },
});
