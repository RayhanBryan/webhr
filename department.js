function loadContent(page){
    clearResult();
    var xhr = new XMLHttpRequest;
    var url = `http://localhost:1234/departments/findAllWithPagination?page=${page}&size=10`;
    // xhr.onloadstart = function(){
    //     document.getElementById("button").innerHTML = "Loading . . .";
    // }
    xhr.onerror = function(){
        alert("Gagal mengambil data");
    };
    xhr.onloadend = function(){
        if (this.responseText !== ""){
            var res = JSON.parse(this.responseText);
            var data = res.data;
            document.getElementById("hasil").innerHTML = `<tr>
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
            if (page == 0) {
                document.getElementById("navigation").innerHTML = `<div class="row text-center justify-content center">
            
            <div class="col-3"><button class="button-nav">&lt;</button></div>
            <div class="col-6 text-center page-div"><div class="page-number">Page: ${page+1}</div></div>
            <div class="col-3"><button class="button-nav" onclick="loadContent(${page+1})">&gt;</button></div>
            
            </div>`
            }
            else if (page == res.totalPages-1){
                document.getElementById("navigation").innerHTML = `<div class="row text-center justify-content center">
            
            <div class="col-3"><button class="button-nav" onclick="loadContent(${page-1})">&lt;</button></div>
            <div class="col-6 text-center page-div"><div class="page-number">Page: ${page+1}</div></div>
            <div class="col-3"><button class="button-nav">&gt;</button></div>
            
            </div>`
            }
            else {
            document.getElementById("navigation").innerHTML = `<div class="row text-center justify-content center">
            
            <div class="col-3"><button class="button-nav" onclick="loadContent(${page-1})">&lt;</button></div>
            <div class="col-6 text-center page-div"><div class="page-number">Page: ${page+1}</div></div>
            <div class="col-3"><button class="button-nav" onclick="loadContent(${page+1})">&gt;</button></div>
            
            </div>`
            }
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
    var url = `http://localhost:1234/departments/delete?id=${id}`;
    if (confirm("Yakin?")){
        xhr.open("DELETE", url ,true);
        xhr.send();
        alert("Sukses!");
        setTimeout(loadContent(0), 3000);
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
    return ret;
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
    window.location = "department-start.html";
    return false;
}

function showBox() {
    document.getElementById("searchbox").innerHTML = `<div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Cari" id="search">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary button-search" type="button" onclick="findByDepartmentName(0)">Search</button>
    </div>
  </div>`
}

function findByDepartmentName(page){
    clearResult();
    var xhr = new XMLHttpRequest();
    var dept = document.getElementById("search").value;
    var url = `http://localhost:1234/departments/findByDepartmentName?departmentName=${dept}&page=${page}&size=10`;

    xhr.onloadend = function(){
        if (this.responseText !== ""){
            var res = JSON.parse(this.responseText);
            var data = res.data;
            document.getElementById("hasil").innerHTML = `<tr>
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
            if (page == 0 && res.totalPages !== 0) {
                document.getElementById("navigation").innerHTML = `<div class="row text-center justify-content center">
            
            <div class="col-3"><button class="button-nav">&lt;</button></div>
            <div class="col-6 text-center page-div"><div class="page-number">Page: ${page+1}</div></div>
            <div class="col-3"><button class="button-nav" onclick="findByDepartmentName(${page+1})">&gt;</button></div>
            
            </div>`
            }
            else if (page >= res.totalPages-1 || res.totalPages == 0){
                document.getElementById("navigation").innerHTML = `<div class="row text-center justify-content center">
            
            <div class="col-3"><button class="button-nav" onclick="findByDepartmentName(${page-1})">&lt;</button></div>
            <div class="col-6 text-center page-div"><div class="page-number">Page: ${page+1}</div></div>
            <div class="col-3"><button class="button-nav">&gt;</button></div>
            
            </div>`
            }
            else {
            document.getElementById("navigation").innerHTML = `<div class="row text-center justify-content center">
            
            <div class="col-3"><button class="button-nav" onclick="findByDepartmentName(${page-1})">&lt;</button></div>
            <div class="col-6 text-center page-div"><div class="page-number">Page: ${page+1}</div></div>
            <div class="col-3"><button class="button-nav" onclick="findByDepartmentName(${page+1})">&gt;</button></div>
            
            </div>`
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();


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