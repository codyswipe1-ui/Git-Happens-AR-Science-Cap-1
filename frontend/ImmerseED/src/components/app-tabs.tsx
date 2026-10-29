import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

// One tab bar for phone AND web.
// (The Expo template had two files because NativeTabs can't run in a browser.)
const COLORS = {
  background: '#0b0a3d',
  border: '#26236e',
  active: '#579fbb',
  inactive: '#749bdb',
};

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: { backgroundColor: COLORS.background, borderTopColor: COLORS.border },
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
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' }} tintColor={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'AR',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'cube', android: 'view_in_ar', web: 'view_in_ar' }} tintColor={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
