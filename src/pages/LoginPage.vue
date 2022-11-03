<template>
    <form style="width: 350px;" v-on:submit.prevent>
      <div class="mb-3">
        <input 
          v-model="login.email"
          autofocus 
          type="email" 
          class="form-control" 
          id="exampleInputEmail1" 
          aria-describedby="emailHelp"
          v-bind:placeholder="l[login.lang]['email']"
        >
      </div>
      <div class="mb-3">
        <input 
          v-model="login.password" 
          type="password" 
          class="form-control" 
          id="exampleInputPassword1"
          v-bind:placeholder="l[login.lang]['password']"
          >
      </div>
      <div class="form-group">
        <select v-model="login.lang" class="form-control" id="exampleSelect1">
          <option selected="selected" value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>
      <div v-if="errorF" style="margin-top: 0.5rem; color: red;">Логин или пароль неверный!</div>
      <button style="marginTop: 1rem" class="btn btn-primary" @click="auth">{{l[login.lang]['login']}}</button>
    </form>
</template>
  
<script>
  
import axios from 'axios';
  
export default {
  
data() {
	return {
    loading: false,
    errorF: false,
    login: {
      email: "",
      password: "",
      lang: "ru"
    },
    lang : 'ru',
    l: {
      'ru': {
        'login': 'Войти',
        'password': 'Пароль',
        'email': 'Логин'
      },
      'en': {
        'login': 'Login',
        'password': 'Password',
        'email': 'E-mail'
      }
    }
	}
},
methods: {
  
  async auth(){
    try {
      var t = this;
      t.errorF = false;
      const response = await axios.post(' http://api.mechatronics.by/api/3/login', this.login);
        console.log(response)
        console.log('User signed in!');
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('id', response.data.user.id);
        window.localStorage.setItem('name', response.data.user.name);
        window.token = response.data.token;
        this.$router.push({path: '/'})
      
    } catch (error) {
      t.errorF = true;
    }
  }
},
  
mounted() 
  {
    console.log('login desktop start');
  },
   
watch: {
  },
}
  
  
</script>
  
<style>

form {
    margin: 0 auto;
}

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}  
.title {
  text-align: center;
  margin-bottom: 30px;
}
img {
  margin-bottom: 16px;
  max-width: 80px;
}
  
 
 .md-button {
   margin: 0;
 }
.form {
  margin-bottom: 60px;
}
.background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 5;
  margin-top: -50px;
  background: white;
}
.md-content {
  z-index: 7;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

