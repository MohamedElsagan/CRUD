//  7-clear data
//  1- inputs
var nameapp = document.getElementById('name');
var username = document.getElementById('username');
var new_pass = document.getElementById('new_pass');
var old_pass = document.getElementById('old_pass');

var btn_submit = document.getElementById('btn_submit');
var mood ='create'
var tem;



var arr =[];

btn_submit.onclick = function(){
    create();
    read();
}



//  2- create && localstoragge
if(localStorage.info != null){
    arr = JSON.parse(localStorage.info);
}else{
    arr=[];
}


function create(){
    let txtapp = false;
    let txtuser = false;
    let txtnewpass = false;

    if(nameapp.value.trim() != ''){
        txtapp = true;
    }else{

    }

    if(username.value.trim() != ''){
        txtuser = true;
    }else{
        
    }

    if(new_pass.value.trim() != ''){
        txtnewpass = true;
    }else{
        
    }
    if(txtapp == true && txtuser == true && txtnewpass == true){
        let obj = {
            application_name: nameapp.value,
            username: username.value,
            new_pass: new_pass.value,
            old_pass:old_pass.value,
        }
        if(mood == 'create'){

            arr.push(obj);
            localStorage.setItem('info',JSON.stringify(arr));
            clean();
        }else if(mood == 'update'){
            arr[tem] = obj;
            localStorage.setItem('info',JSON.stringify(arr));
            btn_submit.innerHTML = 'submit';
            clean();
        }
        mood = 'create'

    }


    if(txtapp == false || txtuser == false || txtnewpass == false){
        alert("this's wrong")
    }
}


//  3- clean input
function clean(){
    nameapp.value ='';
    username.value ='';
    new_pass.value ='';
    old_pass.value ='';
}


//  4- read
function read(){
    let table ='';
    for(let i = 0 ; i< arr.length ; i++){
        table +=`<tr>
                    <td>${i+1}</td>
                    <td>${arr[i].application_name}</td>
                    <td>${arr[i].username}</td>
                    <td>${arr[i].new_pass}</td>
                    <td>${arr[i].old_pass}</td>
                    <td><button onclick='show_updatee(${i})' id='btn_update${i}' >update</button></td>
                    <td><button onclick='deletedata(${i})' id='btn_delete${i}'>delete</button></td>
                </tr>`
    }
    document.getElementById('show').innerHTML = table;
    if(arr.length>0){
        let btn_delete_all =`<button onclick="deletall()" id='deleteall1'>delete all ${arr.length}</button>`;
        document.getElementById('deleteall').innerHTML = btn_delete_all;
    }else{
        document.getElementById('deleteall').innerHTML = '';
    }
}
read();


var btn_deletee = document.getElementById('btn_delete1');
var btn_update = document.getElementById('btn_update');





//  5- delete
function deletedata(i){
    arr.splice(i,1);
    console.log(i)
    localStorage.info = JSON.stringify(arr);
    read();
}

//  6-delete all
//      - show sure && opticy for page
//      - click yes or no
//      - if yes then delete all
//      - if no then hide && remove opticy from page

var yes = document.getElementById('yes');
var no = document.getElementById('no');
var input = document.querySelector('.input');
var choose = document.querySelector('.choose');
var s3 = document.getElementById('s3');



function deletall(){
    toggle();
    stop_click()
}

function toggle(){
    input.classList.toggle('opacity');
    s3.classList.toggle('opacity');
    choose.classList.toggle('show');
    scroll({
        left:0,
        top:0,
        behavior:"smooth",
     })

}
function yees(){
    arr.splice(0);
    localStorage.info = JSON.stringify(arr);
    toggle();
    run_click()
    read();

       
    
}
function noo(){
    toggle();
    run_click();
    read();

 
}

//  6- update
var page_update = document.querySelector('.update');
// page_update.style.display='block'
let x;

function show_updatee(i){
    scroll({
        left:0,
        top:0,
        behavior:"smooth",
     })
   
    nameapp.value = arr[i].application_name;
    username.value = arr[i].username;
    new_pass.value = arr[i].new_pass;
    old_pass.value = arr[i].old_pass;
    btn_submit.innerHTML='update'
    mood ='update';
    tem = i;

    // stop_click()
    
}




// stop click
function stop_click(){
    for(let i =0 ; i< arr.length ; i++){
        document.getElementById('btn_delete'+i).disabled=true;
        document.getElementById('btn_update'+i).disabled=true;
    } 
}

// run click
function run_click(){
    for(let i =0 ; i< arr.length ; i++){
        document.getElementById('btn_delete'+i).disabled=false;
        document.getElementById('btn_update'+i).disabled=false;
    } 
}
