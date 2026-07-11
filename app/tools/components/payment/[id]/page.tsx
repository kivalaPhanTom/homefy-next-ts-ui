import PaymentUI from "../../tools/components/PaymentUI/PaymentUI"



function Page(props) {
   const { params } = props
   const bookingId =  params.id
    return (
        <PaymentUI 
        bookingId={bookingId}
        />
    
    )
}


export default Page
