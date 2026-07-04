import styles from './ListHomeRoom.module.scss'
import RoomItem from '@/app/tools/components/RoomItem/RoomItem';
import ExploreBtn from '@/app/tools/components/ListHomeRoom/ExploreBtn';
import ClientEmptyToRefreshApi from './ClientEmptyToRefreshApi';
interface ListHomeRoomProps {
    dataPage: any[];
    isRefreshToken: boolean;
    newAccessToken: string;
    newRefreshToken: string;
    newExpiredTime: number;
}
const ListHomeRoom = (props: ListHomeRoomProps) => {
    let { dataPage, isRefreshToken, newAccessToken, newRefreshToken, newExpiredTime } = props
    dataPage = dataPage || []
    return (
        <>
            <div className={styles['main']}>
                <div className={styles['container']}>
                    <ExploreBtn />
                    <div className={styles['roomList']}>
                        {
                            dataPage.length > 0 && (
                                <>
                                    {
                                        dataPage.map((el) => (
                                            <div className={styles['roomItem']} key={el.id}>
                                                <RoomItem
                                                    key={el.id}
                                                    data={el}
                                                />
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <ClientEmptyToRefreshApi
                isRefreshToken={isRefreshToken}
                newAccessToken={newAccessToken}
                newRefreshToken={newRefreshToken}
                newExpiredTime={newExpiredTime}
            />
        </>
    );
};

export default ListHomeRoom;
