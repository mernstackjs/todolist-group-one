import HttpClient from '../helper/httpClient.js';
import CreateDOM from '../helper/createDom.js';
import { Task } from '../model/Task.js';

const http = new HttpClient();
const dom = new CreateDOM();
const app = document.getElementById('app');

let isEditingId = null;

async function initApp() {
  const user = await http.getCurrentUser();
  user ? renderTodoApp(user) : renderAuth();
}

function renderAuth() {
  app.innerHTML = '';

  const title = dom.create({ type: 'h1', content: 'Välkommen' });
  const email = dom.create({
    type: 'input',
    attribute: { name: 'placeholder', value: 'E-post' },
  });
  const pass = dom.create({
    type: 'input',
    attribute: { name: 'type', value: 'password' },
  });
  const loginBtn = dom.create({ type: 'button', content: 'Logga in' });
  const regBtn = dom.create({
    type: 'button',
    content: 'Skapa konto',
  });

  loginBtn.onclick = async () => {
    const { error } = await http.signInWithEmail(email.value, pass.value);
    if (error) alert(error.message);
    else initApp();
  };

  regBtn.onclick = async () => {
    const { data, error } = await http.signUp(email.value, pass.value);
    if (error) alert(error.message);
    else if (data.user) {
      initApp();
    }
  };

  app.append(title, email, pass, loginBtn, regBtn);
}

async function renderTodoApp(user) {
  app.innerHTML = '';

  const header = dom.create({ type: 'div', classes: 'header-row' });
  const logo = dom.create({
    type: 'img',
    attribute: { name: 'src', value: 'todolist-logo.png' },
    classes: 'app-logo',
  });
  const userInfo = dom.create({ type: 'div', classes: 'user-info' });
  const logoutBtn = dom.create({
    type: 'button',
    content: 'Logga ut',
    classes: 'btn-danger',
  });

  logoutBtn.onclick = async () => {
    await http.signOut();
    renderAuth();
  };

  userInfo.append(
    dom.create({ type: 'small', content: user.email }),
    logoutBtn,
  );

  header.append(
    logo,
    dom.create({ type: 'h1', content: 'Mina Uppgifter' }),
    userInfo,
  );

  const inTitle = dom.create({
    type: 'input',
    attribute: { name: 'placeholder', value: 'Titel' },
  });
  const inDesc = dom.create({
    type: 'input',
    attribute: { name: 'placeholder', value: 'Beskrivning' },
  });
  const inDate = dom.create({
    type: 'input',
    attribute: { name: 'type', value: 'date' },
  });
  const saveBtn = dom.create({
    type: 'button',
    content: 'Spara',
    classes: 'btn-save',
  });
  const list = dom.create({ type: 'ul' });

  app.append(header, inTitle, inDesc, inDate, saveBtn, list);

  const { data } = await http.getTasks();
  if (data) {
    data.forEach((t) => {
      renderTaskItem(
        new Task(t.title, t.description, t.date, t.id),
        list,
        inTitle,
        inDesc,
        inDate,
      );
    });
  }

  saveBtn.onclick = async () => {
    const task = new Task(inTitle.value, inDesc.value, inDate.value);
    if (isEditingId) {
      await http.updateTask(isEditingId, task);
      isEditingId = null;
    } else {
      await http.addTask(task);
    }
    renderTodoApp(user);
  };
}

function renderTaskItem(task, list, inTitle, inDesc, inDate) {
  const li = dom.create({ type: 'li' });

  const content = dom.create({ type: 'div', classes: 'task-content' });
  content.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p><small>${task.date}</small>`;

  const actions = dom.create({ type: 'div', classes: 'task-actions' });
  const editBtn = dom.create({ type: 'button', content: 'Redigera' });
  const delBtn = dom.create({
    type: 'button',
    content: 'Radera',
    classes: 'btn-danger-outline',
  });

  delBtn.onclick = async () => {
    await http.deleteTask(task.id);
    li.remove();
  };

  editBtn.onclick = () => {
    inTitle.value = task.title;
    inDesc.value = task.description;
    inDate.value = task.date;
    isEditingId = task.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  actions.append(editBtn, delBtn);
  li.append(content, actions);
  list.appendChild(li);
}

initApp();
