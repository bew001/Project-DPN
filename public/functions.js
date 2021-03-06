
function model() {
    if (sessionStorage.getItem("loggedin")!=="true")
    {
        alert("Please either Log in or sign up for a new account in order to use this feature");
        return;
    }
    setMenuActiveClass("MenuModel");
    var xhttp1 = new XMLHttpRequest();
    var countries;
    xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             countries = JSON.parse(this.response);
        }
    };
    xhttp1.open("GET", "getCountryModel", false); // async false here is important in order not to load charts with unknown parameters
    xhttp1.send();

    let content="";
    content = content + "<table border=\"0\" width=\"60%\" align = \"center\" ><th>";
    content = content + "<select name=\"sourceCountry\" id=\"p1\" style=\"border-radius: 10px;width:100px;\" >&nbsp&nbsp\n"
    for(var i =0;i<countries.records.length;i++)
    {
        content = content + "<option value=\"" + countries.records[i].country + "\">"+ countries.records[i].country + "</option>\n";
    }

    content = content + "  </select> </th>";

    content = content + "</th><th><select name=\"destinationCountry\" id=\"p2\" style=\"border-radius: 10px;width:100px;\">&nbsp&nbsp\n"
    for(var i =0;i<countries.records.length;i++)
    {
        content = content + "<option value=\"" + countries.records[i].country + "\">"+ countries.records[i].country + "</option>\n";
    }

    content = content + "  </select></th><th>";


    content = content + "<select name=\"optionToGroup\" id=\"p3\" style=\"border-radius: 10px;width:100px;\">&nbsp&nbsp\n"

    content = content + "<option value=\"" + "day" + "\">"+ "By Day" + "</option>\n";

    content = content + "  </select></th><th>---------\n";

    content = content + "</th><th><button onclick=\"loadModel('model')\" style=\"border-radius: 10px;width:100px;\">Model</button>\n";

    content = content + "</th><th><button onclick=\"loadModel('compare',p1.value,p2.value)\" style=\"border-radius: 10px;width:100px;\">Compare</button></th>" +
        "<tr style=\"color:beige;;\"><td>&nbsp&nbsp Country</td><td>&nbsp&nbspTarget Country</td><td>&nbsp&nbspGrouping Method</td><td></td><td></td><td></td></tr></table><br>\n";

    content = content + "<div id=\"RawData\" class=\"dpn-content\" align='center'> <\div>"
    document.getElementById('dpn-layout').innerHTML = content;

}

function loadModel(method,sc,dc) {
    showLoaderBig();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if (method==='model')
                loadchart1(JSON.parse(this.response));
            else if (method==='compare')
                loadchart2(JSON.parse(this.response),sc,dc);
            hideLoaderBig()
        }
    };
    xhttp.open("GET", "model?method=" +  method + "&p1=" + document.getElementById('p1').value +"&p2="+ document.getElementById('p2').value  + "&p3="+ document.getElementById('p3').value , false);
    xhttp.send();
}

function loadchart1(resultArray) {

    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var arr = [['Cases', 'Cases per Day']];

        for (let i = 0; i < resultArray.records[0].length ; i++)
        {
            arr.push([resultArray.records[0][i].day,parseInt(resultArray.records[0][i].cases)]);

        }

        //arr = [['Cases', 'Cases per Day','l'],[1,2,7],[2,10,8],[3,7,1],[4,9,8]];

        var data = google.visualization.arrayToDataTable(
            arr
        );

        // Optional; add a title and set the width and height of the chart
        var options = {'title':'Cases per Day', 'width':750, 'height':550,};

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.LineChart(document.getElementById('RawData'));
        chart.draw(data, options);
    }
}

function loadchart2(resultArray,sc,dc) {

    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var arr = [['Cases', sc,dc]];

        for (let i = 0; i < resultArray.records[0].length ; i++)
        {
            arr.push([resultArray.records[0][i].day,parseInt(resultArray.records[0][i].cases1),parseInt(resultArray.records[0][i].cases2)]);
            ;
        }

        //arr = [['Cases', 'Cases per Day','l'],[1,2,7],[2,10,8],[3,7,1],[4,9,8]];

        var data = google.visualization.arrayToDataTable(
            arr
        );

        // Optional; add a title and set the width and height of the chart
        var options = {'title':'Cases per Day', 'width':750, 'height':550,};

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.LineChart(document.getElementById('RawData'));
        chart.draw(data, options);
    }
}

function healthInstructions() {
    setMenuActiveClass("MenuHealth");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("dpn-layout").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "healthInstructions", true);
    xhttp.send();
}

function contact() {
    setMenuActiveClass("MenuHealth");
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

function FilterContinent() {
    // Declare variables

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputContinent");
    filter = input.value.toUpperCase();
    table = document.getElementById("RawData");
    tr = table.getElementsByTagName("tr");


    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
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

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function loggedin() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

                let email = this.responseText;
            if (email ==='')
            {
                document.write("<button class=\"open-button\" onclick=\"openForm()\">Login Form</button>");
                setFormdiv('login');

            }

            else
            {
                document.write("<button class=\"modify-button\" onclick=\"openForm()\">" + email + " </button>");
                setFormdiv('modify');
            }


        }
    };
    xhttp.open("POST", "sess", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("p1=get");
}

function signout() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let statusSignOut = this.responseText;
            if (statusSignOut ==='success')
            {
                //document.write("<button class=\"open-button\" onclick=\"openForm()\">Login Form</button>");
                setFormdiv('login');
                sessionStorage.setItem("loggedin", "false");
                location.reload();
            }

            else
            {
                //document.write("<button class=\"modify-button\" onclick=\"openForm()\">" + email + " </button>");
                setFormdiv('modify');
                location.reload();
            }


        }
    };
    xhttp.open("POST", "sess", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("p1=unset");
}

function setFormdiv(l){
    let s = '';
    if (l==='login')
    {
         s = "<div id=\"loader\"></div>\n" +
             "\n" +
             "\n" +
             "        <form  class=\"form-container\" id = \"form-container\">\n" +
             "            <h1>Login</h1>\n" +
             "\n" +
             "            <label for=\"email\"><b>Email</b></label>\n" +
             "            <input type=\"text\" placeholder=\"Enter Email\" name=\"email\" required >\n" +
             "\n" +
             "            <label for=\"psw\"><b>Password</b></label>\n" +
             "            <input type=\"password\" placeholder=\"Enter Password\" name=\"psw\" required >\n" +
             "\n" +
             "            <button type=\"button\" onclick=\"login(email,psw)\" class=\"btn\">Login</button>\n" +
             "            <button type=\"button\" class=\"btn cancel\" onclick=\"closeForm()\">Close</button>\n" +
             "\n" +
             "        </form>";

    }
    else if (l==='modify')
    {
         s = "<div id=\"loader\"></div>\n" +
             "\n" +
             "\n" +
             "        <form  class=\"form-container\" id = \"form-container\">\n" +
             "            <h1>Modify Password</h1>\n" +
             "\n" +
             "            <label for=\"email\"><b>Email</b></label>\n" +
             "            <input type=\"text\" placeholder=\"Enter Email\" name=\"email\" required>\n" +
             "\n" +
             "            <label for=\"psw\"><b>Password</b></label>\n" +
             "            <input type=\"password\" placeholder=\"Enter Password\" name=\"psw\" required>\n" +
             "\n" +
             "            <button type=\"button\" onclick=\"modify(email,psw)\" class=\"btn\">Modify</button>\n" +
             "            <button type=\"button\" class=\"btn cancel\" onclick=\"closeForm()\">Close</button>\n" +
             "\n" +
             "        </form>";
    }
    else if (l==='signup')
    {
        s = "<div id=\"loader\"></div>\n" +
            "\n" +
            "\n" +
            "        <form  class=\"form-container\" id = \"form-container\">\n" +
            "            <h1>Sign up</h1>\n" +
            "\n" +
            "            <label for=\"email\"><b>Email</b></label>\n" +
            "            <input type=\"text\" placeholder=\"Enter Email\" name=\"email\" required>\n" +
            "\n" +
            "            <label for=\"psw\"><b>Password</b></label>\n" +
            "            <input type=\"password\" placeholder=\"Enter Password\" name=\"psw\" required>\n" +
            "\n" +
            "            <button type=\"button\" onclick=\"signup(email,psw)\" class=\"btn\">Signup</button>\n" +
            "            <button type=\"button\" class=\"btn cancel\" onclick=\"closeForm()\">Close</button>\n" +
            "\n" +
            "        </form>";
    }

    document.getElementById("myForm").innerHTML = s;

}

function  signup( email,psw) {
    if(email=='' || psw =='')
    {
        alert ('Please fill all required fileds');
        return;
    }
    showLoader();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText==='success')
            {
                hideLoader();
                closeForm();
                alert('Please Check your Email for Verification');
                location.reload();
                /*var xhttp1 = new XMLHttpRequest();
                xhttp1.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {

                        if (this.responseText==='success')
                        {
                            //loggedin();
                            hideLoader();
                            closeForm();
                            alert('user created');
                            location.reload();
                        }

                    }
                };
                xhttp1.open("POST", "sess", false);
                xhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp1.send("p1=set&p2=" + email.value + "");*/
            }
            else
            {
                hideLoader();
                closeForm();
               alert('Failed to create user');

            }

        }
    };
    xhttp.open("POST", "userlogin", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("p1=signup&p2=" + email.value +"&p3="+ psw.value );
}

function  modify( email,psw) {
    if(email=='' || psw =='')
    {
        alert ('Please fill all required fileds');
        return;
    }
    showLoader();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText==='success')
            {
                //loggedin();
                hideLoader();
                closeForm();
                alert('Password Changed');
            }
            else
            {
                hideLoader();
                closeForm();
                alert('Failed to Change Password');

            }

        }
    };
    xhttp.open("POST", "userlogin", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("p1=modify&p2=" + email.value +"&p3="+ psw.value );
}

function  login( email,psw) {
    if(email=='' || psw =='')
    {
        alert ('Please fill all required fileds');
        return;
    }
    showLoader();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText==='success')
            {
                var xhttp1 = new XMLHttpRequest();
                xhttp1.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {

                        if (this.responseText==='success')
                        {
                            //loggedin();
                            hideLoader();
                            closeForm();
                            sessionStorage.setItem("loggedin", "true");
                            location.reload();
                        }

                    }
                };
                xhttp1.open("POST", "sess", false);
                xhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp1.send("p1=set&p2=" + email.value + "");
            }
            else
            {
                hideLoader();
                closeForm();
                alert('Failed to login');

            }

        }
    };
    xhttp.open("POST", "userlogin", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("p1=login&p2=" + email.value +"&p3="+ psw.value );
}

function showLoader() {
    document.getElementById("loader").style.display = "block";

}

function hideLoader() {
    document.getElementById("loader").style.display = "none";

}

function showLoaderBig() {
    document.getElementById("loaderBig").style.display = "block";

}

function hideLoaderBig() {
    document.getElementById("loaderBig").style.display = "none";

}

function openSignupForm() {
   setFormdiv('signup');
   openForm();

}

function setSignoutbtn() {

    if (sessionStorage.getItem("loggedin")==="true")
    {
        document.write( "<a href=\"javascript:void(0);\" onclick=\"signout();\">Sign out</a>");
    }
    else
    {
        document.write( "<a href=\"javascript:void(0);\" onclick=\"openSignupForm();\">Sign up</a>");
    }

}

function setMenuActiveClass(tab){
    document.getElementById("MenuMain").className = "";
    document.getElementById("MenuModel").className = "";
    document.getElementById("MenuHealth").className = "";
    document.getElementById("MenuContact").className = "";
    if (tab===undefined)
        document.getElementById("MenuMain").className = "active";
        else
            document.getElementById(tab).className = "active";
}
