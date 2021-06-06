<template>
  <div class="inline-block">
    <NuxtLink to="/recipe">
      <div
        class="
          w-64
          h-64
          max-w-xs
          overflow-hidden
          rounded-lg
          shadow-md
          bg-white
          hover:shadow-xl
          transition-shadow
          duration-300
          ease-in-out
        "
      >
        <div
          class="relative h-40 bg-cover bg-center"
          :style="'background-image: url(\'' + recipe.img + '\')'"
        >
          <div
            class="
              absolute
              bottom-0
              right-0
              m-3
              bg-white
              h-8
              w-8
              flex
              items-center
              justify-center
              rounded-full
            "
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
        <div class="my-1 px-2">
          <p class="font-semibold my-2">{{ recipe.title }}</p>
          <div class="flex space-x-2 text-gray-400 text-sm items-center">
            <!-- svg  -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{{ recipe.time }}</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p v-for="cat in recipe.categories" :key="cat">{{ cat }}</p>
          </div>

          <div class="mt-3">
            <p class="text-xs text-gray-400">avec Roquette, Persil</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script>
export default {
  props: ['recipe'],
}
</script>
