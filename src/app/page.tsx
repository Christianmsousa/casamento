import { redirect } from 'next/navigation'

/** Raiz do site = convite completo (evita confundir `/` com `/invite`). */
export default function HomePage() {
  redirect('/invite')
}
