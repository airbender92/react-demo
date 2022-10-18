import { useCallback } from "react";

import { useAddNotificationContext } from "./useAddNotificationContext";
import { NotificationOptions, NotificationType } from "./types";

export const useNotify = () => {
  const addNotification = useAddNotificationContext();
  return useCallback(
    (
      message: string,
      options: NotificationOptions & { type?: NotificationType } = {}
    ) => {
      const {
        type: messageType = 'info',
        ...notificationOptions
      } = options;
      addNotification({
        message,
        type: messageType,
        notificationOptions,
      })
    },
    [addNotification]
  )
}