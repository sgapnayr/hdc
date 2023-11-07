<script setup lang="ts">
import { ref, computed } from 'vue'
import SendButton from '@/assets/icons/send-button.svg'
import { getNotes, createNote, getPatientName } from '@/lib/endpoints'
import { formatLegibleDate } from '@/utils/helpers'
import { useRoute } from 'vue-router'
import CaretIcon from '@/assets/icons/caret-icon.svg'

// STATE
const notes = ref([])
const loading = ref(true)
const text = ref('')
const type = ref('Patient') // This should probably be initialized to a default value
const showNotes = ref(false) // State to toggle the display of notes
const patientNames = ref({})
const isSubmitting = ref(false)
const nextToken = ref(null)

// COMPUTED PROPERTIES
const hasMoreNotes = computed(() => Boolean(nextToken.value))

// ROUTER
const route = useRoute()

// METHODS
async function fetchNotes() {
  loading.value = true
  try {
    const res = await getNotes(route?.params?.patientId as string, nextToken.value)
    if (notes.value.length) {
      notes.value = [...notes.value, ...res.notes] // Concatenate new notes to the existing ones
    } else {
      notes.value = res.notes // Initial fetch of notes
    }
    nextToken.value = res.nextToken // Update the nextToken
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
  await createNote(route?.params?.patientId as string, text.value, type.value)
  text.value = ''
  isSubmitting.value = false
  fetchNotes() // Refetch notes to display the new one
}

function toggleNotesDisplay() {
  showNotes.value = !showNotes.value
  if (showNotes.value && !notes.value.length) {
    fetchNotes()
  }
}

// INITIALIZATION
if (showNotes.value) {
  fetchNotes()
}
</script>

<template>
  <div class="flex flex-col w-full my-4">
    <div class="bg-white flex px-2 pr-3 py-2 rounded-md w-full justify-between shadow-sm items-center">
      <input v-model="text" class="bg-white w-full text-start outline-none focus:outline-none focus:ring-0" placeholder="Notes about patient" type="text" />
      <div
        v-if="isSubmitting"
        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-honeydew-purple border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <img v-else @click="handleCreateNote" class="cursor-pointer hover:opacity-50 transition active:scale-90" :src="SendButton" alt="Send Button" />
    </div>

    <div
      @click="toggleNotesDisplay"
      class="flex justify-between items-center my-2 cursor-pointer hover:underline text-sm hover:opacity-100 opacity-50 transition"
    >
      <!-- Open Notes Tab Button -->
      <div>
        <span>{{ showNotes ? 'Close' : 'Open' }} Notes</span>
      </div>
    </div>
    <!-- Notes Section -->
    <div v-show="showNotes" class="overflow-scroll no-scrollbars">
      <!-- Loading State -->
      <div v-if="loading" class="text-xl w-full p-4 rounded-2xl bg-[#f0f5fe] animate-pulse my-2 shadow-sm">Loading...</div>
      <!-- No Notes State -->
      <div v-else-if="!notes.length" class="text-gray-1 hover:text-black transition cursor-pointer">
        No new notes, write a message to your provider with the text box above.
      </div>
      <!-- Notes List -->
      <div v-else v-for="(note, idx) in notes" :key="note.noteId" class="bg-[#f0f5fe] w-full p-4 rounded-2xl text-[14px] text-[#403E48] my-2 shadow-sm">
        <div class="text-xl">{{ note.text }}</div>
        <div class="text-gray-1 mt-4 text-[12px]">By {{ patientNames[note.creatorId] }} on {{ formatLegibleDate(note.createdAt) }}</div>
      </div>
      <!-- Load More Notes Button -->
      <div v-if="hasMoreNotes" @click="fetchNotes" class="text-center cursor-pointer p-4 opacity-50 text-sm hover:opacity-100 transition hover:underline">
        Load more notes
      </div>
    </div>
  </div>
</template>
