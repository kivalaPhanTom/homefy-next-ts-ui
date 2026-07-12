'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './CreateListingButton.module.scss'
import iconCreate from '@/assets/iconCreateListing.svg'

function CreateListingButton() {

    return (
        <>
            <div className={styles['addItem']}>
                <div className={styles['addItemContainer']}>
                    <Link href={`/admin/listing_creation`} className={styles['linkImg']}>
                        <div className={styles['div_img']}>
                            <Image src={iconCreate} alt='product image' className={styles['iconCreate']}/>
                        </div>
                    </Link>

                    <div className={styles['info']}>
                        <div className={styles['div_title']}>
                            <div className={styles['title']}>
                                <p>{'Create a listing'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateListingButton
