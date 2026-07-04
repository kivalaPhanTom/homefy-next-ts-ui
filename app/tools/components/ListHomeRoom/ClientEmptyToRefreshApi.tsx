'use client'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import {updateAuthenBrowser} from "@/Redux/Actions/TokenAction"
interface ClientEmptyToRefreshApiProps {
    isRefreshToken: boolean;
    newAccessToken: string;
    newRefreshToken: string;
    newExpiredTime: number;
}

function ClientEmptyToRefreshApi(props: ClientEmptyToRefreshApiProps) {
    const dispatch = useDispatch()
    const { isRefreshToken, newAccessToken, newRefreshToken, newExpiredTime } = props
    
    useEffect(()=>{
      if(isRefreshToken){
         const payload = {
            access_token:newAccessToken,
            refresh_token:newRefreshToken,
            expired_time:newExpiredTime
         }
         dispatch(updateAuthenBrowser(payload))
      }
    },[isRefreshToken])

    return (
        <></>
    )
}

export default ClientEmptyToRefreshApi