<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">LeadBook</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link :to="{name: 'login'}" class="nav-link" href="#">LOGIN</router-link>
      </li>
    </ul>
  </div>
</nav>
  <router-view />
</template>

<script>

export default {
}
</script>

<style>
  body {
    background: lightgray!important;
  }
  .form-group{
    margin-bottom: 1rem;    
  }
  
</style>