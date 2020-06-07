function model()
{

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            loadchart(JSON.parse(this.response));
        }
    };
    xhttp.open("GET", "model", true);
    xhttp.send();

}

function loadchart(s) {
    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart(s) {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            [1, 8],
            [2, 2],
            [3, 4],
            [4, 2],
            [5, 8]
        ]);

        // Optional; add a title and set the width and height of the chart
        var options = {'title':'My Average Day', 'width':550, 'height':400};

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.LineChart(document.getElementById('RawData'));
        chart.draw(data, options);
    }}