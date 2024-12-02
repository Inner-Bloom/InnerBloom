let ctx = document.getElementById("myChart");
let myChart;
let Jsondata;
// reset website cache to see changes (ctrl + f5)

fetch("/src/sample_data/Mood_and_sleep_Data.json") // relative to index.html
    .then(function (response) {
        if (response.status == 200) {
            console.log("here");
            x = response.json();
            console.log(response.status);
            console.log(x);
            return x;
        }
    })
    .then(function (data) {
        Jsondata = data;
        createChart(Jsondata, "bar");
    });

function createChart(data, type) {
    console.log(ctx);
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: data.map((row) => row.month),
            datasets: [
                {
                    label: "# of Zamn",
                    data: data.map((row) => row.income),
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function setChartType(chartType) {
    myChart.destroy();
    createChart(Jsondata, chartType);
}

// script.js
// import Chart from 'chart.js/auto';

// let myChart;
// let Jsondata;

// export const fetchData = async () => {
//     const response = await fetch("/src/sample_data/Mood_and_Sleep_Data.json");
//     if (response.ok) {
//         Jsondata = await response.json();
//         return Jsondata;
//     } else {
//         throw new Error('Network response was not ok');
//     }
// };

// export const createChart = (data, type, ctx) => {
//     if (myChart) {
//         myChart.destroy();
//     }
//     myChart = new Chart(ctx, {
//         type: type,
//         data: {
//             labels: data.map(row => row.date),
//             datasets: [{
//                 label: 'Hours of Sleep',
//                 data: data.map(row => row.sleep_hours),
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             },
//             responsive: true,
//             maintainAspectRatio: false,
//         }
//     });
//     return myChart;
// };

// export const setChartType = (chartType) => {
//     if (myChart) {
//         myChart.destroy();
//     }
//     createChart(Jsondata, chartType);
// };
