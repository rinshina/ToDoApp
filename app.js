const inputBox=document.querySelector('.inputField input')
const addBtn=document.querySelector('.inputField button')
const todoList=document.querySelector('.todo-list')
const deleteAllBtn=document.querySelector('.deleteAllBtn')

inputBox.onkeyup=()=>{
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add('active')
    }else{
        addBtn.classList.remove('active')
    }
}
showTasks()

// If user click on the add button
addBtn.onclick=()=>{
    let userData=inputBox.value
    let getLocalStorage=localStorage.getItem('New Todo')
    if (getLocalStorage == null) {
        listArr = []
    }else{
        listArr =JSON.parse(getLocalStorage)
    }
    listArr.push(userData)
    localStorage.setItem('New Todo',JSON.stringify(listArr)) //transforming js object into json string
    showTasks()
    addBtn.classList.remove('active')
}
// Function to add task list inside ul
function showTasks(){
    let getLocalStorage=localStorage.getItem("New Todo")
    if (getLocalStorage == null) {
        listArr = []
    }else{
        listArr =JSON.parse(getLocalStorage)
    }
    const pendingNumb=document.querySelector('.pendingNumb')
    pendingNumb.textContent=listArr.length; //updasting remaining task no
    if (listArr.length>0) {
        deleteAllBtn.classList.add('active')
    }else{
        deleteAllBtn.classList.remove('active')
    }
    let newLiTag=''
    listArr.forEach((element,index) => {
        newLiTag +='<li class="">'+ element+ '<span><i  onclick="deleteTask('+index+')" class="fas fa-trash"></i></span></li>'
    });
    todoList.innerHTML = newLiTag //adding new li to ul
    inputBox.value=""
}
// Delete task function
function deleteTask(index){
    let getLocalStorage=localStorage.getItem("New Todo")
    listArr =JSON.parse(getLocalStorage)
    listArr.splice(index,1); //delete or remove the particular indexed li
    //updating showtasks
    localStorage.setItem('New Todo',JSON.stringify(listArr)) //transforming js object into json string
    showTasks()
}

//Delete all
deleteAllBtn.onclick=()=>{
    listArr=[] //empty an array
    //updating showtasks
    localStorage.setItem('New Todo',JSON.stringify(listArr)) //transforming js object into json string
    showTasks()
}