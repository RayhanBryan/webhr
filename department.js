function loadContent(){
    clearResult();
    var xhr = new XMLHttpRequest;
    var url = "http://localhost:1234/departments/findAll";
    xhr.onloadstart = function(){
        document.getElementById("button").innerHTML = "Loading . . .";
    }
    xhr.onerror = function(){
        alert("Gagal mengambil data");
    };
    xhr.onloadend = function(){
        if (this.responseText !== ""){
            var res = JSON.parse(this.responseText);
            var data = res.data;
            document.getElementById("hasil").innerHTML += `<tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Manager ID</th>
            <th>Location ID</th>
            </tr>`
            for (i=0; i<data.length; i++){
                const newData = data[i];
                const id = newData.departmentId;
                const name = newData.departmentName;
                const manager = newData.managerId;
                const location = newData.locationId;
                document.getElementById("hasil").innerHTML += `<tr> 
                <td>${id}</td> 
                <td>${name}</td>
                <td>${manager}</td>
                <td>${location}</td>
                <td><a href="department-update.html?id=${id}"><button class="edit">EDIT</button></a></td>
                <td><button class="delete" onclick="deleteData(${id})">DELETE</button></td>
                </tr>`
            }
            document.getElementById("button").innerHTML = "Load lagi";
            // setTimeout(function(){
            //     document.getElementById("button").innerHTML = "Load lagi";
            // }, 3000);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function clearResult() {
    document.getElementById("hasil").innerHTML = "";
}

function deleteData(id){
    var xhr = new XMLHttpRequest;
    var url = "http://localhost:1234/departments/delete";
    if (confirm("Yakin?")){
        xhr.open("DELETE", url+`?id=${id}` ,true);
        xhr.send();
        alert("Sukses!");
        setTimeout(loadContent(), 3000);
    } else {}
}

function getById(id){
    var xhr = new XMLHttpRequest;
    var url = `http://localhost:1234/departments/getById?id=${id}`;
    xhr.onloadend = function (){
        var res = JSON.parse(this.responseText);
        var data = res.data;
        document.getElementById("departmentname").value = data.departmentName,
        document.getElementById("managerid").value = data.managerId,
        document.getElementById("locationid").value = data.locationId
    }
    xhr.open("GET", url, true);
    xhr.send();
}

function onLoadData(){
    var link = window.location.search;
    var id = link.split('=').pop();
    // alert(id);
    getById(id);
}

function updateData(){
    var xhr = new XMLHttpRequest;
    var url = `http://localhost:1234/departments/put`;

    var link = window.location.search;
    var id = link.split('=').pop();
    var ret = false;
    console.log(id);
    var data = JSON.stringify({
        departmentId: id,
        departmentName: document.getElementById("departmentname").value,
        managerId: document.getElementById("managerid").value,
        locationId: document.getElementById("locationid").value
    });
    console.log(data);
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
    xhr.onload = function () {
        var obj = JSON.parse(this.responseText);
        if (obj.status == true){
            window.location = department-start.html;
        }else {
            alert("Salah");
        }
        console.log(this.responseText);
    };
    window.location = department-start.html;
    return false;
}

function sendData(){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:1234/departments/post";

    var data = JSON.stringify({
        departmentName: document.getElementById("departmentname").value,
        managerId: document.getElementById("managerid").value,
        locationId: document.getElementById("locationid").value
    });
    console.log(data);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
    xhr.onload = function () {
        var obj = JSON.parse(this.responseText);
        if (obj.status == true){
            window.location.reload();
        }else {
            alert("Salah");
        }
        console.log(this.responseText);
    };

    return false;
}

// var urlParams = new URLSearchParams(window.location.search);

//     if(urlParams.has('id')){
//         var id = urlParams.get('id')
//         console.log('employee_id ==>> ', id);
//     }

//     $(document).ready(function(){
//         feather.replace({ "aria-hidden": "true" });
//         bindSelectDepartment();
//     });