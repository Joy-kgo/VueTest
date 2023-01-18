<template>
  <div>
      <div class="card-body">
        <h5 class="card-title">Card3</h5>
        <p class="card-text">Some quick example text.</p>
        <a href="#" class="btn btn-primary">card3</a>
      </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
    }
  },
  created(){
    console.log(this.$route.params.id);//route裡面的params的自訂參數
    const id=this.$route.params.id;
    //動態路由
    this.$http.get(`https://randomuser.me/api/?seed=${id}`).then(
      (response)=>{
      console.log(response);
    })
  }
}
</script>

