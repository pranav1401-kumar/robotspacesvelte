<script>
  import { logout } from './api';
  import { isAuthenticated } from './store';

  function handleLogout() {
    logout();
    isAuthenticated.set(false);
  }
</script>

<button on:click={handleLogout} class="bg-red-500 text-white p-2 rounded">Logout</button>
