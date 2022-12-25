<template>
  <div>
    <nuxt-link :to="{ name: 'ad-create' }">
      <a-button type="primary">Создать объявление</a-button>
    </nuxt-link>
    <div class="ad-grid">
      <a-card
        v-for="ad in ads"
        :key="ad.id"
        :body-style="{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          height: '100%'
        }"
      >
        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }"
        >
          <div
            :style="{
              backgroundImage: `url(${ad.media[0].original_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '200px',
              borderRadius: '5px'
            }"
          />
          <p :style="{ fontWeight: 600 }">{{ ad.name }}</p>
          <p>Создал: {{ ad.user.name }}</p>
        </div>
        <nuxt-link :to="{ name: 'ad-slug', params: { slug: ad.slug } }">
          <a-button>Перейти</a-button>
        </nuxt-link>
      </a-card>
    </div>
    <a-pagination
      v-if="ads.length"
      :default-current="paginate.page"
      :total="paginate.total"
      :page-size.sync="paginate.perPage"
      @change="handlePaginate"
    />
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
        .get(`/ads?page=${this.paginate.page}`)
        .then(({ data }) => {
          this.ads = data.data
          this.paginate.page = data.current_page
          this.paginate.perPage = data.per_page
          this.paginate.total = data.total
          this.$router.push({
            path: this.$route.path,
            query: { page: this.paginate.page }
          })
        })
        .catch((error) => {
          this.$message.error(error.response.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handlePaginate(page) {
      this.paginate.page = page
      this.getAds()
    }
  }
}
</script>

<style scoped>
.ad-grid {
  margin-top: 15px;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
}
</style>
