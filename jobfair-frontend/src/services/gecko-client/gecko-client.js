import { geckos } from '@geckos.io/client';
import EventEmitter from 'events';

export class GeckoClient extends EventEmitter {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  joinChannel(companyBoothId, userId, initialPosition, initialQuaternion) {
    this.companyBoothId = companyBoothId;
    this.userId = userId;
    const auth = `${this.companyBoothId}/${this.userId}/${JSON.stringify(initialPosition)}/${JSON.stringify(
      initialQuaternion
    )}`;
    this.channel = geckos({
      url: 'https://geckos.jobhub.works',
      port: 3001,
      authorization: auth
    });

    const self = this;
    this.channel.onConnect((error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
        return;
      }
      self.subscribeClientEvents();
    });
  }

  subscribeClientEvents() {
    const clientEvents = ['init', 'new-user-connect', 'user-left', 'move', 'stop'];
    const self = this;
    clientEvents.forEach((eventName) => {
      self.channel.on(eventName, (...args) => {
        self.emit(eventName, ...args);
      });
    });
  }

  move(coordinate) {
    this.channel.emit('move', JSON.stringify(coordinate));
  }

  stop() {
    this.channel.emit('stop');
  }

  close() {
    try {
      if (this.channel !== undefined) this.channel?.close();
    } catch (e) {
      //ignore
    }
  }
}
