<template>
    <div class="threejs-main">
      <img :src="require('@/assets/threejs.png')" alt="Three.js Image" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'ThreeJs',
  };
  </script>
  
  <style scoped>
  .threejs-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .threejs-main img {
    max-width: 100%;
    height: auto;
  }
  </style>
  