import { MealNav } from '@/components/meal/MealNav'
import { MealDashboardView } from '@/components/meal/MealDashboardView'
import { isValidLang, type Lang } from '@/lib/i18n'

export default function MealDashboardPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <MealDashboardView lang={lang} />
    </div>
  )
}
