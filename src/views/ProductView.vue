<template>
    <div>
        <div class="background" :style="{ backgroundImage: 'url(' + images + ')' }">
            <h2 class="text-center" style="padding-top: 50px;font-size: 30px;color: white;">Organi Shop</h2>
        </div>
        <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="2">
                <h2>Loại sản phẩm</h2>
                <p class="hoverColor" @click="setCategory(item)" :class="{ 'isClick': item.id == search.category }"
                    style="margin: 10px 0 0 15px; cursor: pointer;font-size: 18px;" v-for="item in categoryListData"
                    :key="item.id">{{ item.name }} </p>
                <h2 style="margin-top: 20px;">Nơi xuất xứ</h2>
                <p class="hoverColor" @click="setOrigin(item)" :class="{ 'isClick': item.id == search.origin }"
                    style="margin: 10px 0 0 15px; cursor: pointer;font-size: 18px;" v-for="item in originListData"
                    :key="item.id">{{ item.name }} </p>
                <h2 style="margin-top: 20px;">Giá sản phẩm</h2>
                <div>
                    <p style="margin-top: 10px;">Từ</p>
                    <v-text-field style="height: 20px;width:150px;" density="compact" variant="outlined"
                    @blur="onInputChange" v-model="search.minPrice" type="number"></v-text-field>
                    <p style="margin-top: 40px;">Đến</p>
                    <v-text-field style="height: 20px;width:150px;" density="compact" variant="outlined"
                        @blur="onInputChange" v-model="search.maxPrice" type="number"></v-text-field>
                </div>
                <v-btn @click="reloadSearch" class="mt-12">Làm mới tìm kiếm</v-btn>
            </v-col>
            <v-col cols="6">
                <div class="d-flex justify-space-between">
                    <h2>Sản phẩm</h2>
                    <div class="d-flex">
                        <label style="font-size: 18px; margin: 10px 10px 0 0;" for="sortOrder">Giá từ:</label>
                        <select style="width: 150px;" class="form-select " id="sortOrder" v-model="search.priceProduct"
                            @change="onSortPriceOrderChange">
                            <option value="mintomax">Thấp đến cao</option>
                            <option value="maxtomin">Cao đến thấp</option>
                        </select>
                    </div>
                </div>
                <div>
                    <v-row class="mt-2">
                        <v-col v-for="item in listDataProduct" :key="item.id" cols="12" md="4">
                            <ProductItem :product="item"></ProductItem>
                        </v-col>
                    </v-row>
                </div>
                <v-pagination class="mt-4" v-model="search.page" :length="maxPage" rounded="circle"></v-pagination>
            </v-col>

            <v-col cols="2"></v-col>

        </v-row>
    </div>
</template>

<script>
import ProductItem from "../components/CardProduct.vue";
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
export default {
    components: {
        ProductItem,
    },
    data() {
        return {
            images: require('../image/breadcrumb.jpg'),
            search: {
                name: '',
                newProduct: false,
                mostProduct: false,
                priceProduct: 'mintomax',
                maxPrice: 0,
                minPrice: 0,
                origin: '',
                category: '',
                page: 1,
                pageSize: 6,
            },
            listDataProduct: [],
            maxPage: 0,
            priceChange: false
        }
    },
    watch: {
        'search.maxPrice': function (newValues) {
            if(newValues<=0)
            {   
                this.search.maxPrice = 0
                this.priceChange = false;
            }
            else
            {
                this.priceChange = true;
            }

        },
        'search.minPrice': function (newValues) {
            console.log("max"+  newValues.type)
            if(newValues<=0)
            {             
                this.search.minPrice = 0
                this.priceChange = false;
            }
            else
            {
                this.priceChange = true;

            }
        },
        'search.page' : function()
        {
            this.fetchListData();

        }
    },
    created() {
        this.search.category = this.$route.query.category || '';
        this.search.origin = this.$route.query.origin || '';
        this.search.name = this.$route.query.name || '';

        this.fetchOriginList();
        this.fetchCategoryList();
        this.fetchListData();
    },
    computed: {
        ...mapGetters('originModules', {
            originListData: 'getListData',
        }),
        ...mapGetters('categoryModules', {
            categoryListData: 'getListData',
        }),
    },
    methods: {
        ...mapActions('originModules', { fetchOriginList: 'fetchListData', }),
        ...mapActions('categoryModules', { fetchCategoryList: 'fetchListData', }),
        fetchListData() {
            const config = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            };
            var json = JSON.stringify(this.search)
            console.log(json);
            axios
                .post('https://localhost:7202/api/Product/GetTypeProduct', json, config)
                .then(response => {
                    console.log(response.data)
                    console.log(response.data.maxPage)
                    this.maxPage = response.data.maxPage;
                    this.listDataProduct = response.data.products;

                })
                .catch(error => {
                    console.error('Error:', error);
                    return false;
                });
        },
        onInputChange() {
            if (this.priceChange == true) {
                this.fetchListData();
                this.priceChange = false;
            }

        },
        onSortPriceOrderChange() {
            this.fetchListData();
        },
        setCategory(item) {
            this.search.category = item.id;
            this.fetchListData();

        },
        setOrigin(item) {
            this.search.origin = item.id;
            this.fetchListData();

        },
        reloadSearch()
        {
            this.search.name ='';
            this.search.newProduct =false;
            this.search.mostProduct =false;
            this.search.priceProduct ='mintomax';
            this.search.maxPrice =0;
            this.search.minPrice =0;
            this.search.origin ='';
            this.search.category ='';
            this.search.page =1;
            this.search.pageSize =6;
            this.fetchListData();

        }
    }
}
</script>

<style scoped>
.background {
    width: 100%;
    height: 200px;
}

.hoverColor:hover {
    color: #05932C;
}

.isClick {
    color: #05932C;

}
</style>