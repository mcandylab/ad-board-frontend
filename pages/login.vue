<template>
  <div id="login">
    <a-card class="login_form">
      <a-spin :spinning="loading">
        <a-form>
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
          <a-form-item>
            <a-button type="primary" block @click="login">Войти</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
      <a-divider />
      <nuxt-link :to="{ name: 'register' }">
        <a-button block>Регистрация</a-button>
      </nuxt-link>
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
        email: null,
        password: null
      },
      errors: {}
    }
  },
  methods: {
    login() {
      this.loading = true
      this.errors = {}
      this.$auth
        .login({ data: this.form })
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
    }
  }
}
</script>

<style scoped>
#login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login_form {
  min-width: 500px;
}
</style>
