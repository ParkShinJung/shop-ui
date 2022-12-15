<template>
  <v-container>
    <v-row class="pa-0">
      <v-col cols="12" sm="12" md="12" class="main-nav">
        <v-navigation-drawer
            color="rgb(40,40,40)"
            class="index-nav"
            :mini-variant.sync="mini"
            absolute
            expand-on-hover
        >
          <div class="index-div">
            <div class="justify-end d-flex">
              <v-btn icon color="grey lighten-2" @click="mini=!mini" class="mr-2">
                <v-icon>{{ mini ? 'mdi-arrow-right-drop-circle-outline' : 'mdi-arrow-left-drop-circle-outline' }}</v-icon>
              </v-btn>
            </div>
            <v-list
                color="rgb(40,40,40)"
            >
              <v-list-item to="/">
                <v-list-item-icon>
                  <v-icon color="rgb(190,190,190)">mdi-home</v-icon>
                </v-list-item-icon>

                <v-list-item-title style="color: rgb(190,190,190)">AdminHome</v-list-item-title>
              </v-list-item>

              <v-list-item to="/">
                <v-list-item-icon>
                  <v-icon color="rgb(190,190,190)">mdi-home</v-icon>
                </v-list-item-icon>

                <v-list-item-title style="color: rgb(190,190,190)">UserHome</v-list-item-title>
              </v-list-item>

              <v-divider class="ma-6 white" />

              <v-list-item
                  v-for="data in links"
                  :key="data.name"
                  :to="data.link"
                  link
              >
                <v-list-item-icon >
                  <v-icon color="rgb(190,190,190)">{{ data.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title style="color: rgb(190,190,190)">{{ data.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="ma-6 white" />

              <v-list-item
                  v-for="data in links2"
                  :key="data.name"
                  :to="data.link"
                  link
              >
                <v-list-item-icon >
                  <v-icon color="rgb(190,190,190)">{{ data.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title style="color: rgb(190,190,190)">{{ data.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="ma-6 white" />
            </v-list>
          </div>
        </v-navigation-drawer>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
import {getCategoryList} from "@/api/common";
import cookie from "@/utils/cookie";
export default {
  data: () => ({
        drawer: false,
        group: null,


        selectList:0,
        componentKey:0,
        detailTag : [
          { main: '소설', num: '00', },
          { main : '시/에세이', num: '01', },
          { main : '자기계발', num: '02', },
          { main : '인문', num: '03', },
          { main : '역사/문화', num: '04', },
          { main : '종교', num: '05', },
          { main : '정치/사회', num: '06', },
          { main : '예술/대중문화', num: '07', },
          { main : '과학', num: '08', },
          { main : '기술/공학', num: '09', },
          { main : '컴퓨터/IT', num: '10', },
        ],
        links: [
          {icon:'mdi-credit-card', name:'Order', link:'/admin/order',  show:true},
          {icon:'mdi-product', name:'Comment', link:'/admin/comment', show:true},
          {icon:'mdi-account-box', name:'member', link:'/admin/member',  show:true},
        ],

        links2:[
          {icon:'mdi-product-open-variant', name:'postBook', link:'/admin/postBook',  show:true},
          {icon:'mdi-product-open-variant', name:'editBook', link:'/admin/editBook',  show:true},
        ],

        // drawer: true,
        mini : true,
        bySearch: '',
        categoryList : false,

        memberType: cookie.getCookie('accountType'),

        categoryData: []

      }
  ),
  watch:{
    group () {
      this.drawer = false
    },
    categoryList(val){

      console.log(val)

    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getCategory()
    },
    async getCategory() {
      this.categoryData = [
        { categoryId: '', categoryName: '전체' }
      ]
      try {
        const res = getCategoryList()
        console.log('res', res)
        const result = (await res).data.categoryItems
        result.forEach(aaa => {
          this.categoryData.push({
            categoryName: aaa.categoryName,
            categoryId: aaa.categoryId
          })
        })
        console.log('categoryData', this.categoryData)
      } catch (e) {
        console.log(e)
      }
    },
    searchByCategory(num){
      this.$router.push({name:'search',query:{category:num}})
    },


  },

  mounted() {

  }
}
</script>

<style scoped>
.logout-btn{
  margin-top : 30%;
  color: white;
}
.v-list-item--active {
  background-color: #D32F2F;
}
.v-list-group--active {
  color: #D32F2F !important;
}
.sub-slide-enter{
  transform: translateX(400px);
  opacity: 1;
}
.sub-slide-enter-active,
.sub-slide-leave-active {
  transition: all 0.3s ease-out;
}
.sub-slide-leave-to {
  transform: translateX(400px);
  opacity: 1;
}
@media screen and (max-width: 600px){
  .index-nav{
    position: fixed;
    z-index: 10;
    margin-top: 10%;
  }
}
</style>
