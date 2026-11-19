import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '@/constants/design';

// One tab bar for phone AND web.
// (The Expo template had two files because NativeTabs can't run in a browser.)
// New design: white tab bar, ink for the active tab (see src/constants/design.ts).
const COLORS = {
  background: colors.surface,
  border: colors.line,
  active: colors.ink,
  inactive: colors.textMuted,
};

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          // Room for icon + label, plus the iPhone home-indicator area
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
        },
        tabBarLabelStyle: { fontFamily: fonts.bodySemibold, fontSize: 12 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'house', android: 'home', web: 'home' }} tintColor={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' }} tintColor={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="model" options={{ href: null }} />
      {/* Lessons open full screen, with no tab bar. */}
      <Tabs.Screen name="lesson" options={{ href: null, tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Models',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'square.stack.3d.up', android: 'deployed_code', web: 'deployed_code' }} tintColor={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'cube', android: 'view_in_ar', web: 'deployed_code' }} tintColor={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
