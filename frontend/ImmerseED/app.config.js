export default ({ config }) => ({
  ...config,
  ios: {
    ...config.ios,
    bundleIdentifier: process.env.IOS_BUNDLE_ID,
    appleTeamId: process.env.APPLE_TEAM_ID,
    infoPlist: {
      NSCameraUsageDescription: 'ImmerseED uses the camera to show cells in your room.',
      RVApiKey: process.env.RV_API_KEY,
      RVProjectId: process.env.RV_PROJECT_ID,
    },
  },
  plugins: [
    ...config.plugins,
    ['@reactvision/react-viro', {
      rvApiKey: process.env.RV_API_KEY,
      rvProjectId: process.env.RV_PROJECT_ID,
      android: { xRMode: 'AR' },
    }],
  ],
});