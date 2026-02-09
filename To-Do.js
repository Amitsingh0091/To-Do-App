let todos=JSON.parse(localStorage.getItem("todos"))||[]; //local storage.........

const input=document.getElementById("todoInput"); //input box
const list=document.getElementById("todoList");   //for output

function save(){
	localStorage.setItem("todos",JSON.stringify(todos));
	render()}

	function addTodo(){
  if(!input.value.trim())return;
  todos.push({text:input.value,done:false});
  input.value="";
  save();
}
input.addEventListener("keydown",e=>{if(e.key==="Enter")addTodo()});
function toggle(i){todos[i].done=!todos[i].done;save()}
function del(i){todos.splice(i,1);save()}
function edit(i){
  let t=prompt("Edit todo",todos[i].text);
  if(t){todos[i].text=t;save()}
}

function render(filter="all"){
  list.innerHTML="";
  todos.forEach((t,i)=>{
    if(filter==="done"&&!t.done)return;
    if(filter==="pending"&&t.done)return;
    let li=document.createElement("li");
    li.className=t.done?"done":"";
    li.innerHTML=`
      <span class="todo-text">${t.text}</span>
      <span class="actions">
        <button onclick="toggle(${i})">✔</button>
        <button onclick="edit(${i})" >✏</button>
        <button onclick="del(${i})" style="background: red;">❌</button>
      </span>`;
    list.appendChild(li);
  });
}
function filterTodos(type){render(type)}
render();
