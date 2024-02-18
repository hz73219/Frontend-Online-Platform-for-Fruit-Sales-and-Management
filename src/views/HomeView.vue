<template>
  <div>
    <v-carousel cycle hide-delimiter-background show-arrows="hover">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <v-img
              :width="300"
              aspect-ratio="16/9"
              cover
              :src="slide"
            ></v-img>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div>
      <div class="d-flex fill-height justify-center align-center">
        <h2 class="mt-10" style="font-size: 35px;font-weight: bold;">Sản phẩm nổi bật</h2>
      </div>
      <div>
        <v-card>
          <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab :value="1" @click="windownListData()">Trái cây mới</v-tab>
            <v-tab :value="2" @click="windownListData()">Trái cây hot</v-tab>
            <v-tab :value="3" @click="windownListData()">Trái cây rẻ</v-tab>
          </v-tabs>
          <v-window v-model="tab" no-resize no-scroll>
            <v-window-item v-for="n in 3" :key="n" :value="n">
              <v-container fluid>
                <v-row>
                  <v-col v-for="item in listDataWindowm" :key="item.id" cols="12" md="3">
                    <ProductItem :product="item"></ProductItem>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import ProductItem from "../components/CardProduct.vue";
import axios from "axios";
export default {
  components: {
    ProductItem,
  },
  created() {
    this.search.newProduct = true;
    this.fetchListData();
  },
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
      require('../image/slider_1.webp'),
      require('../image/slider_2.webp'),
      require('../image/slider_3.webp'),
      ],
      tab: 0,
      hovered: false,
      productData:
      {
        name: "Crab Pool Security1",
        imageUrl: "https://picsum.photos/500/300?image=15&quot",
        price: "$30.00",
        link: "#",
      },
      model: null,
      listDataWindowm: [],
      search: {
        name: '',
        newProduct: false,
        mostProduct: false,
        priceProduct: '',
        maxPrice: 0,
        minPrice: 0,
        origin: '',
        category: '',
        page: 1,
        pageSize: 8,
      }

    }
  },
  methods: {
    addToCart() {
    },
    windownListData() {
      if (this.tab == 1) {
        this.search.newProduct = true;
        this.fetchListData("getall")
      }
      else {
        if (this.tab == 2) {
          this.resetSearch();
          this.search.mostProduct = true;
          this.fetchListData()
        }
        else {
          this.resetSearch();
          this.search.PriceProduct = 'mintomax';
          this.fetchListData()

        }
      }
    },
    fetchListData() {
      const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      };
      var json = JSON.stringify(this.search)
      console.log(json );

      axios
        .post('https://localhost:7202/api/Product/GetTypeProduct', json, config)
        .then(response => {
          console.log(response.data)
          this.listDataWindowm = response.data.products;
        })
        .catch(error => {
          console.error('Error:', error);
          return false;
        });
    },
    resetSearch() {
      this.search = {
        name: '',
        newProduct: false,
        mostProduct: false,
        priceProduct: '',
        maxPrice: 0,
        minPrice: 0,
        origin: '',
        category: '',
        page: 1,
        pageSize: 8,
      }
    }
  }

}
</script>
<style>
.buton-add-hover:hover {
  background-color: red !important;
  color: white !important;
}
</style>
