'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logOut } from '@/Redux/Actions/UserAction'

function ClientForceLogout() {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(logOut({ router }))
    }, [dispatch, router])

    return <></>
}

export default ClientForceLogout
