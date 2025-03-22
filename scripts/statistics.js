"use strict";
console.log("[INFO] Entering statistics.js");

export function statisticsLogic() {
    console.log("[DEBUG] statisticsLogic() is running!");

    const canvas = document.getElementById("chart");
    if (canvas) {
        console.log("[DEBUG] Canvas element found. Initializing Chart.js...");
    } else {
        console.error("[ERROR] Canvas element not found. Ensure statistics.html is loaded properly.");
        return;
    }

    //  Chart configuration  -   Formatted by Microsoft CoPilot
    const config = {
        type: 'bar',
        data: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [{
                label: 'Monthly Visitors',
                data: [120, 150, 180, 200, 240],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Render the chart using Chart.js
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, config); // Capitalized "Chart"
    console.log("[DEBUG] Chart instance created:", chart);
}