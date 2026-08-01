import { useMemo, useState, type ReactNode } from 'react'
import { englishTranslations } from './englishTranslations'
import { I18nContext, type I18nContextValue, type Language } from './i18nContext'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() =>
    localStorage.getItem('api-test.language') === 'en' ? 'en' : 'pt',
  )

  function setLanguage(nextLanguage: Language) {
    localStorage.setItem('api-test.language', nextLanguage)
    setLanguageState(nextLanguage)
  }

  const value = useMemo<I18nContextValue>(() => ({
    language,
    setLanguage,
    tr: (text) => language === 'en' ? englishTranslations[text] ?? text : text,
  }), [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
