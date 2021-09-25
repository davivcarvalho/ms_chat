import { Injectable } from '@nestjs/common'
import { Expo } from 'expo-server-sdk'

@Injectable()
export class NotificationService {
  constructor(private expoClient = new Expo()) {}

  notify(usersNotificationsToken: string[], title: string, message: string) {
    // Create the messages that you want to send to clients
    const messages = []
    for (const pushToken of usersNotificationsToken) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        continue
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: 'default',
        body: message,
        title
      })
    }

    const chunks = this.expoClient.chunkPushNotifications(messages)
    ;(async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          await this.expoClient.sendPushNotificationsAsync(chunk)
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }
}
