<script>
  import { login } from './api';
  import { isAuthenticated } from './store';

  let email = '';
  let password = '';

  async function handleLogin() {
    try {
      await login(email, password);
      isAuthenticated.set(true);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  }
</script>

<form on:submit|preventDefault={handleLogin} class="space-y-4">
  <input bind:value={email} placeholder="Email" class="block w-full p-2 border rounded" />
  <input bind:value={password} type="password" placeholder="Password" class="block w-full p-2 border rounded" />
  <button type="submit" class="bg-blue-500 text-white p-2 rounded">Login</button>
</form>
