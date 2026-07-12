'use client'

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from 'antd';
import styles from './Header.module.scss';
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice';
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent';
import AccoutMenuPopup from './AccoutMenuPopup';
import type { RootState } from '@/Redux/store';

function LoginBtn() {
    const dispatch = useDispatch();

    const [isOpenPopover, setOpenPopover] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    // ✅ Hook phải nằm trước mọi return
    const { usernameLogin } = useSelector(
        (state: RootState) => state.signInSlice
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    // ✅ Sau khi gọi hết Hooks mới được return
    if (!mounted) return null;

    const handleOpenModalLogin = ():void => {
        dispatch(setOpenPopupSignIn(true));
    };

    const isLogin = handleCheckUserTokenExits();
    console.log('isOpenPopover:', isOpenPopover)
    return (
        <>
            {isLogin ? (
                <Popover
                    open={isOpenPopover}
                    placement="leftTop"
                    title=""
                    arrow={false}
                    content={
                        <AccoutMenuPopup
                            setOpenPopover={setOpenPopover}
                            username={usernameLogin}
                        />
                    }
                >
                    <div
                        className={styles['divLoginBtn']}
                        onClick={() => setOpenPopover(prev => !prev)}
                    >
                        <div className={styles['loginBtn']}>
                            <p>{usernameLogin}</p>
                        </div>
                    </div>
                </Popover>
            ) : (
                <div
                    className={styles['divLoginBtn']}
                    onClick={handleOpenModalLogin}
                >
                    <div className={styles['loginBtn']}>
                        <p>Login</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginBtn;