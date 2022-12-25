<template>
  <a-spin :spinning="loading">
    <nuxt-link :to="{ name: 'index' }">
      <a-button>Вернуться назад</a-button>
    </nuxt-link>

    <a-card :style="{ marginTop: '15px' }">
      <a-form>
        <a-form-item
          label="Название"
          :validate-status="errors.name ? 'error' : ''"
          :help="errors.name ? errors.name[0] : ''"
        >
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item
          label="Фотографии"
          :validate-status="errors.images ? 'error' : ''"
          :help="errors.name ? errors.images : ''"
        >
          <a-upload :show-upload-list="false" :custom-request="customRequest">
            <div v-if="form.images.length < 10">
              <a-card
                :body-style="{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }"
              >
                <a-icon type="plus" />
                <div class="ant-upload-text">Добавить</div>
              </a-card>
            </div>
          </a-upload>
          <div
            :style="{
              marginTop: '15px',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: '15px'
            }"
          >
            <a-card
              v-for="(image, index) in form.images"
              :key="image.uid"
              :body-style="{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }"
            >
              <img :src="image.preview" :style="{ width: '100%' }" />
              <a-alert
                v-if="errors[`images.${index}`]"
                type="error"
                :description="errors[`images.${index}`][0]"
              />
              <a-button @click="deletePhoto(image)">
                <a-icon type="delete" />
              </a-button>
            </a-card>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="create">Создать</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-spin>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      loading: false,
      form: {
        images: [],
        name: ""
      },
      errors: {}
    }
  },
  methods: {
    create() {
      this.loading = true
      this.errors = {}

      const data = new FormData()
      data.append("name", this.form.name)

      this.form.images.forEach((file) => {
        data.append("images[]", file)
      })

      this.$axios
        .post("/ads", data)
        .then()
        .catch((error) => {
          this.$message.error(error.response.data.message)
          if (error.response.status === 422 && error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    async customRequest(file) {
      if (file.file.type === "image/jpeg" || file.file.type === "image/png") {
        file.file.preview = await getBase64(file.file)
        this.form.images.push(file.file)
      } else {
        this.$message.warning("Изображение должно быть в формате jpeg или png")
      }
    },
    deletePhoto(file) {
      this.errors = {}
      this.form.images = this.form.images.filter(({ uid }) => uid !== file.uid)
    }
  }
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
</script>

<style scoped></style>
