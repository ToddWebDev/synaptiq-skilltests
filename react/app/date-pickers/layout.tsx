'use client'
import { AppProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider i18n={enTranslations}>
      <main className='min-h-screen bg-slate-100 container mx-auto'>
        {children}
      </main>
    </AppProvider>
  )
}
