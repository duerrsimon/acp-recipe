<template>
  <img
    v-if="showIcon"
    :src="'icons/' + icon + '.png'"
    :alt="title + ' Icon'"
    class="h-6 w-6 mr-2"
  />
</template>

<script>
export default {
  props: ['id', 'title'],
  data() {
    return {
      images: {
        1011: 'icons8-spinach-100',
        1015: 'icons8-tomato-100',
        1016: 'icons8-juice-bottle-100',
      },
    }
  },
  computed: {
    icon() {
      if (this.id in this.images) {
        return this.images[this.id]
      } else {
        return ''
      }
    },
    showIcon() {
      if (this.id in this.images) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
