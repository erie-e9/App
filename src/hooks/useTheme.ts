import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import {
  Common,
  Fonts,
  Gutters,
  Images,
  Animations,
  Layout,
  themes,
  DefaultVariables,
} from '@theme';
import { AppPreferencesState } from '@slices/types/appPreferences';
import {
  ThemeVariables,
  Theme,
  ThemeNavigationTheme,
  ThemeNavigationColors,
} from 'types/theme';

export default function () {
  // Get the scheme device
  const colorScheme = useColorScheme();

  // Get current theme from the store
  const currentTheme = useSelector(
    (state: { appPreferences: AppPreferencesState }) =>
      state.appPreferences.theme,
  );

  const isDark = useSelector(
    (state: { appPreferences: AppPreferencesState }) =>
      state.appPreferences.darkMode,
  );
  const darkMode = isDark === null ? colorScheme === 'dark' : isDark;

  let variables = {};
  let partialTheme = {};
  let darkVariables = {};
  let partialDarkTheme = {};

  if (currentTheme !== 'default') {
    const {
      Variables,
      // @ts-ignore to prevent multiple themes handling
      ...themeConfig
    } = themes[currentTheme] || {};

    variables = Variables;
    partialTheme = themeConfig || {};
  }

  if (darkMode) {
    const { Variables, ...darkThemeConfig } =
      themes[`${currentTheme}_dark` as keyof typeof themes] || {};

    darkVariables = Variables;
    partialDarkTheme = darkThemeConfig;
  }

  const themeVariables = mergeVariables(variables, darkVariables);

  const fonts = Fonts(themeVariables);
  const gutters = Gutters(themeVariables);
  const images = Images(themeVariables);
  const animations = Animations();
  const layout = Layout(themeVariables);
  const common = Common({
    ...themeVariables,
    Layout: Layout(themeVariables),
    Gutters: Gutters(themeVariables),
    Fonts: Fonts(themeVariables),
    Images: Images(themeVariables),
    Animations: Animations(),
  });

  // Build the default theme
  const baseTheme: Theme<
    typeof fonts,
    typeof gutters,
    typeof images,
    typeof animations,
    typeof layout,
    typeof common
  > = {
    Fonts: fonts,
    Gutters: gutters,
    Images: images,
    Animations: animations,
    Layout: layout,
    Common: common,
    ...themeVariables,
  };

  // Merge and return the current Theme
  return buildTheme(
    darkMode,
    baseTheme,
    formatTheme(themeVariables, partialTheme || {}),
    formatTheme(themeVariables, partialDarkTheme || {}),
  );
}

/**
 * Generate Theme with theme variables
 */
const formatTheme = <F, G, I, A, L, C>(
  variables: ThemeVariables,
  theme: Partial<Theme<F, G, I, A, L, C>>,
) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: (generate as any)(variables),
    };
  }, theme);
};

/**
 * Merge all variables for building the theme
 * baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeVariables = (
  themeConfig: Partial<ThemeVariables>,
  darkThemeConfig: Partial<ThemeVariables>,
) => {
  return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
    const theme:
      | Record<keyof typeof DefaultVariables, typeof vars>
      | undefined = (themeConfig as any)[group];
    const darkTheme:
      | Record<keyof typeof DefaultVariables, typeof vars>
      | undefined = (darkThemeConfig as any)[group];

    return {
      ...acc,
      [group]: {
        ...vars,
        ...(theme || {}),
        ...(darkTheme || {}),
      },
    };
  }, DefaultVariables);
};

/**
 * Provide all the theme exposed with useTheme()
 */
const buildTheme = <F, G, I, A, L, C>(
  darkMode: boolean,
  baseTheme: Theme<F, G, I, A, L, C>,
  themeConfig: Partial<Theme<F, G, I, A, L, C>>,
  darkThemeConfig: Partial<Theme<F, G, I, A, L, C>>,
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    darkMode,
    NavigationTheme: mergeNavigationTheme(
      darkMode ? DarkTheme : DefaultTheme,
      baseTheme.NavigationColors,
    ),
  };
};

/**
 * Merge theme from baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeTheme = <F, G, I, A, L, C>(
  baseTheme: Theme<F, G, I, A, L, C>,
  theme: Partial<Theme<F, G, I, A, L, C>>,
  darkTheme: Partial<Theme<F, G, I, A, L, C>>,
) =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...((value as any) || {}),
        ...((theme as any)[key] || {}),
        ...((darkTheme as any)[key] || {}),
      },
    }),
    baseTheme,
  ) as typeof baseTheme;

/**
 * Merge the React Navigation Theme
 *
 * @param reactNavigationTheme
 * @param overrideColors
 * @return {{colors}}
 */
const mergeNavigationTheme = (
  reactNavigationTheme: ThemeNavigationTheme,
  overrideColors: Partial<ThemeNavigationColors>,
) => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
});