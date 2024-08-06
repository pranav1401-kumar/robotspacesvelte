const API_URL = 'http://localhost:8055';

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data.errors) throw new Error(data.errors);
  localStorage.setItem('authToken', data.data.access_token);
  return data.data;
}

export function logout() {
  localStorage.removeItem('authToken');
}

export async function fetchTasks() {
  const response = await fetch(`${API_URL}/items/tasks`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  const data = await response.json();
  return data.data;
}

export async function createTask(task) {
  const response = await fetch(`${API_URL}/items/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(task)
  });
  const data = await response.json();
  return data.data;
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/items/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
}
