var densityCanvas = document.getElementById("analytics");

apiRequest();

let labels;




var densityData = {
    label: 'Students',
    data: [12, 22, 37, 15, 43, 35, 20, 41,12, 22],
    borderColor: 'rgba(255,0,0,0.2)',
    backgroundColor: 'rgba(0,0,255,240)',
    hoverBackgroundColor: 'rgba(0,0,255,0.5)'
    
};

var barChart = new Chart(densityCanvas, {
    type: 'bar',
    data: {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [densityData]
    }
});