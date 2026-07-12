'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/Redux/store';
import styles from './AdminPortal.module.scss'
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice'

function page() {
    const [height, setHeight] = useState(0)
    const dispatch = useDispatch()
    const body = typeof window !== 'undefined' ? document.body : null
    const html = typeof window !== 'undefined' ? document.documentElement : null
    const [bodyHeight] = useState(() => {
        const values = [
            body?.scrollHeight ?? 0,
            body?.offsetHeight ?? 0,
            body?.getBoundingClientRect()?.height ?? 0,
            html?.clientHeight ?? 0,
            html?.scrollHeight ?? 0,
            html?.offsetHeight ?? 0,
        ]
        return Math.max(...values)
    })
    const { isLogin } = useSelector((state: RootState) => state.signInSlice)
    const [isClient, setIsClient] = useState(false)
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!handleCheckUserTokenExits()) dispatch(setOpenPopupSignIn(true))
    }, [isLogin])

    useEffect(() => {
        const body = document.body
        const html = document.documentElement
        const bodyH = Math.max(
            body?.scrollHeight ?? 0,
            body?.offsetHeight ?? 0,
            body?.getBoundingClientRect()?.height ?? 0,
            html?.clientHeight ?? 0,
            html?.scrollHeight ?? 0,
            html?.offsetHeight ?? 0,
        )
        const headerRef = document.getElementById('header')
        const footerRef = document.getElementById('footer')
        if (headerRef && footerRef && bodyH) {
            const headerHeight = headerRef.clientHeight
            const footerHeight = footerRef.clientHeight
            const resultHeight = bodyH - headerHeight - footerHeight
            setHeight(resultHeight);
        }
    }, [bodyHeight, typeof window !== 'undefined'])

    const PORTAL_MENU = [
        {
            name: 'Manage Listings',
            link: '/admin/listing-managerment',
        },
        {
            name: 'Manage Applications',
            link: '/admin/application-managerment',
        },
        {
            name: 'Manage Tenants',
            link: '/admin/tenant-managerment',
        }
    ];
    const cssObject: Record<string, string> = {}
    if (height > 0) {
        cssObject.height = `${height}px`
    }

    const handleOpenLoginPopup = ():void => {
        dispatch(setOpenPopupSignIn(true))
    }
    const handleLogout = ():void => {

    }
    return (
        <div className={styles['adminPortal']}>
            <div className={styles['adminPortalContainer']}>
                <div className={styles['div_title']}>
                    <p className={styles['title']}>ADMIN PORTAL</p>
                </div>
                <div className={styles['div_logOut']}>
                    <div className={styles['loginBtn']} onClick={isClient && handleCheckUserTokenExits() ? handleLogout : handleOpenLoginPopup}>
                        <p>{isClient && handleCheckUserTokenExits() ? 'Logout' : 'Login'}</p>
                    </div>
                </div>
                <div className={styles['listMenu']}>
                    {
                        isClient && handleCheckUserTokenExits() ? (
                            <>
                                {
                                    PORTAL_MENU.map((item, index) => (
                                        <Link key={index} href={item.link} className={styles['linkMenuItem']}>
                                            <div className={styles['menuItem']} key={index}>
                                                <div className={styles['menuItemContainer']} key={index}>
                                                    <div>
                                                        <div className={styles['menuItemName']}>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {
                                    PORTAL_MENU.map((item, index) => (
                                        <div className={styles['menuItem']} key={index}>
                                            <div className={styles['menuItemContainer']} key={index}>
                                                <div key={index}>
                                                    <div className={styles['menuItemName']}>
                                                        <p>{item.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default page
