<script>
  import { onMount } from 'svelte';
  import { fetchTasks, deleteTask } from './api';
  import { tasks, isAuthenticated } from './store';  // Import the store

  onMount(async () => {
    if ($isAuthenticated) {
      const fetchedTasks = await fetchTasks();
      tasks.set(fetchedTasks);
    }
  });

  async function handleDelete(id) {
    await deleteTask(id);
    tasks.update(t => t.filter(task => task.id !== id));  // Remove the task from the store
  }
</script>

{#if $isAuthenticated}
  <ul class="space-y-4">
    {#each $tasks as task (task.id)}
      <li class="p-4 border rounded shadow">
        <h3 class="text-xl font-semibold">{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Due Date: {task.due_date}</p>
        <button on:click={() => handleDelete(task.id)} class="bg-red-500 text-white p-2 rounded">Delete</button>
      </li>
    {/each}
  </ul>
{:else}
  <p>Please log in to view tasks.</p>
{/if}
