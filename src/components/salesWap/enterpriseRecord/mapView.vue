<template>

</template>

<script>
export default {
  name: "mapView",
  data() {
    return {
      
    };
  },
  created() {
    plus.geolocation.getCurrentPosition((state, point) => {
      if (state == 0) {
        console.log(point.getLng(), point.getLat());
      } else {
        console.log('无法获取当前位置');
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>