<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import SendButton from '@/assets/icons/send-button.svg'
import { getNotes, createNote } from '@/lib/endpoints'
import { useRoute } from 'vue-router'

// STATE **********************************************************************
const notes = ref(null)
const loading = ref(true)
const text = ref()
const type = ref()

// ROUTER **********************************************************************
const route = useRoute()

// METHODS *************************************************************
async function fetchNotes() {
  loading.value = true
  try {
    const res = await getNotes(route?.params?.patientId as string)
    notes.value = res.notes
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

async function handleCreateNote() {
  await createNote(route?.params?.patientId as string, text.value, (type.value = 'Patient'))
  await fetchNotes()
  text.value = ''
}

// INITIALIZATION *************************************************************
fetchNotes()
</script>

<template>
  <div class="flex items-center w-full my-4">
    <div class="bg-white flex px-2 pr-3 py-2 rounded-md w-full justify-between shadow-sm">
      <input
        v-model="text"
        class="bg-white w-full text-start outline-none focus:outline-none focus:ring-0"
        placeholder="Message your provider here"
        type="text"
      />
      <img @click="handleCreateNote" class="cursor-pointer hover:opacity-50 transition active:scale-90" :src="SendButton" alt="Send Button" />
    </div>
  </div>
  <!-- Loading State -->
  <div v-if="loading" class="w-full p-4 rounded-2xl bg-[#f0f5fe] animate-pulse my-2">Loading...</div>
  <div v-else-if="!notes?.length" class="text-gray-1 hover:text-black transition cursor-pointer">
    No new notes, write a message to your provider with the text box above.
  </div>
  <div v-else v-for="(note, idx) in notes" class="bg-[#f0f5fe] w-full p-4 rounded-2xl text-[14px] text-[#403E48] my-2">
    <div>{{ note.text }}</div>
    <div class="text-[#6C6A7C] mt-4 text-xs">{noteMadeByThisPerson} on {{ note.createdAt }}</div>
  </div>
</template>
