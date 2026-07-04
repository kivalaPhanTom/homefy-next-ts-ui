'use client'
import Image from 'next/image'
import styles from './Faction.module.scss'
import model from '@/assets/model.webp'
import dynamic from 'next/dynamic'
const FactorContent = dynamic(() => import('./FactorContent'), {
    ssr: false,
})

const Faction = () => {
    return (
        <div className={styles['main']}>
            <div className={styles['container']}>
                <div className={styles['left']}>
                    <FactorContent />
                </div>
                <div className={styles['right']}>
                    {/* <div className={styles['modelImg']}> */}
                        <Image src={model} alt='model' className={styles['modelImg']}/>
                    {/* </div> */}

                </div>
            </div>
        </div>
    );
};

export default Faction;
