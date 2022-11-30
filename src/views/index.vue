<template>
  <v-form>
    <v-card
        class="mx-auto overflow-hidden"
        style="height: 100%; width: 100%"
        width="344"
    >
      <v-system-bar color="deep-purple darken-3"></v-system-bar>

      <v-app-bar
          color="deep-purple accent-4"
          dark
          prominent
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

    </v-card>

    <v-form>
      <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-form>
  </v-form>


</template>

<script>

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
          {icon:'mdi-cart', name:'Cart', link:'/my/cart',  show:true},
          {icon:'mdi-library', name:'Wish List', link:'/my/wish', show:true},
          {icon:'mdi-book', name:'Comment', link:'/my/comment', show:true},
          {icon:'mdi-credit-card', name:'Order', link:'/my/order',  show:true},
          {icon:'mdi-account-box', name:'infoEdit', link:'/my/infoEdit',  show:true},
        ],

        // drawer: true,
        mini : true,
        bySearch: '',
        categoryList : false,

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
  methods: {

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
