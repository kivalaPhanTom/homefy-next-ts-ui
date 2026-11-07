import Image from 'next/image'
import banner from '@/assets/banner.webp'
import styles from './Banner.module.scss'
import BannerSearch from './BannerSearch';

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
                            <h1 className={styles['title']}>Nơi dừng chân lý tưởng cho mọi hành trình</h1>
                            <div className={styles['divSubTitle']}>
                                <p className={styles['subTitle']}>Đặt phòng khách sạn, resort, homestay trên khắp Việt Nam — nhanh gọn, minh bạch, giá tốt.</p>
                            </div>

                            <BannerSearch />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Banner;
