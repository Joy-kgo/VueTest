<template>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link class="nav-link" :to="{ name: '首頁' }">Home </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/page">Page </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>


