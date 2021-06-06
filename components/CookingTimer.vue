<template>
  <div>
    <div
      class="
        bg-white
        w-full
        text-gray-800
        rounded
        border-b-2 border-darkmulegreen
        shadow-md
        py-2
        px-6
        inline-flex
        items-center
      "
    >
      <vac
        :left-time="timeString"
        :auto-start="false"
        :ref="title"
        @start="hideTimer()"
        @finish="finishTimer()"
      >
        <span
          slot="process"
          slot-scope="{ timeObj }"
          class="flex items-center space-x-3"
        >
          <button
            @click="pauseTimer()"
            class="flex items-center space-x-1 justify-between"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-if="!pause"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-if="pause"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span v-if="parseInt(timeObj.h) > 0">{{
              `${timeObj.h} h ${timeObj.m}:${timeObj.s}`
            }}</span>
            <span v-else>{{ `${timeObj.m}:${timeObj.s}` }}</span>
          </button>

          <button @click="resetTimer()" class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
            <span>Reset</span>
          </button>
        </span>
        <span slot="finish"
          ><button
            @click="deactivateTimer()"
            class="flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
            <span>stop timer</span>
          </button></span
        >
      </vac>

      <div
        v-if="showButton"
        @click="startTimer()"
        class="flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="mr-2"> timer {{ formattedTime }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['time', 'title'],
  data() {
    return {
      timerStarted: false,
      showButton: true,
      pause: false,
    }
  },
  computed: {
    timeString() {
      const splitTime = this.time.split(':')
      const hours = parseInt(splitTime[0])
      const minutes = parseInt(splitTime[1])
      return hours * 3600000 + minutes * 60000
    },
    formattedTime() {
      const splitTime = this.time.split(':')
      if (parseInt(splitTime[0]) > 0) {
        return parseInt(splitTime[0]) + ' h ' + parseInt(splitTime[1]) + ' min '
      }
      return parseInt(splitTime[1]) + ' min'
    },
  },
  methods: {
    finishTimer() {
      this.$sounds.back.play()
    },
    deactivateTimer() {
      this.$sounds.back.stop()
      this.showButton = true
      this.$refs[this.title].state = 'start'
      this.$refs[this.title].startCountdown(false)
    },
    resetTimer() {
      this.$refs[this.title].startCountdown(true)
      this.$refs[this.title].stopCountdown()
      this.$refs[this.title].state = 'start'
      this.showButton = true
      this.pause = false
      // this.$refs[this.title]['left-time'] = this.time * 1000
    },
    hideTimer() {
      this.showButton = false
    },
    startTimer() {
      this.timerStarted = !this.timerStarted
      this.$refs[this.title].startCountdown(true)
    },
    pauseTimer() {
      if (!this.pause) {
        this.$refs[this.title].pauseCountdown()
        this.pause = true
      } else {
        this.$refs[this.title].startCountdown()
        this.pause = false
      }
    },
  },
}
</script>
