
'use client'
import { useState, useEffect } from 'react'
import { useInView } from "react-intersection-observer";
import Link from 'next/link'
import { BiLogoInstagram, BiLogoFacebook, BiLogoTumblr, BiLogoTwitter } from 'react-icons/bi'
import { CiMail } from "react-icons/ci"
import Image from 'next/image'
import styles from './Footer.module.scss'
import logo from '@/assets/Homefy-logo.webp'

function Footer() {
    const [countView, setCountView] = useState<number>(0);
    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            if (countView === 0) setCountView(1)
        }
    }, [inView]);

    return (
        <div className={styles['main']}>
            <div className={styles['container']}>
                <div ref={ref} className={styles['content'] + ' ' + styles[countView > 0 ? 'contentAnimation' : '']}>
                    <div className={styles['left']}>
                        <div>
                            <Link href={'/'} className={styles['linkMenu']}>
                                <div className={styles['logoImg']}>
                                    <Image src={logo} alt='homefy logo' className={styles['logo']} />
                                </div>

                            </Link>
                            <div className={styles['listInfo']}>
                                <p className={styles['contactTxt']}>contact us</p>
                                <p className={styles['text']}>Level 1, 1-5 Link Road, Zetland, NSW 2017</p>
                                <p className={styles['text']}>info@themysahouse.com</p>
                                <p className={styles['text']}>+61 411 599 018</p>
                                <p className={styles['text']}>Become an ambassador</p>
                            </div>

                            <div className={styles['socialMediaList']}>
                                <div className={styles['iconFB']}>
                                    <BiLogoFacebook />
                                </div>

                                <div className={styles['iconInsta']}>
                                    <BiLogoInstagram />
                                </div>

                                <div className={styles['iconTumblr']}>
                                    <BiLogoTumblr />
                                </div>

                                <div className={styles['iconTwitter']}>
                                    <BiLogoTwitter />
                                </div>
                            </div>
                            <div className={styles['connectText']}>
                                <p>Connect_Grow_Enjoy</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['right']}>
                        <div>
                            <p className={styles['subscribeTxt']}>Subscribe to our newsletter</p>
                            <div>
                                <form>
                                    <div className={styles['emailForm']}>
                                        <input className={styles['emailInput']} placeholder='Enter email address' />
                                        <CiMail className={styles['mailIcon']} />
                                    </div>

                                    <div>
                                        <input className={styles['submitInput']} type='submit' value="Subscrive" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['line'] + ' ' + styles[countView > 0 ? 'textCenterAnimation' : '']}>

                </div>
                <div className={styles['textCenter'] + ' ' + styles[countView > 0 ? 'textCenterAnimation' : '']}>
                    <p>homefy.com.au is owned and operated by @ Zoette Pty Ltd.</p>
                </div>
            </div>
        </div>
    )
}


export default Footer
