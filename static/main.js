/*Here we create a new Vue.js instance and create some 
    basic variables we will later use in our layout.*/
const app = new Vue({
    el: '#app',
    data: {
     title: 'boo3oo',
     name: '',
     text: '',
     messages: {
         general: [],
         typescript: [],
         nestjs: []
     },
     rooms: {
        general: false,
        typescript: false,
        nestjs: false
     },
     alerts: [],
     socket: { chat: null, alerts: null},
     activeRoom: 'general'
    },
    methods: {
/*the sendMesage() function which gets the input from our layout 
and emits it to our server using the same event if the input is correct.*/
     sendChatMessage() {
        if (this.isMemberOfActiveRoom)
        {
            const message = {
            name: this.name,
            text: this.text,
            room: this.activeRoom
           }
           this.socket.chat.emit('chatToServer', message);
           this.text = '';
           this.activeRoom[this.activeRoom] = true;
        }
        else
            alert('You Must be an active member in this chanel to send a message !');
    },
    receivedAlertMessage(alert) {
        this.alerts.push(alert);

    },
    receivedChatMessage(message) {
        this.messages[message.room].push(message);
    },
    validateInput() {
     return this.name.length > 0 && this.text.length > 0
    },
    toggleRoomMembership() {
        if (this.isMemberOfActiveRoom)
            this.socket.chat.emit('leaveRoom', this.activeRoom);
        else
            this.socket.chat.emit('joinRoom', this.activeRoom);
    },
   },
   computed: {
       //anywhere in our template wwe can acces this just like it's a property
       //basicaly a computed getter 
       isMemberOfActiveRoom()
       {
           return this.rooms[this.activeRoom];
       }
   },
//the created() function will be executed whenever the frontend is created
    created() {
/*in this method, we instantiate our socket variable using the socketio 
library we will later import in our frontend*/
     this.socket.chat = io('http://localhost:3001')
/*We also add an event listener on our socket which listens
 for the msgToClient event we created earlier in our server.*/
     this.socket.chat.on('chatToClient', (message) => {
      this.receivedChatMessage(message)
     });
    this.socket.chat.on('connect', () => {
        this.toggleRoomMembership();
    });
    this.socket.chat.on('joinedRoom', (room) => {
        this.rooms[room] = true;
    });
    this.socket.chat.on('leftRoom', (room) => {
        console.log('here left room');
        this.rooms[room] = false;
    });

     this.socket.alerts = io('http://localhost:3000/alert')
     this.socket.alerts.on('alertToClient', (alert) => {
        this.receivedAlertMessage(alert);
       })
    }
   })