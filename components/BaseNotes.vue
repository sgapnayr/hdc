<script setup lang="ts">
// IMPORTS
import { ref } from 'vue'
import SendButton from '@/assets/icons/send-button.svg'
import { getNotes, createNote, getPatientName } from '@/lib/endpoints'
import { useRoute } from 'vue-router'

// STATE
const notes = ref(null)
const loading = ref(true)
const text = ref()
const type = ref()
const name = ref()
const patientNames = ref({})
const isSubmitting = ref(false) // New state for tracking note submission

// ROUTER
const route = useRoute()

// METHODS
async function fetchNotes() {
  loading.value = true
  try {
    const res = await getNotes(route?.params?.patientId as string)
    notes.value = res.notes

    for (let note of res.notes) {
      if (!patientNames.value[note.creatorId]) {
        const patientRes = await getPatientName(note.creatorId as string)
        patientNames.value[note.creatorId] = patientRes.name
      }
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

async function handleCreateNote() {
  isSubmitting.value = true
  await createNote(route?.params?.patientId as string, text.value, (type.value = 'Patient'))
  await fetchNotes()
  text.value = ''
  isSubmitting.value = false
}

// INITIALIZATION
fetchNotes()
</script>

<template>
  <div class="flex items-center w-full my-4">
    <div class="bg-white flex px-2 pr-3 py-2 rounded-md w-full justify-between shadow-sm items-center">
      <input
        v-model="text"
        class="bg-white w-full text-start outline-none focus:outline-none focus:ring-0"
        placeholder="Message your provider here"
        type="text"
      />
      <!-- Either show the loader or the image based on the isSubmitting state -->
      <div
        v-if="isSubmitting"
        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-honeydew-purple border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <img v-else @click="handleCreateNote" class="cursor-pointer hover:opacity-50 transition active:scale-90" :src="SendButton" alt="Send Button" />
    </div>
  </div>

  <!-- Loading State -->
  <div v-if="loading" class="text-xl w-full p-4 rounded-2xl bg-[#f0f5fe] animate-pulse my-2">Loading...</div>
  <!-- No Notes State -->
  <div v-else-if="!notes?.length" class="text-gray-1 hover:text-black transition cursor-pointer">
    No new notes, write a message to your provider with the text box above.
  </div>
  <!-- Notes -->
  <div v-else v-for="(note, idx) in notes" class="bg-[#f0f5fe] w-full p-4 rounded-2xl text-[14px] text-[#403E48] my-2">
    <div class="text-xl">{{ note.text }}</div>
    <div class="text-gray-1 mt-4 text-[12px]">Created by {{ patientNames[note.creatorId] }} on {{ note.createdAt }}</div>
  </div>
</template>
