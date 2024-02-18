<template>
    <v-row>
      <v-carousel cycle :style="{ height: '100%' }" show-arrows="hover" hide-delimiters :interval="20000">
        <v-carousel-item v-for="(slide, index) in Math.ceil(productDataList.length / 3)" :key="index">
          <v-row v-for="i in 3" :key="i" class="elevation-10 ma-6" style="background-color: #F2F3F4;">
            <template v-if="((index * 3) + i - 1) < productDataList.length">
              <v-col cols="7">
                <img :style="{ width: '100%' }" :src="productDataList[(index * 3) + i - 1].imageUrl" alt="">
              </v-col>
              <v-col cols="5" class="mt-4">
                <h6 style="font-size: 18px;">{{ productDataList[(index * 3) + i - 1].name }}</h6>
                <span style="font-size: 15px;color: red;">{{ productDataList[(index * 3) + i - 1].price }}</span>
                <v-btn outlined style="color: red; font-size: 12px;" class="mt-4 buton-add-hover v-btn--variant-outlined">
                  Thêm vào giỏ hàng
                </v-btn>
              </v-col>
            </template>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </template>
  
  <script>
  export default {
    props: {
      productDataList: Array, 
    },
  };
  </script>
  
  <style scoped>

  </style>
  