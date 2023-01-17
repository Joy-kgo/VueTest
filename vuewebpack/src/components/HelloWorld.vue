<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>
      <input type="text" v-model="filterText" @keyup.enter="filterData"/>
    </h3>
    <h3 v-for="(item,key) in testData"  v-if="item.index > 0">
      喜歡喝的飲料：   {{ item.drink }}</h3>
    <h2>Essential Links</h2>
    <div v-if="isSuccess">成功</div>
    <div v-if="!isSuccess">失敗</div>
    <div v-if="isSuccess">如果成功</div>
    <div v-else>如果失敗</div>
    <button @click="togleLoginType">切換狀態</button>
    <template v-if="loginType === 'username'" >
      <label>Username</label>
      <input type="text" placeholder="Enter your username." :key="1"/>
    </template>
    <template v-else>
      <label>Email</label>
      <input type="text" placeholder="Enter your email." :key="2"/>
    </template>

    <input type="text" v-model="filterText" />
    <ul>
      <li v-for="(item,key) in filterArray" :key="item.drink">
        {{ key }}-{{ item.name }}{{ item.drink }}好喝<input type="text"/>
      </li>
      <li>{{ newDate }}</li>
      <li>{{ trigger }}
        <button @click="watch()">click me</button></li>
    </ul>

    <div id="app">
      <h2>靜態傳遞</h2>
      <photo></photo>
      <h2>動態傳遞</h2>
      <photo></photo>
    </div>
    
    

    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>

</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      filterText:"",
      arrayData:[
        {name:'Alber',drink:'tea'},
        {name:'Brand',drink:'coffee'},
    ],
      filterArray:[],
      testData:[
        {index:1,drink:'GreenTea'},
        {index:2,drink:'puddingMilkTea'},
        {index:3,drink:'appleJuice'},
        {index:4,drink:'orangeJuice'},
        {index:-1,drink:'BlackTea'}
    ],
    isSuccess:true,
    showTemplate:true,
    link:'a',
    loginType:"username",
    newDate:"",
    trigger:true
    }
  },
  computed:{
    filterArray:function(){
      var vm=this;
      return vm.arrayData.filter(function(ii){
        return ii.name.match(vm.filterText)
      })
    }
  },
  watch:{
    trigger:function(){
      var vm=this;
      setTimeout(()=>{
        vm.trigger=false
      },3000)
    }
  },
  mounted:function(){
    this.newDate=Math.floor(Date.now()/1000);
  },
  methods:{
    filterData:function(){
      var vm=this;
      vm.filterArray=vm.arrayData.filter(function(item){
          console.log(vm.filterText,item.name,item.name.match(vm.filterText));
          return item.name.match(vm.filterText);
      });
    },
    togleLoginType:function(){
      return this.loginType = this.loginType === "username"?"email":"username";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color:red;
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
