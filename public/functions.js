var resultArray='';
function model()
{
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

    content = content + "<select name=\"destinationCountry\" id=\"p2\">\n"
    for(var i =0;i<countries.records.length;i++)
    {
        content = content + "<option value=\"" + countries.records[i].country + "\">"+ countries.records[i].country + "</option>\n";
    }

    content = content + "  </select>";


    content = content + "<select name=\"optionToGroup\" id=\"p3\">\n"

        content = content + "<option value=\"" + "day" + "\">"+ "By Day" + "</option>\n";

    content = content + "  </select>";

    content = content + "<div id=\"RawData\" class=\"dpn-content\"> <\div>"
    document.getElementById('dpn-layout').innerHTML = content;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resultArray = JSON.parse(this.response);

            loadchart();
        }
    };
    xhttp.open("GET", "model?p1=" + document.getElementById('p1').value +"&p2="+ document.getElementById('p2').value  + "&p3="+ document.getElementById('p3').value , false);
    xhttp.send();
}



function loadchart() {

    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var arr = [['Task', 'Hours per Day']];
        alert(arr);
        for (let i = 0; i < resultArray.records[0].length ; i++)
        {
            arr.push([parseInt(resultArray.records[0][i].day),parseInt(resultArray.records[0][i].cases)]);
            ;
        }

        var data = google.visualization.arrayToDataTable(
            arr
        );

        // Optional; add a title and set the width and height of the chart
        var options = {'title':'My Average Day', 'width':550, 'height':400};

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.LineChart(document.getElementById('RawData'));
        chart.draw(data, options);
    }
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