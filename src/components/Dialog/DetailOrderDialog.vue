<template>
    <v-dialog v-model="dialog">
            <v-card>
                <v-card-title>
        <span class="headline">Chi tiết</span>
      </v-card-title>
        <div style="margin: 30px;">
        <v-data-table :headers="headers" :items-per-page="10" :items="orderObj" item-value="id" class="elevation-10">
          <template v-slot:item="{ item }">
            <tr>
              <td class="border-right border-bot" style="width: 50px;"><p class="text-center">{{ getIndex(item) }}</p> </td>
              <td class="border-right border-bot" style="width: 25%;">{{ item.product.name }}</td>
              <td class="border-right border-bot" style="width:150px ;">{{ item.quantity }} </td>
              <td class="border-right border-bot">{{ item.product.price.toLocaleString('vi-VN')  }} VNĐ</td>
              <td class="border-right border-bot">
              <v-carousel cycle hide-delimiter-background show-arrows="hover" style="height: 200px;">
                <v-carousel-item v-for="(image, i) in item.product.images" :key="i">
                  <v-sheet height="100%">
                    <div class="d-flex fill-height justify-center align-center" style="min-width: 200px;">
                      <v-img :src="linkServer + image.path" cover></v-img>
                    </div>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </td>
            </tr>
          </template>
        </v-data-table>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>

    </v-dialog>
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable';

export default {
    props: {
    orderObj: [],
  },
  components: {
    VDataTable, // Đăng ký v-data-table tại đây
  },
    data() {
        return {
            dialog: false,
            linkServer: "https://localhost:7202/",
            headers: [
          { title: 'STT', key: 'id' },
          { title: 'Tên sản phẩm', key: 'totalPrice' },
          { title: 'Số lựơng', key: 'quantity' },
          { title: 'Đơn giá', key: 'price' },
        ],
        };
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        getIndex(item) {
        return this.orderObj.indexOf(item) + 1;
        },
    }
};
</script>
    
<style scoped>
.border-right {
    border-right: 1px solid #ccc;
    /* Màu của đường gạch dọc */
}

.border-bot {
    border-bottom: 1px solid #ccc;
    /* Màu của đường gạch dọc */
}
</style>