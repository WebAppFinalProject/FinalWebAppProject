
var broker = 'wss://mqtt.eclipse.org:443/mqtt';
var client = mqtt.connect(broker);

$(document).ready(() => {
    let isTeacher = false;
    let id = $("#userId").val()

    apiRequest('/user/getuser/' + id, "get")
        .then((res)=>{
            if(res.user.position == "teacher"){
                isTeacher = true;
            }
        })
        .catch((error)=>{
            console.log(error);
        })

    client.on('connect', () => {
        console.log("connected to " + broker);
    })

    client.on('message',(topic, message)=>{
        let msg = JSON.parse(message.toString());
        console.log(message.toString(), msg);
        if(isTeacher){
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: `${msg.name} ${msg.message} in titled ${msg.examTitle} `,
                showConfirmButton: false,
                timer: 2500
              })
        }
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