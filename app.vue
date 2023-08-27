<script setup lang="ts">
const newBookmark = ref<string>("");

const {
  data: bookmarks,
  pending,
  error,
  refresh,
} = useAsyncData(async () => $fetch("/api/bookmarks"));

const addBookmark = async () => {
  if (bookmarks.value === null) return;
  if (newBookmark.value === "") return;

  const bookmark = await $fetch("/api/bookmarks/create", {
    method: "POST",
    body: {
      url: newBookmark.value,
    },
  });

  // Optimistic update
  bookmarks.value.push(bookmark);
  newBookmark.value = '';
};
</script>

<template>
  <main class="container m-auto max-w-2xl bg-blue-500 text-white">
    <form class="flex flex-col items-center gap-2 mb-12" @submit.prevent>
      <label for="url">Add Bookmarks</label>
      <input
        class="p-1 ring-1 ring-zinc-500 text-black"
        name="url"
        id="url"
        type="text"
        required
        v-model="newBookmark"
      />
      <button class="w-[300px] bg-emerald-500 rounded-md drop-shadow-lg" @click="addBookmark">Add</button>
    </form>

    <div v-if="pending">Loading...</div>

    <div v-else-if="bookmarks && bookmarks.length > 0">
      <ul class="m-0 p-0 list-none">
        <li class="" v-for="bookmark in bookmarks" :key="bookmark.id">
          <a
            class="no-underline flex items-center gap-1"
            :href="bookmark.url"
            target="_blank"
            rel="noopener noreferer"
          >
            <img
              :src="bookmark.icon.url"
              class="aspect-square w-6 h-6 transition-all hover:scale-105 my-4"
            />
            {{ bookmark.url }}
          </a>
        </li>
      </ul>
    </div>

    <div v-else>No bookmarks, yet...</div>
  </main>
</template>

<style scoped>
* {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>
