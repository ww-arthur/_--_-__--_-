import { useTheme } from 'vuetify'

export const useThemeOptions = () => {
  const theme = useTheme()

  const defaultVariant = computed<'flat' | 'outlined' | 'text' | 'elevated' | 'tonal' | 'plain' | undefined>(() => {
    return theme.name.value === 'dark' ? 'outlined' : undefined
  })

  function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }

  return {
    defaultVariant,
    theme,
    toggleTheme,
  }
}