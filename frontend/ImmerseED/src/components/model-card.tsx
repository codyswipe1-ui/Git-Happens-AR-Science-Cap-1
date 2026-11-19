// One model as a pastel card. Used on Home (dashboard) and in the Model Library.
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CellModel } from '@/api/types';
import CellArt, { CellKind } from '@/components/cell-art';
import { colors, fonts, radius, space } from '@/constants/design';

// Each model keeps one pastel color everywhere in the app.
export const CARD_COLORS: Record<CellKind, string> = {
  animal: colors.lilac,
  plant: colors.mint,
  human: colors.peach,
};

export function kindOf(model: CellModel): CellKind {
  if (model.modelUrl) return model.modelUrl;
  return model.modelType === 'plant' ? 'plant' : 'animal';
}

type Props = { model: CellModel; width: number; onPress: () => void };

export default function ModelCard({ model, width, onPress }: Props) {
  const kind = kindOf(model);
  const parts = model.partsCount > 0 ? `${model.partsCount} parts` : 'Parts coming soon';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${model.name}, ${model.level}, ${parts}. Opens in 3D.`}
      style={({ pressed }) => [styles.card, { width, backgroundColor: CARD_COLORS[kind] }, pressed && styles.pressed]}>
      <View style={styles.text}>
        <Text style={styles.title}>{model.name}</Text>
        <Text style={styles.meta}>{parts}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{model.level}</Text>
        </View>
      </View>
      <CellArt kind={kind} size={112} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 156,
    borderRadius: radius.card,
    padding: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  text: { flex: 1, minWidth: 0, gap: 6, alignSelf: 'stretch' },
  title: { fontFamily: fonts.heading, fontSize: 22, lineHeight: 26, color: colors.ink },
  meta: { fontFamily: fonts.body, fontSize: 14, color: colors.textOnPastel },
  badge: {
    marginTop: 'auto',
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.ink },
  pressed: { opacity: 0.85 },
});
