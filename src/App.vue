<template>
  <nav>
    <div class="site_name" @click="redirectUser">
      <img src="/3190851.png">
      <p>Коктейли</p>
    </div> 
    <div class="routes">
      <router-link to="/">Каталог</router-link>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    redirectUser(){
                this.$router.push('/')
            }
  }
}
</script>

<style scoped>

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    height: 70px;
    border-bottom: 1px solid var(--main-border-color);
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
  .site_name {
    margin-left: 5px;
    display: flex;
    align-items: baseline;
    cursor: pointer;
  }

  .site_name p{
    font-size: 2.2rem;
    color: #E1E1E1;
  }

  .site_name img{
    height: 3.4rem;
    width: 3.4rem;
  }

  .routes{
    margin-right: 5px;
  }
</style>