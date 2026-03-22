import { MealDashboardView } from '@/components/meal/MealDashboardView'
import { isValidLang, type Lang } from '@/lib/i18n'

export default function DashboardPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'

  return <MealDashboardView lang={lang} compact />
}
