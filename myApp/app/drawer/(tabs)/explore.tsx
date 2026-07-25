import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e8f1ff', dark: '#1a1a1a' }}
      headerImage={
        <IconSymbol
          size={260}
          color="#1677ff"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={styles.title}>
          Explore
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.description}>
        This app includes example code to help you get started.
      </ThemedText>

      <ThemedView style={styles.card}>
        <Collapsible title="File-based routing">
          <ThemedText style={styles.text}>
            This app has two screens:{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/index.tsx
            </ThemedText>{' '}
            and{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/explore.tsx
            </ThemedText>
          </ThemedText>

          <ThemedText style={styles.text}>
            The layout file in{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/_layout.tsx
            </ThemedText>{' '}
            sets up the tab navigator.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link" style={styles.link}>
              Learn more
            </ThemedText>
          </ExternalLink>
        </Collapsible>
      </ThemedView>

      <ThemedView style={styles.card}>
        <Collapsible title="Android, iOS, and web support">
          <ThemedText style={styles.text}>
            You can open this project on Android, iOS, and the web.
            To open the web version, press{' '}
            <ThemedText type="defaultSemiBold">w</ThemedText>{' '}
            in the terminal running this project.
          </ThemedText>
        </Collapsible>
      </ThemedView>

      <ThemedView style={styles.card}>
        <Collapsible title="Images">
          <ThemedText style={styles.text}>
            For static images, you can use the{' '}
            <ThemedText type="defaultSemiBold">@2x</ThemedText>{' '}
            and{' '}
            <ThemedText type="defaultSemiBold">@3x</ThemedText>{' '}
            suffixes to provide files for different screen densities.
          </ThemedText>

          <ThemedView style={styles.imageContainer}>
            <Image
              source={require('@/assets/images/react-logo.png')}
              style={styles.reactImage}
            />
          </ThemedView>

          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link" style={styles.link}>
              Learn more
            </ThemedText>
          </ExternalLink>
        </Collapsible>
      </ThemedView>

      <ThemedView style={styles.card}>
        <Collapsible title="Light and dark mode components">
          <ThemedText style={styles.text}>
            This template has light and dark mode support. The{' '}
            <ThemedText type="defaultSemiBold">
              useColorScheme()
            </ThemedText>{' '}
            hook lets you inspect what the user&apos;s current color scheme
            is, and so you can adjust UI colors accordingly.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <ThemedText type="link" style={styles.link}>
              Learn more
            </ThemedText>
          </ExternalLink>
        </Collapsible>
      </ThemedView>

      <ThemedView style={styles.card}>
        <Collapsible title="Animations">
          <ThemedText style={styles.text}>
            This template includes an example of an animated component.
            The{' '}
            <ThemedText type="defaultSemiBold">
              components/HelloWave.tsx
            </ThemedText>{' '}
            component uses the powerful{' '}
            <ThemedText
              type="defaultSemiBold"
              style={{ fontFamily: Fonts.mono }}>
              react-native-reanimated
            </ThemedText>{' '}
            library to create a waving hand animation.
          </ThemedText>

          {Platform.select({
            ios: (
              <ThemedText style={styles.text}>
                The{' '}
                <ThemedText type="defaultSemiBold">
                  components/ParallaxScrollView.tsx
                </ThemedText>{' '}
                component provides a parallax effect for the header image.
              </ThemedText>
            ),
          })}
        </Collapsible>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#1677ff',
    bottom: -70,
    left: -20,
    position: 'absolute',
    opacity: 0.9,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  title: {
    fontFamily: Fonts.rounded,
    fontSize: 34,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.7,
    marginBottom: 10,
  },

  card: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  text: {
    fontSize: 15,
    lineHeight: 23,
    marginVertical: 5,
  },

  link: {
    fontSize: 15,
    marginTop: 8,
    color: '#1677ff',
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    padding: 15,
    borderRadius: 15,
  },

  reactImage: {
    width: 110,
    height: 110,
  },
});