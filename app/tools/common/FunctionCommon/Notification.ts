import { notification } from 'antd'

export const Notification = {
  openNotificationSuccess,
  openNotificationError,
}

function openNotificationSuccess(title:string) {
  notification.success({
    title: title,
    description: '',
    className: 'success-mess',
    duration: 4,
  });
}

function openNotificationError(title:string) {
  notification.error({
    title: title,
    description: '',
    className: 'success-mess',
    duration: 4,
  });
}
