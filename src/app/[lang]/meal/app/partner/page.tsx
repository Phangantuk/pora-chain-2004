import { redirect } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n'

export default function LegacyMealAppPartnerPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  redirect(`/${lang}/meal/app/operations`)
}
