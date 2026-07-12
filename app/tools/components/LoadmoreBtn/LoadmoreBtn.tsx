'use client'
import WavyLoading from '@/app/tools/components/LoadmoreBtn/WavyLoading'
import styles from './LoadmoreBtn.module.scss'

interface LoadmoreBtnProps {  
    isLoading:boolean,
    handleLoadMore: () => void
}
function LoadmoreBtn(props: LoadmoreBtnProps) {
    const { handleLoadMore, isLoading = false } = props
    const handleLoad = () => {
        handleLoadMore()
    }
    return (
        <div className={styles['loadmoreBtn']}>
            <div className={styles['loadmoreBtnContainer']}>
                <button
                    className={styles['btnItem']}
                    onClick={isLoading ? () => { } : handleLoad}
                >
                    {isLoading ? <WavyLoading /> : 'Load more'}
                </button>
            </div>
        </div>
    )
}

export default LoadmoreBtn