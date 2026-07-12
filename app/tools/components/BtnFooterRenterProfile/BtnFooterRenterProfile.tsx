'use client'
import { Button } from 'antd'
import WavyLoading from '@/app/tools/components/WavyLoading/WavyLoading'
import styles from './BtnFooterRenterProfile.module.scss'

interface BtnFooterRenterProfileProps {
    handleCancel: () => void,
    isDisableSubmit: boolean,
    handleSubmit: () => void,
    isLoading: boolean
}
function BtnFooterRenterProfile(props: BtnFooterRenterProfileProps) {
    const {handleCancel, isDisableSubmit, handleSubmit, isLoading} = props
    return (
        <div className={styles['listBtnAction']}>
            <div className={styles['listBtnActionContainer']}>
                <Button className={styles['btnItem'] + ' ' + styles['cancelBtn']} onClick={handleCancel}>Cancel</Button>
                <Button 
                    className={styles['btnItem'] + ' ' + styles['saveAndBackBtn']+' '+styles[isDisableSubmit ? 'disableSubmit':'']} 
                    htmlType='submit' 
                    onClick={isDisableSubmit ? ()=>{} :handleSubmit}
                    disabled={isDisableSubmit ? true :false}
                >
                    {isLoading ? <WavyLoading/> : ' Save and back'}
                </Button>
            </div>
        </div>
    )
}



export default BtnFooterRenterProfile
