// A section title with an optional link on the right, like "Explore models   See all".
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, size } from '@/constants/design';

type Props = { title: string; action?: string; onAction?: () => void };

export default function SectionHeader({ title, action, onAction }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {action && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="link" style={styles.action}>
          <Text style={styles.actionText}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontFamily: fonts.heading, fontSize: 22, color: colors.ink },
  action: { minHeight: size.touch, justifyContent: 'center' },
  actionText: { fontFamily: fonts.bodySemibold, fontSize: 15, color: colors.ink },
});
