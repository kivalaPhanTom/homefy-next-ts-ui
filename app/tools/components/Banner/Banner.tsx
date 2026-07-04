import Image from 'next/image'
import { CiLocationOn } from "react-icons/ci";
import Link from 'next/link'
import banner from '@/assets/banner.webp'
import styles from './Banner.module.scss'
import LocationFilter from './LocationFilter';
import SizeFilter from './SizeFilter';

const Banner = () => {
    return (
        <div className={styles['main']}>
            <div className={styles['container']}>
                <div className={styles['positionArea']}>
                    <div className={styles['backdrop']}>
                        <Image src={banner} alt='banner' className={styles['imgBackdrop']} />
                    </div>
                    <div className={styles['backdropOverLay']}>

                    </div>
                    <div className={styles['content']}>
                        <div>
                            <h1 className={styles['title']}>thoughtfully designed, move in ready homes</h1>
                            <div className={styles['divSubTitle']}>
                                <p className={styles['subTitle']}>The easiest renting experience for those looking for good design, flexibility and a seamless service.</p>
                            </div>

                            <div className={styles['action']}>
                                <div className={styles['filterLeft']}>
                                    <div className={styles['locationFilter']}>
                                        <LocationFilter />
                                    </div>
                                    <div className={styles['sizeFilter']}>
                                        <SizeFilter />
                                    </div>
                                </div>
                                <div className={styles['filterRight']}>
                                    <div >
                                        <div className={styles['allPropertiesBtn']}>
                                            <Link href={'/filter'} className={styles['allPropertiesBtnLink']}>
                                                All properties
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Banner;
