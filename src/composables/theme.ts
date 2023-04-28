import cookie from 'js-cookie';
import { type App, ref, inject } from 'vue'

export enum Theme {
  Default = 'default',
  Dark = 'dark'
}

export const createTheme = (initTheme: Theme) => {
  const theme = ref(initTheme || Theme.Default);

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    cookie.set('theme', newTheme);
  }

  const toogleTheme = () => setTheme(theme.value === Theme.Dark ? Theme.Default : Theme.Dark);

  const themeState = { theme, setTheme, toogleTheme };

  return {
    ...themeState,
    install(app: App) {
      app.provide('theme', themeState)
    }
  }
};

export const useTheme = () => inject('theme') as Omit<ReturnType<typeof createTheme>, 'install'>

