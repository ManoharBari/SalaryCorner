try {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable([
      ["type", "Employee"],
      ["This Month", 16],
      ["Last Month", 40],
      ["Last 3 Month", 35],
      ["Last 6 Month", 44],
      ["This  Year", 78],
      ["Last Year", 64],
    ]);

    const options = {
      title: "Hiring Ratio of Employees",
    };

    const chart = new google.visualization.BarChart(
      document.querySelector(".hiring-chart")
    );
    chart.draw(data, options);
  }
} catch (error) {
  console.log(error);
}
