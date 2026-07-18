import { Suspense } from 'react'
import Loading from '../../../loading'
import EditListingForm from './EditListingForm'

async function Page(props: { params: Promise<{ id: string }> }) {
    const { params } = props
     const resolvedParams = await params
    return (
        <Suspense fallback={<Loading />}>
            <EditListingForm roomId={resolvedParams?.id} />
        </Suspense>
    );
};


export default Page;
