<template>
  <div id="register">
    <a-card class="register_form">
      <a-spin :spinning="loading">
        <a-form>
          <a-form-item
            label="Имя"
            :validate-status="errors.name ? 'error' : ''"
            :help="errors.name ? errors.name[0] : ''"
          >
            <a-input v-model="form.name" />
          </a-form-item>
          <a-form-item
            label="Email"
            :validate-status="errors.email ? 'error' : ''"
            :help="errors.email ? errors.email[0] : ''"
          >
            <a-input v-model="form.email" />
          </a-form-item>
          <a-form-item
            label="Пароль"
            :validate-status="errors.password ? 'error' : ''"
            :help="errors.password ? errors.password[0] : ''"
          >
            <a-input-password v-model="form.password" />
          </a-form-item>
          <a-form-item label="Повторите пароль">
            <a-input-password v-model="form.password_confirmation" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block @click="register">
              Зарегистрироваться
            </a-button>
          </a-form-item>
        </a-form>
        <a-divider />
        <p>Уже есть аккаунт?</p>
        <nuxt-link :to="{ name: 'login' }">
          <a-button block>Войти</a-button>
        </nuxt-link>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  auth: "guest",
  layout: "auth",
  data() {
    return {
      loading: false,
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      errors: {}
    }
  },
  methods: {
    register() {
      this.loading = true
      this.errors = {}
      this.$axios
        .post("/register", { ...this.form })
        .then(({ data }) => {
          this.$auth.setUserToken(data.token).then(() => {
            this.$auth.fetchUser().then(() => {
              this.$router.push({ name: "index" })
            })
          })
        })
        .catch((error) => {
          this.$message.error(error.response.data.message)
          if (error.response.status === 422 && error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
#register {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register_form {
  min-width: 500px;
}
</style>
