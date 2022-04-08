function sendData(){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:1234/departments/post";

    var ret = false;

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

    return ret;
}