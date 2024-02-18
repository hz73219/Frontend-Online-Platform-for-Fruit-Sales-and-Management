<template>
    <v-dialog v-model="dialog" width="auto" min-width="200">
        <v-card>
            <v-card-text>
                {{ content }}
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Đóng</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
 props: {
    content: String,
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
}
}
</script>

<style></style>