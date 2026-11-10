import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome header */}
        <Text style={styles.brand}>ImmerseED</Text>
        <Text style={styles.title} accessibilityRole="header">Welcome, explorer!</Text>
        <Text style={styles.subtitle}>A tiny world. So much to discover.</Text>

        {/* Start Exploring is a featured card with a link to the existing library. */}
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroLabel}>SCIENCE, UP CLOSE</Text>
            <Text style={styles.heroTitle} accessibilityRole="header">Start Exploring</Text>
            <Text style={styles.heroDescription}>
              Step inside a cell and discover what makes living things work.
            </Text>
            <Link href="/library" asChild style={styles.heroButton}>
              <Pressable accessibilityRole="link">
                <Text style={styles.heroButtonText}>Explore models →</Text>
              </Pressable>
            </Link>
          </View>
          {/* Decorative cell illustration, no 3D model needed here. */}
          <View style={styles.illustration} accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <View style={styles.cell}>
              <View style={styles.nucleus}><View style={styles.nucleolus} /></View>
              <View style={[styles.organelle, styles.organelleOne]} />
              <View style={[styles.organelle, styles.organelleTwo]} />
              <View style={[styles.organelle, styles.organelleThree]} />
              <View style={styles.cellDot} />
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">Your discovery space</Text>
        <View style={styles.featureGrid}>
          {/* Put styles on Link: it passes them to the Pressable on web and mobile. */}
          <Link href="/library" asChild style={[styles.card, styles.modelsCard]}>
            <Pressable accessibilityRole="link" accessibilityLabel="Model Library, browse cell models">
              <View style={[styles.iconBox, styles.modelsIcon]}>
                <SymbolView name={{ ios: 'cube', android: 'view_in_ar', web: 'view_in_ar' }} tintColor="#89c9ff" size={28} />
              </View>
              <Text style={styles.cardTitle}>Model Library</Text>
              <Text style={styles.description}>Find a cell to explore.</Text>
              <Text style={styles.action}>View library →</Text>
            </Pressable>
          </Link>

          {/* No links or press handlers on the unfinished features. */}
          <Pressable disabled accessibilityRole="button" accessibilityState={{ disabled: true }} style={styles.card}>
            <View style={[styles.iconBox, styles.learningIcon]}>
              <SymbolView name={{ ios: 'book', android: 'menu_book', web: 'menu_book' }} tintColor="#c5acff" size={28} />
            </View>
            <Text style={styles.cardTitle}>Learning Mode</Text>
            <Text style={styles.description}>Meet the parts of a cell.</Text>
            <Text style={styles.badge}>Coming soon</Text>
          </Pressable>

          <Pressable disabled accessibilityRole="button" accessibilityState={{ disabled: true }} style={styles.card}>
            <View style={[styles.iconBox, styles.quizIcon]}>
              <SymbolView name={{ ios: 'questionmark.circle', android: 'quiz', web: 'quiz' }} tintColor="#ffd28a" size={28} />
            </View>
            <Text style={styles.cardTitle}>Quiz Mode</Text>
            <Text style={styles.description}>See what you have learned.</Text>
            <Text style={styles.badge}>Coming soon</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b0a3d' },
  content: { width: '100%', maxWidth: 1000, alignSelf: 'center', padding: 24, paddingBottom: 48 },
  brand: { color: '#8eb9e8', fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 24 },
  title: { color: '#ffffff', fontSize: 30, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#a3b9db', fontSize: 16, lineHeight: 24, marginBottom: 28 },
  hero: { backgroundColor: '#214e80', borderColor: '#3875a6', borderWidth: 1, borderRadius: 24, padding: 28, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 24 },
  heroCopy: { flexGrow: 1, flexBasis: 240, gap: 14 },
  heroLabel: { color: '#b6e5f4', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  heroTitle: { color: '#ffffff', fontSize: 32, fontWeight: 'bold' },
  heroDescription: { color: '#d0e5f5', fontSize: 16, lineHeight: 25, maxWidth: 380 },
  heroButton: { backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 14, alignSelf: 'flex-start', marginTop: 6 },
  heroButtonText: { color: '#173e67', fontWeight: '700', fontSize: 15 },
  illustration: { flexGrow: 1, flexBasis: 160, alignItems: 'center', paddingVertical: 12 },
  cell: { width: 160, height: 140, borderRadius: 65, borderWidth: 5, borderColor: '#91d9d1', backgroundColor: '#57a8b5', transform: [{ rotate: '-12deg' }], alignItems: 'center', justifyContent: 'center' },
  nucleus: { width: 62, height: 56, borderRadius: 28, borderWidth: 4, borderColor: '#d1bcff', backgroundColor: '#8b6bb6', alignItems: 'center', justifyContent: 'center' },
  nucleolus: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#e8d5ff' },
  organelle: { position: 'absolute', width: 29, height: 13, borderRadius: 8, backgroundColor: '#ffce8b', borderWidth: 2, borderColor: '#e6a56d' },
  organelleOne: { top: 18, left: 30, transform: [{ rotate: '25deg' }] },
  organelleTwo: { bottom: 20, right: 19, transform: [{ rotate: '-30deg' }] },
  organelleThree: { bottom: 25, left: 15, transform: [{ rotate: '45deg' }] },
  cellDot: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: '#c7efe5', top: 28, right: 20 },
  sectionTitle: { color: '#ffffff', fontSize: 20, fontWeight: '700', marginTop: 32, marginBottom: 16 },
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { flexGrow: 1, flexBasis: 220, backgroundColor: '#15134f', borderColor: '#302c68', borderWidth: 1, borderRadius: 20, padding: 22, gap: 12 },
  modelsCard: { borderColor: '#416d9c' },
  iconBox: { width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  modelsIcon: { backgroundColor: '#22375e' },
  learningIcon: { backgroundColor: '#342759' },
  quizIcon: { backgroundColor: '#49394c' },
  cardTitle: { color: '#ffffff', fontSize: 20, fontWeight: '700' },
  description: { color: '#a3b9db', fontSize: 15, lineHeight: 23 },
  action: { color: '#89c9ff', fontSize: 14, fontWeight: '600', marginTop: 8 },
  badge: { color: '#b8b3d8', backgroundColor: '#26234e', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, fontSize: 12, alignSelf: 'flex-start', marginTop: 8 },
});
