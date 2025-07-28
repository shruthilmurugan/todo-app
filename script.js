const taskInput = document.querySelector(".input");
const submit = document.querySelector(".submit");
const motivation = document.querySelector(".motivate");
const progress = document.querySelector(".progress");
const completion = document.querySelector(".completion-status");
const box = document.querySelector(".task-container");
const img = document.querySelector(".img");

window.addEventListener("DOMContentLoaded",()=> loadstorage());
function loadstorage()
{
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.forEach(task => {
        createElement(task.updatetask,task.updatecompletion);
    });
    updateprogress();
    displayemp();
}

taskInput.addEventListener("keypress",(event)=>{
            
            if(event.key ==="Enter")
            {
                 event.preventDefault();
                 const task = taskInput.value.trim();
                addtask(task,false);
            }
}
);
submit.addEventListener("click",(event)=> {
            event.preventDefault();
            const task = taskInput.value.trim();
            addtask(task,false);
});

function addtask(task,iscompleted)
{
      createElement(task,iscompleted);
      taskInput.value = "";
      updateprogress();
      updatelocalstorage();
      displayemp();
}

function createElement(task,completed){
    const li = document.createElement("li");
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const edit = document.createElement("button");
    const del = document.createElement("button");
    div.classList.add("info");
    checkbox.classList.add("check");
    checkbox.type = "checkbox";
    edit.textContent ="✏️";
    del.textContent = "🗑️" ;
    span.textContent = task;
    checkbox.checked = completed ;
     
    div.appendChild(checkbox);
    div.appendChild(span);
    li.appendChild(div);
    li.appendChild(edit);
    li.appendChild(del);

    if(checkbox.checked == true)
    {
        span.style.textDecoration = "line-through";
        edit.style.display = "none" ;
    }

    box.appendChild(li);

    checkbox.addEventListener("change", (event)=> {
           
            checkboxBehaviour(event,edit,span,checkbox);
            updateprogress();
            updatelocalstorage();
    });

    del.addEventListener("click",(event)=>{
            
          deletetask(li);
          updateprogress();
          updatelocalstorage();
          displayemp();
    }
    );

    edit.addEventListener("click",()=>
    {
         edittask(edit,span);
         updateprogress();
         updatelocalstorage();
    });
}

function checkboxBehaviour(event , edit,span,checkbox)
{
        if(checkbox.checked==true)
        {
            span.style.textDecoration = "line-through";
            edit.style.display ="none";
        }
        else{
             span.style.textDecoration = "none";
            edit.style.display ="flex";
        }
}

function deletetask(li){

      li.remove();
}
 let place;
function edittask(edit,span)
{  
   
    if(edit.textContent == "✏️")
    {
        place = document.createElement("input");
        place.type = "text";
        place.value = span.textContent;
        span.replaceWith(place);
        edit.textContent = "💾";

        place.addEventListener("keypress",(event)=>
        {  
             if(event.key ==="Enter")
        {
            span.textContent = place.value;
           place.replaceWith(span);
           edit.textContent = "✏️";
        }
             
            
        });
    }
    else if(edit.textContent == "💾"){
           span.textContent = place.value;
           place.replaceWith(span);
           edit.textContent = "✏️";
    }
}

function updateprogress()
{
    const total = box.children.length ; 
    const comp = box.querySelectorAll(".check:checked").length;
    progress.style.width = `${(comp/total)*100}%`;
    completion.textContent = `${comp} / ${total}`;
    if(total == 0)
    {
        motivation.textContent = "Your List is empty! 🎉";
    }
    else if(comp == total )
    {
        motivation.textContent = "You Did It 🔥";
    }
    else{
         motivation.textContent = "You Can Do It 💪 ";
    }
}

function updatelocalstorage()
{
    const tasks = [];
    box.querySelectorAll("li").forEach(li => {
        const updatetask = li.querySelector("span").textContent;
        const updatecompletion = li.querySelector(".check").checked;
        tasks.push({updatetask,updatecompletion});
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayemp()
{
    img.style.display = box.children.length ==0 ? "flex" : "none";
}

