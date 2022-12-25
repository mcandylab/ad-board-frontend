<template>
  <div>
    <nuxt-link :to="{ name: 'ad-create' }">
      <a-button type="primary">Создать объявление</a-button>
    </nuxt-link>
    <div class="ad-grid">
      <a-card v-for="ad in ads" :key="ad.id">
        <p>Hello</p>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      loading: true,
      ads: [],
      paginate: {
        page: 1,
        perPage: 0,
        total: 0
      }
    }
  },
  mounted() {
    this.getAds()
  },
  methods: {
    getAds() {
      this.loading = true
      this.$axios
        .get("/ads")
        .then(({ data }) => {
          this.ads = data.data
          this.paginate.page = data.current_page
          this.paginate.perPage = data.per_page
          this.paginate.total = data.total
        })
        .catch((error) => {
          this.$message.error(error.response.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.ad-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
}
</style>
