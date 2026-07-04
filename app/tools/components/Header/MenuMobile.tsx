'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Header.module.scss'
import Link from 'next/link'
import logo from '@/assets/Homefy-logo.webp'
import type { RootState } from '@/Redux/store'

function MenuMobile() {
  const { isOpenHeaderMenuMobile } = useSelector((state: RootState) => state.homeSlice)
  return (
    <div className={styles['menuMb'] + ' ' + styles[isOpenHeaderMenuMobile ? 'menuMbOpen' : '']}>
      <div>
        <div className={styles['ul_menuMb']}>
          <div>
            <Link href={'/'} className={styles['linkMenuMb']}>
              Home
            </Link>
          </div>
          <div>
            <Link href={'/'} className={styles['linkMenuMb']}>
              Properties
            </Link>
          </div>
          <div>
            <Link href={'/'} className={styles['linkMenuMb']}>
              Book an Inspection
            </Link>
          </div>
          <div>
            <Link href={'/'} className={styles['linkMenuMb']}>
              FAQs
            </Link>
          </div>
          <div>
            <Link href={'/'} className={styles['linkMenuMb']}>
              Our partners
            </Link>
          </div>
        </div>

        <div className={styles['divLoginBtnMobile']}>
          <div className={styles['loginBtnMobile']}>
            <p>Login</p>
          </div>
        </div>
      </div>


    </div>
  )
}


export default MenuMobile
