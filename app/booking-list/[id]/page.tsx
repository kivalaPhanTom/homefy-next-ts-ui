import BookingDetailView from './BookingDetailView'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolved = await searchParams
  const statusParam = Array.isArray(resolved.status) ? resolved.status[0] : resolved.status
  const status = statusParam === 'cancelled' ? 'cancelled' : 'upcoming'
  return <BookingDetailView status={status} />
}
