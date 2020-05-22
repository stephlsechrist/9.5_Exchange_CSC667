const ConsumerGroup = require('kafka-node').ConsumerGroup;
const EventEmitter = require('events');


// have to give consumer the host and the groupIds
const consumerOptions = {
  kafkaHost: 'localhost:9092',
  groupId: (Date.now()).toString(), // cluster, random in this example but can coordinate consuemrs
  sessionTimeout: 25000,
  protocol: ['roundrobin'], // if there are multiple consumers in a group, give to consumers in roudn robin fashion
  fromOffset: 'latest', // optional, when it reads message, it reads the latest one. can read any messages based on offset number
  // one of reasons you might want to choose a message is if processing it fails, you can return back to it
};

class KafkaConsumer extends EventEmitter {
  constructor(topics) {
    super();
    if (Array.isArray(topics)) {
      this.topics = topics;
    } else {
      this.topics = [topics];
    }
    this.consumerGroup = null;
  }

  connect() {
    this.consumerGroup = new ConsumerGroup(Object.assign({ id: 'test1' }, consumerOptions), this.topics); 
    this.consumerGroup.on('message', message => this.emit('message', message));
  }
}

module.exports = KafkaConsumer;