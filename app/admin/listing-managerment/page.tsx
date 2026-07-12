import dynamic from 'next/dynamic'
import { DEFAULT_LIMIT, DEFAULT_OFFSET, PAGE_INDEX } from '@/common/ParamsCommon/ParamsCommon'
import { Suspense } from 'react'
import Loading from '../../loading'
const ManageListings = dynamic(() => import('./ManageListings'), {
    ssr: false,
})
const Page = (props) => {
    const limit = props?.searchParams?.limit ?? DEFAULT_LIMIT
    const offset = props?.searchParams?.offset ?? DEFAULT_OFFSET
    const pageIndex = props?.searchParams?.pageIndex ?? PAGE_INDEX
    return (
        <Suspense fallback={<Loading />}>
            <ManageListings
                limit={Number(limit)}
                offset={Number(offset)}
                pageIndex={Number(pageIndex)}
            />
        </Suspense>
    );
};

export default Page;
