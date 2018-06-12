  <template>
    <div id="app">
      <router-view ></router-view>
    </div>
  </template>
<script>
export default {
  name: 'App'
}
</script>

<style>
#app
{
height: 97vh;
}
@font-face {
  font-family: 'LCDBOLD';
  src: url('../src/assets/font/LCDBOLD.eot');
  src: local('LCDBOLD'), url('../src/assets/font/LCDBOLD.woff') format('woff'), url('../src/assets/font/LCDBOLD.ttf') format('truetype');
}
* {
  font-family: 'LCDBOLD' ;
  font-size: large;
}
</style>
