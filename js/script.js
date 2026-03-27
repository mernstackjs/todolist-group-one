const app = document.getElementById('app');

const title = document.createElement('h1');
title.textContent = 'Mina Uppgifter';

const inputTask = document.createElement('input');
inputTask.placeholder = 'Titel på uppgift';

const inputDesc = document.createElement('input');
inputDesc.placeholder = 'Beskrivning';

const inputDate = document.createElement('input');
inputDate.type = 'date';

const addBtn = document.createElement('button');
addBtn.textContent = 'Lägg till uppgift';

const list = document.createElement('ul');

app.append(title, inputTask, inputDesc, inputDate, addBtn, list);

function validateInput(text) {
  if (text.trim().length < 2) {
    return false;
  }
  return true;
}

addBtn.addEventListener('click', () => {
  const task = inputTask.value;
  const desc = inputDesc.value;
  const date = inputDate.value;

  if (validateInput(task)) {
    const li = document.createElement('li');

    const h3 = document.createElement('h3');
    h3.textContent = task;

    const p = document.createElement('p');
    p.textContent = desc;

    const dateInfo = document.createElement('small');
    dateInfo.textContent = 'Deadline: ' + date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Ta bort';
    deleteBtn.onclick = () => {
      li.remove();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Redigera';
    editBtn.onclick = () => {
      inputTask.value = task;
      inputDesc.value = desc;
      inputDate.value = date;
      li.remove();
    };

    li.append(h3, p, dateInfo, editBtn, deleteBtn);
    list.appendChild(li);

    inputTask.value = '';
    inputDesc.value = '';
    inputDate.value = '';
  } else {
    alert('Ange en titel med minst 2 tecken');
  }
});
