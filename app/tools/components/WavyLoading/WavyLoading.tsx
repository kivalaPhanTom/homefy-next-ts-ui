
import styles from './WavyLoading.module.scss'
interface WavyLoadingProps {
    color?: string
}
function WavyLoading(props: WavyLoadingProps) {
    const { color } = props
    return (
        <div className={styles["spinner"]}>
            <div className={styles["bounce1"]} style={{ backgroundColor: color ? color : 'white' }}></div>
            <div className={styles["bounce2"]} style={{ backgroundColor: color ? color : 'white' }}></div>
            <div className={styles["bounce3"]} style={{ backgroundColor: color ? color : 'white' }}></div>
        </div>
    )
}

export default WavyLoading
