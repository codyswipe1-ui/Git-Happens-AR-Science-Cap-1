// A thin rounded progress bar. value goes from 0 (empty) to 1 (full).
import { View } from 'react-native';

import { colors, radius } from '@/constants/design';

type Props = { value: number; color: string; track?: string; height?: number; label: string };

export default function ProgressBar({ value, color, track = colors.line, height = 8, label }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      style={{ height, borderRadius: radius.chip, backgroundColor: track, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%` as const, height: '100%', backgroundColor: color, borderRadius: radius.chip }} />
    </View>
  );
}
