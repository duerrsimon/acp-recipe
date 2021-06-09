<template>
  <div class="bg-white">
    <div class="flex items-center justify-between py-4 px-4">
      <button
        class="text-gray-700"
        ref="openButton"
        @click="open"
        type="button"
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
      appear
    >
      <div v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
        <div
          @click="close"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="-1"
        ></div>
      </div>
    </transition>
    <!-- Off-canvas menu -->
    <transition
      enter-class="translate-x-full"
      enter-active-class="ease-out transition-slow"
      enter-to-class="translate-x-0"
      leave-class="translate-x-0"
      leave-active-class="ease-in transition-medium"
      leave-to-class="translate-x-full"
      appear
    >
      <div
        v-show="isOpen"
        class="
          z-10
          fixed
          inset-y-0
          left-0
          max-w-sm
          bg-white
          transition-transform
          overflow-y-auto
        "
      >
        <div class="relative z-10 bg-white">
          <div
            :class="isOpen ? 'block' : 'hidden'"
            class="absolute top-0 right-0 p-4"
          >
            <button
              ref="closeButton"
              @click="close"
              type="button"
              class="text-gray-600 focus:outline-none focus:text-gray-900"
              aria-label="Close"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L13.4142 12L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L12 10.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L10.5858 12L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L12 13.4142L18.2929 19.7071Z"
                />
              </svg>
            </button>
          </div>
          <img
            src="https://d2ibcm5tv7rtdh.cloudfront.net/lamule/logo.png"
            class="h-24 w-24 my-4 mx-6"
            alt="Logo"
          />

          <div class="mt-6 px-4">
            <LanguageToggle />
          </div>

          <div class="px-4 pt-4 pb-6">
            <a
              href="#"
              class="
                mt-8
                block
                text-xs
                font-semibold
                text-gray-600
                uppercase
                tracking-wider
              "
              >Categories</a
            >
            <NuxtLink
              :to="localePath('/category/' + value.key)"
              class="
                flex
                mt-4
                block
                font-medium
                text-gray-900
                hover:text-gray-700
                space-x-4
              "
              v-for="(value, id) in categories"
              :key="id"
            >
              <img
                :src="'/icons/' + value.icon + '.png'"
                alt=""
                class="h-6 w-6"
              />
              <span>{{ $t('category.' + id) }}</span>
            </NuxtLink>
          </div>
          <div class="border-t-2 border-gray-200 px-4 pt-6">
            <a
              href="https://lamule.ch/recettes/"
              class="block font-medium text-gray-900 hover:text-gray-700"
              >{{ $t('contribute') }}</a
            >
            <a
              href="https://lamule.ch/"
              class="mt-4 block font-medium text-gray-900 hover:text-gray-700"
              >{{ $t('concept') }}</a
            >
          </div>
        </div>
        <div class="relative bg-white">
          <div class="p-4">
            <a
              href="https://lamule.ch/paniers/"
              class="
                block
                px-3
                py-3
                font-medium
                text-center
                bg-mulegreen
                rounded-lg
                text-gray-900
                hover:bg-gray-400
                focus:outline-none
                focus:bg-gray-400
              "
              >{{ $t('subscribe') }}</a
            >
          </div>
        </div>
        <div class="mt-6 text-gray-600 text-xs mx-auto text-center">
          Icons by <a href="https://icons8.com/">icon8</a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
      categories: {
        1033: { icon: 'icons8-vegetarian-food-100', key: 'vegetarian' },
        1034: { icon: 'icons8-vegan-food-100', key: 'vegan' },
        1035: { icon: 'icons8-naan-100', key: 'indian' },
        1157: { icon: 'icons8-dim-sum-100', key: 'asian' },
        1058: { icon: 'icons8-healthy-food-100', key: 'soup' },
        1158: { icon: 'icons8-taco-100', key: 'quick' },
      },
    }
  },
  methods: {
    open() {
      this.isOpen = true
      this.$nextTick(() => {
        this.$refs.closeButton.focus()
      })
    },
    close() {
      this.isOpen = false
      this.$nextTick(() => {
        this.$refs.openButton.focus()
      })
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (isOpen) {
          document.body.style.setProperty('overflow', 'hidden')
        } else {
          document.body.style.removeProperty('overflow')
        }
      },
    },
  },
}
</script>
