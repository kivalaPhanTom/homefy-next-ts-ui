import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from '../../loading'
const CreateListingForm = dynamic(() => import('./CreateListingForm'), {
    ssr: false,
})

const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <CreateListingForm />
        </Suspense>

    );
};




export default Page;
