import { MealDonateClient } from '@/components/meal/MealDonateClient'
import { isValidLang, type Lang } from '@/lib/i18n'

export default function DonatePage({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams?: { region?: string }
}) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'

  return <MealDonateClient lang={lang} initialRegion={searchParams?.region} />
}
