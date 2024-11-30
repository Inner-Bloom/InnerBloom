console.log('Script loaded')
let ctx = document.getElementById('myChart');
let myChart;
let Jsondata;

fetch("Mood_and_Sleep_Data.json")
.then(function(response){
   if(response.status == 200){
      console.log("Data fetched successfully");
	  console.log(response);
      return response.json();
   }
   else{
      console.log("Error fetching data");
   }
})
.then(function(data){ 
   Jsondata = data; 
   createChart(Jsondata, 'line');
});	

function createChart(data, type){
	myChart = new Chart(ctx, {
		type: type, 
		data: {
		  labels: data.map(row => row.date), 
		  datasets: [{
		    label: 'Hours of Sleep',
		    data: data.map(row => row.sleep_hours),
		    borderWidth: 1
		  }]
		},
		options: {
		  scales: {
		    y: {
		      beginAtZero: true
		    }
		  },
		  responsive: true,
		  maintainAspectRatio: false,
		}
	});
}

function setChartType(chartType){
	myChart.destroy();
	createChart(Jsondata, chartType);
}