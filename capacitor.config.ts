import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.clcpremiere.studios',
  appName: 'CLC Premier Studios',
  webDir: 'dist',

  server: {
    // Use https scheme on Android (required for camera/mic permissions in WebView)
    androidScheme: 'https',
    // Allow image CDNs used for skins and artist photos
    allowNavigation: [
      's4.anilist.co',
      '*.wikimedia.org',
      '*.wikipedia.org',
      '*.soundhelix.com',
    ],
  },

  android: {
    backgroundColor: '#080812',
    // Allow mixed content (needed while some assets may be over http)
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },

  ios: {
    backgroundColor: '#080812',
    // Fill the notch / Dynamic Island area
    contentInset: 'always',
    // Scroll behavior matching the web app
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#080812',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      spinnerColor: '#00D485',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
