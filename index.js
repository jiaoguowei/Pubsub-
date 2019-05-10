function PubSub() {
    this.handles = {
      eventName: {
        eventsList: [],
        isOne: false,
      }
    }
  }
  
  PubSub.prototype.subscribe = function(eventName, callback) {
    let EventsList = [];
    if (arguments.length < 2) {
      throw new TypeError('arguments error')
    }
    if(Reflect.has(this.handles, eventName)) {
      EventsList = this.handles[eventName].eventsList
    } else{
      this.handles[eventName] = {
        eventsList: [callback],
        isOne: false,
      }
    }
    EventsList.push(callback)
  }
  
  PubSub.prototype.notify = function(eventName, ...rest) {
    if(this.handles[eventName]) {
      let EventsList = this.handles[eventName].eventsList;
      let i = 0;
      let isOne = this.handles[eventName].isOne
      if(EventsList) {
        for(; i < EventsList.length; i++) {
          EventsList[i].apply(this, rest)
        }
      }
      if (isOne) {
              this.unsubscribe(eventName)
          }
    }
    return this;
  }
  
  
  PubSub.prototype.unsubscribe = function(eventName, callback) {
    if(this.handles[eventName]) {
       let EventsList = this.handles[eventName].eventsList;
      let index = EventsList.indexOf(callback)
      EventsList.slice(index, 1)
    }
  }
  const myPub = new PubSub();
  
  myPub.subscribe('event', function (data) {
      console.log('触发');
      console.log(data)
  })
  
  myPub.notify('event', 123);
  
  myPub.unsubscribe('event')
  
  
  console.dir(new PubSub().handles)
  