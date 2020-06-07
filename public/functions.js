function model()
{console.log('hi');
    var xhttp1 = new XMLHttpRequest();
    var countries;
    xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('hi2');
             countries = JSON.parse(this.response);

        }
    };
    xhttp1.open("GET", "getCountryModel", false); // async false here is important in order not to load charts with unknown parameters
    xhttp1.send();
    let content = "<select name=\"sourceCountry\" id=\"p1\">\n"
    for(var i =0;i<countries.records.length;i++)
    {
        content = content + "<option value=\"" + countries.records[i].country + "\">"+ countries.records[i].country + "</option>\n";
    }

    content = content + "  </select>";

    content = content + "<select name=\"sourceCountry\" id=\"p1\">\n"
    for(var i =0;i<countries.records.length;i++)
    {
        content = content + "<option value=\"" + countries.records[i].country + "\">"+ countries.records[i].country + "</option>\n";
    }

    content = content + "  </select>";

    content = content + "<div id=\"RawData\" class=\"dpn-content\"> <\div>"
    document.getElementById('dpn-layout').innerHTML = content;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loadchart(JSON.parse(this.response));
        }
    };
    xhttp.open("GET", "model", true);
    xhttp.send();
}

function healthInstructions()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("dpn-layout").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "healthInstructions", true);
    xhttp.send();
}

function contact()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("dpn-layout").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "contact", true);
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

function Filter() {
    // Declare variables
    console.log("gg");
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("RawData");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}