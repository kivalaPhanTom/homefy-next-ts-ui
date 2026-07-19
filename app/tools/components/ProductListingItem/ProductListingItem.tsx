'use client'
import { BsDashCircleFill } from "react-icons/bs"
import Link from 'next/link'
import Image from 'next/image'
import { AiFillCheckCircle } from 'react-icons/ai'
import styles from './ProductListingItem.module.scss'
import noImage from '@/assets/empty.webp'
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import type { Dispatch, SetStateAction } from 'react'

interface ProductListingItemType {
    data: any,
    handleSetOpenConfirmDelete: (values: boolean) => void,
    setItemDeleted: Dispatch<SetStateAction<any>>
}
function ProductListingItem(props: ProductListingItemType) {
    const { data, handleSetOpenConfirmDelete, setItemDeleted } = props
    const handleDelete = () => {
        handleSetOpenConfirmDelete(true)
        setItemDeleted(data)
    }

    const imageSrc = typeof data?.images?.[0]?.path === 'string' ? data.images[0].path : noImage
    const shouldUseImgTag = typeof imageSrc === 'string'

    return (
        <>
            <div className={styles['productItem']}>
                <div className={styles['productItemContainer']}>
                    <div className={styles['headerProduct']}>
                        <div className={styles['deleteProduct']}>
                            <BsDashCircleFill className={styles['deleteProductIcon']} onClick={handleDelete} />
                        </div>
                        <div className={styles['imgProduct']}>
                            <Link href={handleCheckUserTokenExits() ? `/admin/edit_listing/${data.id}` : ''} className={styles['linkDetailRoom']}>
                                <div className={styles['productImg']}>
                                    {shouldUseImgTag && imageSrc.startsWith('http') ? (
                                        <img
                                            className={styles['imageRoom']}
                                            src={imageSrc}
                                            alt='product image'
                                        />
                                    ) : (
                                        <Image
                                            fill
                                            className={styles['imageRoom']}
                                            src={imageSrc}
                                            alt='product image'
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={styles['productInfo']}>
                        <div className={styles['nameAndPrice']}>
                            <div className={styles['name']}>
                                <p>{`Listing ID: ${data.code}`}</p>
                            </div>
                        </div>
                        {/* <div className={styles['statusAndStar']}>
                            <div className={styles['status']}>
                                <p>Published</p>
                                <div className={styles['checkStatus']}>
                                    <AiFillCheckCircle />
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </>

    )
}


export default ProductListingItem
