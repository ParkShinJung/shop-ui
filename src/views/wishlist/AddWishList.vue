<template>
  <v-container fluid>
    <v-card-text>
      <div style="color: rgb(200,200,200)" class="mb-8"> 새 카테고리를 만들고 선택한 상품을 해당 카테고리에 담습니다.</div>

      <v-form ref="form" lazy-validation>
        <div class="d-flex flex-column align-center">
            <v-text-field
                outlined
                v-model="addWishListTitle"
                style="width: 80%"
                append-icon="mdi-folder-plus"
                @click:append="addWishList()"
                placeholder="새 카테고리 이름을 입력 후 아이콘을 눌러주세요"
                :rules="[rules.required , rules.nameRule ]"
            >
            </v-text-field>
        </div>
      </v-form>

    </v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "AddWishList",
  props:["selectBid"],
  data: () => ({
    addWishListTitle:'',
    rules:{
      required : value => !!value || '필수 입력란입니다.',
      nameRule : v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '카테고리 이름에는 특수문자를 사용할 수 없습니다.'
    }
  }),

  methods:{
    addWishList(){
      const validate = this.$refs.form.validate();
      if(validate) {
        let data = {}
        data.bid = this.selectBid;
        data.wishlistTitle = this.addWishListTitle
        this.$axios.post("wish/", JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        }).then(response => {
          console.log(response.data)
          let childData = 'WishList'
          this.$emit('pushTab', childData)
        }).catch(error => {
          console.log(error.response);
        })
      }
    },

  },
}
</script>

<style scoped>

</style>