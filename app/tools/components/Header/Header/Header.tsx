
// 'use client'
import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/Homefy-logo.webp'
import LoginBtn from './LoginBtn'
import MenuMobile from './MenuMobile'
import LoginBtnMobile from './LoginBtnMobile'

const Header = () => {
    return (
        <div className={styles['main']}>
            <div className={styles['container']}>
                <div className={styles['logo']}>
                    <Link href={'/'} className={styles['link_logo']}>
                        <div className={styles['logo']}>
                            <Image src={logo} alt='homefy logo' />
                        </div>
                    </Link>
                </div>
                <div className={styles['menu']}>
                    <ul className={styles['ul_menu']}>
                        <li>
                            <Link href={'/'} className={styles['linkMenu']}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className={styles['linkMenu']}>
                                Properties
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className={styles['linkMenu']}>
                                Book an Inspection
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className={styles['linkMenu']}>
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className={styles['linkMenu']}>
                                Our partners
                            </Link>
                        </li>
                    </ul>
                </div>
                <LoginBtn />
                <LoginBtnMobile />
            </div>
            <MenuMobile />
        </div>
    );
};

export default Header;
