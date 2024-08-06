<script>
  import { createTask } from './api';
  import { tasks } from './store';  // Import the store
  import { isAuthenticated } from './store'; // Import the authentication state

  let title = '';
  let description = '';
  let status = '';
  let due_date = '';

  $: if (!$isAuthenticated) {
    title = '';
    description = '';
    status = '';
    due_date = '';
  }

  async function handleSubmit() {
    const newTask = await createTask({ title, description, status, due_date });
    tasks.update(t => [newTask, ...t]);  // Add the new task to the store immediately
    title = '';
    description = '';
    status = '';
    due_date = '';
  }
</script>

{#if $isAuthenticated}
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <input bind:value={title} placeholder="Title" class="block w-full p-2 border rounded" />
    <textarea bind:value={description} placeholder="Description" class="block w-full p-2 border rounded"></textarea>
    <input bind:value={status} placeholder="Status" class="block w-full p-2 border rounded" />
    <input bind:value={due_date} type="datetime-local" placeholder="Due Date" class="block w-full p-2 border rounded" />
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Task</button>
  </form>
{:else}
  <p>Please log in to add tasks.</p>
{/if}
