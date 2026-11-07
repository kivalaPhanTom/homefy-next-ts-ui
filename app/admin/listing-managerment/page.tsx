import { DEFAULT_LIMIT, DEFAULT_OFFSET, PAGE_INDEX } from '@/common/ParamsCommon/ParamsCommon'
import { Suspense } from 'react'
import Loading from '../../loading'
import ManageListings from './ManageListings'

interface PageProps {
    searchParams?: Promise<{
        limit?: string | number
        offset?: string | number
        pageIndex?: string | number
    }>
}

const Page = async (props: PageProps) => {
    const searchParams = (await props.searchParams) ?? {}
    const limit = searchParams.limit ?? DEFAULT_LIMIT
    const offset = searchParams.offset ?? DEFAULT_OFFSET
    const pageIndex = searchParams.pageIndex ?? PAGE_INDEX
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
