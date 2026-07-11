import PaymentUI from "../../tools/components/PaymentUI/PaymentUI"



async  function Page(props: { params: Promise<{ id: string }> }) {
    const { params } = props
    const resolvedParams = await params
    const bookingId: string = resolvedParams.id
    return (
        <PaymentUI
            bookingId={bookingId}
        />

    )
}


export default Page
