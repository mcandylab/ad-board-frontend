<template>
  <div>
    <div class="navigation">
      <div class="navigation__items">
        <p class="logo__name">Ad Board</p>
        <div class="navigation__items__logout">
          <p>{{ user.name }}</p>
          <a-button @click="logout">Выйти</a-button>
        </div>
      </div>
    </div>
    <main class="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: "Auth",
  computed: {
    user() {
      return this.$auth.user
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.navigation {
  background: white;
  padding: 15px 0 15px 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;
}

.navigation__items {
  max-width: 1024px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navigation__items__logout {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo__name {
  font-weight: 700;
  font-size: 16px;
}

.main {
  max-width: 1024px;
  margin: auto;
}
</style>
