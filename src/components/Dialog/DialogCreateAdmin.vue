<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ header }}</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent ref="formRef">
          <div v-for="(value, key) in dialogData.label" :key="key" v-show="key !== 'id'">
            <div class="text-subtitle-1 text-medium-emphasis">{{ getLabel(key) }}</div>
            <v-text-field v-model="dialogData.obj[key]" density="compact" :placeholder="getLabel(key)" variant="outlined"
              clearable :type="getType(key)"></v-text-field>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="SaveData">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    formData: Object,
  },

  data() {
    return {
      dialog: false,
      dialogData: null,
      reset: false,
      header: "Tạo mới"
    };
  },
  mounted() {
    this.dialogData = { ...this.formData };
  },
  updated() {
    if (this.reset == true) {
      this.$refs.formRef.reset();
    }
  },
  methods: {
    openDialog(check) {
      this.dialog = true;
      this.reset = check;
      if (check) {
        this.header = "Tạo mới";
      }
      else {
        this.header = "Cập nhật";
      }
    },
    getLabel(key) {
      return this.dialogData.label[key] || key;
    },
    getType(key) {
      return this.dialogData.type[key] || 'text';
    },
    SaveData() {
      this.$emit('save', this.dialogData.obj);
      this.dialog = false;
    }
  }
};
</script>
