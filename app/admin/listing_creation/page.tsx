import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from '../../loading'
import CreateListingForm from './CreateListingForm'

const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <CreateListingForm />
        </Suspense>

    );
};




export default Page;
