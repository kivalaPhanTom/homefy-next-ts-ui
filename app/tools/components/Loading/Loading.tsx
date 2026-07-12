'use client'
import Image from 'next/image'
import styles from './Loading.module.scss'
import logo from '@/assets/iconLoading1.webp'

function Loading() {

    return (
        <>
            <div className={styles['loading-screen']}>
                <div className={styles['loadingArea']}>
                    <div className={styles['loader']}>
                    </div >
                    <div className={styles['div_iconLoading']}>
                        <Image className={styles['iconLoading']} src={logo} alt='icon loading' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading
