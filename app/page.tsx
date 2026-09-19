import { cookies } from 'next/headers'
import { Suspense } from 'react'
import Banner from "@/components/Banner/Banner"
import Faction from "./tools/components/Faction/Faction";
import ListHomeRoom from "@/app/tools/components/ListHomeRoom/ListHomeRoom";
import Stories from "@/app/tools/components/Stories/Stories";
import { USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from "@/common/ParamsCommon/ParamsCommon"
import { getProductsApi } from '@/Services/NextProductServices'
import ClientForceLogout from './tools/components/ClientForceLogout/ClientForceLogout'
import Loading from './loading'
import { DEFAULT_LIMIT, DEFAULT_OFFSET, PAGE_INDEX } from '@/common/ParamsCommon/ParamsCommon'

export default async function Home() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(USER_TOKEN)
  const expired_time = cookieStore.get(EXPIRED_TIME_TOKEN)
  const refreshToken = cookieStore.get(REFRESH_TOKEN_IN_LOCALSTORAGE)
  let isRefreshToken = false
  let forceLogout = false
  let listData = []
  let newAccessToken: string | undefined
  let newRefreshToken: string | undefined
  let newExpiredTime: number | string | undefined

  try {
    const data: any = await getProductsApi({
      limit: 12,
      offset: 0,
      sessionToken: sessionToken?.value || '',
      expired_time: expired_time ? expired_time.value : null,
      refreshToken: refreshToken || '',
    })
    listData = data?.data?.result?.data || []
    if (data?.options?.isRefreshToken) {
      isRefreshToken = true
    }
    if (data?.options?.forceLogout) {
      forceLogout = true
    }
    newAccessToken = data?.options?.newTokenInfo?.access_token
    newRefreshToken = data?.options?.newTokenInfo?.refresh_token
    newExpiredTime = data?.options?.newTokenInfo?.expired_time
  } catch (error) {
    console.error('[Home] Failed to fetch products:', error)
  }

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Banner />
        <Faction />
        <ListHomeRoom
          dataPage={listData}
          isRefreshToken={isRefreshToken}
          newAccessToken={newAccessToken ?? ''}
          newRefreshToken={newRefreshToken ?? ''}
          newExpiredTime={Number(newExpiredTime ?? 0)}
        />
        <Stories />
        {forceLogout && <ClientForceLogout />}
      </div>
    </Suspense>
  );
}