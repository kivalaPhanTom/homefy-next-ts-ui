import { cookies } from 'next/headers'

import BookingConfirm from '@/components/BookingConfirm/BookingConfirm'
import { USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from "@/common/ParamsCommon/ParamsCommon"

async function Page() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(USER_TOKEN)
  const expired_time = cookieStore.get(EXPIRED_TIME_TOKEN)
  const refreshToken = cookieStore.get(REFRESH_TOKEN_IN_LOCALSTORAGE)
  let isRefreshToken = false
  return (
    <BookingConfirm
      sessionToken={sessionToken?.value || null}
      expired_time={expired_time?.value ? Number(expired_time.value) : null}
      refreshToken={refreshToken?.value || null}
      isRefreshToken={isRefreshToken}
    />
  )
}


export default Page
