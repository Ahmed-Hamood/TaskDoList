let form = document.querySelector('form');
let clear = document.querySelector('.clear');
let task_list =  document.getElementById('list-task');
let search = document.getElementById('search');

LoadAllListeners();
DataStorage('addAll');

function LoadAllListeners(){
  form.addEventListener('submit' , AddTask);
  clear.addEventListener('click' ,clearAll);
  task_list.addEventListener('click' , DeleteAnElement);
  search.addEventListener('keyup' , searchTask);
}


function isEmpty(str) {
  return !str.trim().length;
}


function AddTask(e){
 let input = document.getElementById('input').value; 
 
 if(input != '' && !isEmpty(input)){ 
    if(task_list.childElementCount == 0) {task_list.innerHTML = '';} 
    DataStorage('add',input);
    generateTaskElement(input);
    document.getElementById('input').value = '';

 }else{
   alert('Task Field is Empty')
 }
   
   e.preventDefault();
}
function clearAll(e){
  task_list.innerHTML = '<h2>No Tasks Available</h2>';
  DataStorage('clear');
  document.getElementById('input').value = '';
  e.preventDefault();
}
function DeleteAnElement(e){
 
  if(e.target.textContent == 'Delete'){
       e.target.parentElement.remove();
       if(task_list.childElementCount == 0){ task_list.innerHTML = '<h2>No Tasks Available</h2>';} 
       DataStorage('delete' , e.target.parentElement.firstChild)
  }

  e.preventDefault();
}
function generateTaskElement(value){
  let li = document.createElement('li');
  li.textContent = value;
  let a = document.createElement('a');
  a.setAttribute("href" , "#");
  a.textContent = 'Delete';
  li.appendChild(a)
  task_list.appendChild(li);

}
function searchTask(e){
  let value = e.target.value.toLowerCase();
  document.querySelectorAll('li').forEach(el=>{
    let itemname =  el.firstChild.textContent;

   if(itemname.toLowerCase().indexOf(value) != -1){
     el.style.display = 'block';
   }else{
    el.style.display = 'none';
   }
  });
  e.preventDefault();
}
function DataStorage(type , value){
   let Data  = []; 
   if(localStorage.getItem('task') == null){ 
      Data = [];
   }else{
      Data = JSON.parse(localStorage.getItem('task'));
   }
   switch(type){
     case 'addAll' : {
       if(Data.length != 0){
          Data.forEach(el=>{
            generateTaskElement(el);
          });  
       }
       
      else{
         task_list.innerHTML = '<h2>No Tasks Available</h2>';
      }
     }
     break;
     case 'add' : { 
      if(Data.length == 0) { task_list.innerHTML = '';}
          Data.push(value);
          localStorage.setItem('task' ,  JSON.stringify(Data))
     }
     break;
     case 'clear' : {
       localStorage.clear();
     }
     break;
     case 'delete' : {
        Data.forEach((element,index) => {
          if(element == value.textContent){
            Data.splice(index , 1);
          }
        });
        localStorage.setItem('task' , JSON.stringify(Data));  
     }
     break;
   }


}







