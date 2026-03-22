import { redirect } from 'next/navigation'

// Legacy route — redirects to the canonical /proof-of-meal
export default function ProofOfEatRedirect({ params }: { params: { lang: string } }) {
  redirect(`/${params.lang}/proof-of-meal`)
}
