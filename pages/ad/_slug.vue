<template>
  <div
    v-if="ad"
    :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      alignItems: 'start'
    }"
  >
    <nuxt-link :to="{ name: 'index' }">
      <a-button>Вернуться назад</a-button>
    </nuxt-link>
    <h1>{{ ad.name }}</h1>
    <div
      :style="{
        marginTop: '15px',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: '15px'
      }"
    >
      <a-card v-for="image in ad.media" :key="image.id">
        <img :src="image.original_url" :style="{ width: '100%' }" />
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slug",
  data() {
    return {
      ad: {}
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    }
  },
  mounted() {
    this.getAd()
  },
  methods: {
    getAd() {
      this.$axios
        .get(`/ads/${this.slug}`)
        .then(({ data }) => {
          this.ad = data
        })
        .catch(() => {
          this.$router.push({ name: "index" })
        })
    }
  }
}
</script>
