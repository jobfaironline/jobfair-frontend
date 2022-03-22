import {geckos} from "@geckos.io/client";
import EventEmitter from "events";

export class GeckoClient extends EventEmitter{
  constructor() {
    super()
  }

  joinChannel(companyBoothId, userId, initialPosition){
    this.companyBoothId = companyBoothId;
    this.userId = userId;
    const auth = `${this.companyBoothId}/${this.userId}/${JSON.stringify(initialPosition)}`
    this.channel = geckos({port: 3001, authorization: auth});

    const self = this;
    this.channel.onConnect(error => {
      if (error) {
        console.error(error.message);
        return;
      }




      self.subscribeClientEvents()
    })
  }

  subscribeClientEvents () {
    const clientEvents = [
      'init',
      'new-user-connect',
      'user-left',
      'move'
    ]
    const self = this;
    clientEvents.forEach((eventName) => {
      self.channel.on(eventName, (...args) => {
        self.emit(eventName, ...args)
      })
    })
  }

  move(coordinate) {
    this.channel.emit('move', JSON.stringify(coordinate))
  }

  close(){
    if (this.channel !== undefined){
      this.channel.close()
    }
  }
}


