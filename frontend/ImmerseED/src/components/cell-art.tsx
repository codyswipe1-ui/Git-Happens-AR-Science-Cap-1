// Simple drawn 3D-looking cells for cards and thumbnails.
// Placeholders until the real 3D models have thumbnails.
// Built from plain Views so it works on phone and web with no extra packages.
import { StyleProp, View, ViewStyle } from 'react-native';

type Tone = { dark: string; mid: string; light: string };

const TONES = {
  lilac: { dark: '#9483EE', mid: '#C9BEFF', light: '#F7F5FF' },
  nucleus: { dark: '#4F3AC0', mid: '#8E7BEA', light: '#EEE9FF' },
  mint: { dark: '#6FC398', mid: '#B5E8CB', light: '#F0FFF6' },
  green: { dark: '#2E8A52', mid: '#5DBE7A', light: '#E6FFE9' },
  peach: { dark: '#EF9A72', mid: '#FFCDB0', light: '#FFF4EC' },
  rose: { dark: '#C1506A', mid: '#F08AA0', light: '#FFE9EE' },
  orange: { dark: '#DC6A3A', mid: '#FF9F6E', light: '#FFEAD9' },
} satisfies Record<string, Tone>;

type OrbProps = {
  width: number;
  height?: number;
  tone: Tone;
  rounded?: number; // corner radius; default is a full circle or pill
  rotate?: string;
  style?: StyleProp<ViewStyle>;
};

// A shaded shape: dark base, lighter body shifted up-left, small highlight.
function Orb({ width, height = width, tone, rounded, rotate, style }: OrbProps) {
  const r = rounded ?? Math.min(width, height) / 2;
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: r,
          backgroundColor: tone.dark,
          overflow: 'hidden',
          transform: rotate ? [{ rotate }] : undefined,
        },
        style,
      ]}>
      <View
        style={{
          position: 'absolute',
          left: -width * 0.06,
          top: -height * 0.08,
          width: width * 0.94,
          height: height * 0.92,
          borderRadius: r,
          backgroundColor: tone.mid,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: width * 0.16,
          top: height * 0.12,
          width: width * 0.32,
          height: height * 0.28,
          borderRadius: r,
          backgroundColor: tone.light,
          opacity: 0.75,
        }}
      />
    </View>
  );
}

export type CellKind = 'animal' | 'plant' | 'human';

type Props = { kind: CellKind; size: number };

// Every piece is placed as a fraction of `size`, so the drawing scales cleanly.
export default function CellArt({ kind, size: s }: Props) {
  const at = (x: number, y: number): ViewStyle => ({ position: 'absolute', left: s * x, top: s * y });

  return (
    <View
      style={{ width: s, height: s }}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden>
      {/* soft shadow under the cell */}
      <View
        style={[
          at(0.18, 0.9),
          { width: s * 0.64, height: s * 0.1, borderRadius: s, backgroundColor: 'rgba(40,32,90,0.14)' },
        ]}
      />
      {kind === 'animal' && (
        <>
          <Orb width={s * 0.9} tone={TONES.lilac} style={at(0.05, 0)} />
          <Orb width={s * 0.36} tone={TONES.nucleus} style={at(0.32, 0.27)} />
          <Orb width={s * 0.22} height={s * 0.1} tone={TONES.orange} rotate="30deg" style={at(0.16, 0.16)} />
          <Orb width={s * 0.24} height={s * 0.1} tone={TONES.orange} rotate="-20deg" style={at(0.56, 0.66)} />
        </>
      )}
      {kind === 'plant' && (
        <>
          <Orb width={s * 0.9} tone={TONES.mint} rounded={s * 0.27} style={at(0.05, 0)} />
          <Orb width={s * 0.26} tone={TONES.nucleus} style={at(0.54, 0.15)} />
          <Orb width={s * 0.22} height={s * 0.14} tone={TONES.green} style={at(0.16, 0.2)} />
          <Orb width={s * 0.22} height={s * 0.14} tone={TONES.green} style={at(0.24, 0.56)} />
          <Orb width={s * 0.22} height={s * 0.14} tone={TONES.green} style={at(0.6, 0.6)} />
        </>
      )}
      {kind === 'human' && (
        <>
          <Orb width={s * 0.9} tone={TONES.peach} style={at(0.05, 0)} />
          <Orb width={s * 0.32} tone={TONES.rose} style={at(0.34, 0.29)} />
          <Orb width={s * 0.12} tone={TONES.lilac} style={at(0.18, 0.6)} />
          <Orb width={s * 0.1} tone={TONES.lilac} style={at(0.68, 0.18)} />
        </>
      )}
    </View>
  );
}
