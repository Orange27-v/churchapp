import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'Raleway': require('../assets/fonts/Raleway-VariableFont_wght.ttf'),
    'OpenSans': require('../assets/fonts/OpenSans-VariableFont.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    // Add more fonts as needed
  });

  return fontsLoaded;
};
