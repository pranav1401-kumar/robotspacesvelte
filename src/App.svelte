<script>
  import AddTask from './AddTask.svelte';
  import Tasks from './Tasks.svelte';
  import Login from './Login.svelte';
  import Logout from './Logout.svelte';
  import { isAuthenticated } from './store';
</script>

<main class="max-w-2xl mx-auto p-4 space-y-8">
  <h1 class="text-3xl font-bold text-center">Task Manager</h1>
  {#if $isAuthenticated}
    <Logout />
    <AddTask />
    <Tasks />
  {:else}
    <Login />
  {/if}
</main>
