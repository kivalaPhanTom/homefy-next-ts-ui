'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BiLogoInstagram, BiLogoFacebook, BiLogoTumblr, BiLogoTwitter } from 'react-icons/bi'
import { CiMail } from "react-icons/ci"
import Image from 'next/image'
import { Waypoint } from 'react-waypoint';
import styles from './Footer.module.scss'
import logo from '@/assets/Homefy-logo.webp'

function FooterContent(props) {
    const [countView, setCountView] = useState(0);
    const handleWaypointEnter = () => {
        if (countView === 0) setCountView(1)
    };
    return (
        <Waypoint onEnter={handleWaypointEnter}>
            <div className={styles['content']+ ' ' + styles[countView  > 0 ? 'contentAnimation' : '']}>
                <div className={styles['left']}>
                    <div>
                        <Link href={'/'} className={styles['linkMenu']}>
                            <div className={styles['logoImg']}>
                                <Image src={logo} alt='homefy logo' className={styles['logo']} />
                            </div>

                        </Link>
                        <p className={styles['contactTxt']}>contact us</p>
                        <p className={styles['text']}>Level 1, 1-5 Link Road, Zetland, NSW 2017</p>
                        <p className={styles['text']}>info@themysahouse.com</p>
                        <p className={styles['text']}>+61 411 599 018</p>
                        <p className={styles['text']}>Become an ambassador</p>
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
                                    <CiMail />
                                </div>

                                <div>
                                    <input className={styles['submitInput']} type='submit' value="Subscrive" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Waypoint>
    )
}


export default FooterContent
