import BookingDetailView from './BookingDetailView'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: bookingCode } = await params
  return <BookingDetailView key={bookingCode} bookingCode={bookingCode} />
}
