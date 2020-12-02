
var broker = 'wss://mqtt.eclipse.org:443/mqtt';
var client = mqtt.connect(broker);
var test ="this is test! from notification";
$(document).ready(() => {

    

    client.on('connect', () => {
        console.log("connected to " + broker);
    })

    client.on('message',(topic, message)=>{
        let msg = JSON.parse(message.toString());
        console.log(message.toString(), msg);
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: `${msg.name} ${msg.message} in titled ${msg.examTitle} `,
            showConfirmButton: false,
            timer: 1500
          })
    })
})

/**
 * This function will subscribe to the given topic
 * @param {*} topic 
 * @param {*} client 
 */
function subscribeTo(topic, client){
    client.subscribe(topic+"/#");
    console.log("Subscribed!");
}

/**
 * This function will publish a message to the 
 * client
 * @param {*} topic 
 * @param {*} client 
 * @param {*} message 
 */
function publishTo(topic, client, message) {
    client.publish(topic, message);
    console.log("Published");
}