var bookmarkName = document.getElementById("bookmarkName");
var button = document.getElementById("btn");
var bookmarkUrl = document.getElementById("bookmarkUrl");

var sites;
if (localStorage.getItem("sites") == null) {
  sites = [];
} else {
  sites = JSON.parse(localStorage.getItem("sites"));
  display();
}


bookmarkName.addEventListener("input",function(){
  console.log("asd");
  if(bookmarkName.value.length >= 3){
    document.getElementById("message").innerHTML="Done"
  }else if (bookmarkName.value.length < 3){
    document.getElementById("message").innerHTML="Must be 3 or more characters"
  }
})

button.addEventListener("click", function addUrl() {
  var nameReg= /[a-zA-Z]{3,}/
  var urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  if(nameReg.test(bookmarkName.value)===false && urlRegex.test(bookmarkUrl.value)===false){
    document.getElementById("errorPage").classList.replace("d-none","d-flex")
}else{
  var site = {
    bookmarkName: bookmarkName.value,
    bookmarkUrl: bookmarkUrl.value,
  };
  sites.push(site);
  
  localStorage.setItem("sites", JSON.stringify(sites));
  
  display();
  cleanForm();
}
});

function display() {
  var box = ``;
  for (var i = 0; i < sites.length; i++) {
    box += `
    <tr>
              <td>${i + 1 }</td>
              <td>${sites[i].bookmarkName}</td>
              <td><a class="btn btn-outline-warning" href="${
                sites[i].bookmarkUrl
              }" target="_blank"><i class="fa fa-eye pe-1"></i> Visit</a></td>
              <td><button class="btn btn-outline-danger" onclick="deleteTask(${i})"><i class="fa fa-trash pe-1"></i>delete</button></td>
            </tr>
    `;
  }

  document.getElementById("sites").innerHTML = box;
}

function cleanForm() {
  bookmarkName.value = null;
  bookmarkUrl.value = null;
}

function deleteTask(i) {
  sites.splice(i, "1");
  localStorage.setItem("sites", JSON.stringify(sites));
  display();
}

document.getElementById("close").addEventListener('click',function(){
  document.getElementById("errorPage").classList.replace("d-flex",'d-none')
})