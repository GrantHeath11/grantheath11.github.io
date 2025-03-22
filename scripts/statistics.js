/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-03-22
 *
 *     Volunteer Connect Project
 *     statistics.ts
 *
 *    displays a chart using chart.js with pre-determined data
 *    CoPilot was used to make the graph
 *
 *********************/
"use strict";
console.log("[INFO] Entering statistics.ts");
export function statisticsLogic() {
    console.log("[DEBUG] statisticsLogic() is running!");
    // Get the canvas element with type annotation
    const canvas = document.getElementById("chart");
    if (canvas) {
        console.log("[DEBUG] Canvas element found. Initializing Chart.js...");
    }
    else {
        console.error("[ERROR] Canvas element not found. Ensure statistics.html is loaded properly.");
        return;
    }
    // Chart.js configuration
    const config = {
        //graph type
        type: 'bar',
        data: {
            //labels for the graph (in this case sorted by month)
            labels: ["January", "February", "March", "April", "May"],
            datasets: [{
                    label: 'Monthly Visitors',
                    data: [220, 133, 290, 211, 15],
                    backgroundColor: [
                        //RGB colors generated by CoPilot
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
    // Get 2D rendering context from the canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("[ERROR] Failed to get 2D context. Chart rendering aborted.");
        return;
    }
    // Render the chart using Chart.js
    const chart = new Chart(ctx, config); // Use the global Chart object
    console.log("[DEBUG] Chart instance created:", chart);
}
//# sourceMappingURL=statistics.js.map