import { createContext } from 'react';
import { NotificationPayload } from './types';

export type NotificationContextType = {
    notifications: NotificationPayload[];
    addNotification: (notification: NotificationPayload) => void;
    takeNotification: () => NotificationPayload | void;
    resetNotifications: () => void;
};

export const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    addNotification: () => {},
    takeNotification: () => {},
    resetNotifications: () => {},
});
