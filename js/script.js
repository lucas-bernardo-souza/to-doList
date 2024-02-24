// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");


let oldInputValue;

// Funções
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

// Essa função esconde o formulário de adicionar tarefas e mostra o de edição de tarefas
const toggleForms = () => {
    // Troco as classes das divs para hide 'esconder' para esconder o que está aparecendo e mostrar o que está escondido
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    // array com todos os to-do's
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
};


// Eventos

todoForm.addEventListener("submit", (e) => {
    // Faz com que o formulário não seja enviado ao pressionar o botão
    e.preventDefault();

    const inputValue = todoInput.value;
    if(inputValue){
        // save todo
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) =>{
    const targetEl = e.target;
    // pegar o elemento acima na hierarquia
    // que nesse caso é a div todo-done
    const parentEl = targetEl.closest("div");
    let todoTitle;
    
    // verificando se o elemento possui um título e pegando o titulo do elemento
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    // identificando o botão de concluir tarefa
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    // identificando o botão de remoção
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    // identificando o botão de edição
    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
});