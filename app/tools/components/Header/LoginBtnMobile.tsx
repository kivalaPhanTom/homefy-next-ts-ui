'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenHeaderMenuMobile } from '@/Redux/slices/HomeSlice'
import styles from './Header.module.scss'
import type { RootState } from '@/Redux/store'

function LoginBtnMobile() {
    const dispatch = useDispatch()
    const { isOpenHeaderMenuMobile } = useSelector((state:RootState) => state.homeSlice)

    const handleSetOpenMenu = ():void => {
        dispatch(setOpenHeaderMenuMobile(!isOpenHeaderMenuMobile))
    }
    return (
        <div className={styles['divLoginBtnMb']} onClick={() => handleSetOpenMenu()}>
            <div className={styles['']}>
                <div className={styles['bar'] + ' ' + styles[isOpenHeaderMenuMobile ? 'animationDiv1' : '']}>

                </div>
                <div className={styles['bar'] + ' ' + styles[isOpenHeaderMenuMobile ? 'animationDiv2' : '']}>

                </div>
                <div className={styles['bar'] + ' ' + styles[isOpenHeaderMenuMobile ? 'animationDiv3' : '']}>

                </div>
            </div>
        </div>
    )
}

export default LoginBtnMobile