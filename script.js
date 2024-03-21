"use strict";

window.addEventListener("load", () => {
	const todoForm = document.querySelector("#todo-form form");
	const todoList = document.querySelector("#todo-list");
	const allTodosCount = document.querySelector("#all-todos-count");
	const finishedTodosCount = document.querySelector("#finished-todos-count");
	const removeAllCompletedTodosBtn = document.querySelector("#remove-all-commpleted");
	
	let i = 0;
	let data = [];

	todoForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const value = e.target.firstElementChild.value;

		if (value.trim() !== "") {
			data.push({
				id: i, text: value, isCompleted: false
			});
			i++;
			e.target.reset();
			render(data);
		}
	});

	function createTodoListItem(data) {
		for (let i = 0; i < data.length; i++) {
			const { text, isCompleted } = data[i];
			todoList.innerHTML += `
				<div class="todo-list-item" data-id=${i} >
					<label>
						<input
							type="checkbox"
							${isCompleted ? "checked" : ""}
							data-completed
						>
						<span>${text}</span>
					</label>
					<button data-rm=${i}>Remove</button>
				</div>
			`;
		}

		removeTodoListItem(document.querySelectorAll("[data-rm]"));
		changeTodoListItem(document.querySelectorAll("[data-completed]"));
	}

	function removeTodoListItem(rmBtnsArr) {
		for (let i = 0; i < rmBtnsArr.length; i++) {
			rmBtnsArr[i].addEventListener("click", () => {
				if (
					parseInt(rmBtnsArr[i].dataset.rm)
					===
					parseInt(rmBtnsArr[i].parentElement.dataset.id)
				) {
					data.splice(i, 1);
					render(data);
				}
			});
		}
	}

	function changeTodoListItem(checkboxBtnsArr) {
		for (let i = 0; i < checkboxBtnsArr.length; i++) {
			checkboxBtnsArr[i].addEventListener("change", (e) => {
				e.target.checked ? data[i].isCompleted = true : data[i].isCompleted = false;
				render(data);
				console.dir(checkboxBtnsArr[i]);
			});
		}
	}

	removeAllCompletedTodosBtn.addEventListener("click", () => {
		const notCompleted = [];

		for (let i = 0; i < data.length; i++) {
			if (data[i].isCompleted) {
				continue;
			} else {
				notCompleted.push(data[i]);
			}
		}

		render(notCompleted);
		data = notCompleted;
	});

	function render(data) {
		todoList.innerHTML = "";
		createTodoListItem(data);
		allTodosCount.textContent = data.length;
		finishedTodosCount.textContent = data.filter(todo => todo.isCompleted).length;
		console.log(data);
	}
});