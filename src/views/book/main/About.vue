<template>
  <v-container fluid class="pa-0" id="screen">


    <v-row class="justify-center pa-0 align-center" style="background-color: rgb(40,40,40);">
      <v-col cols="10" md="8" class="pa-0 pt-2 pb-1">
          <v-chip-group
              class="top-chip-group"
              mandatory
              color="white"
              next-icon="mdi-chevron-right white--text"
              prev-icon="mdi-chevron-left white--text"
              show-arrows
          >
            <v-chip
                v-for="(data,index) in detailTag"
                :key="index"
                outlined
                color="rgb(60,60,60)"
                text-color="rgb(240,240,240)"
                class="top-chip"
                active-class="white"
                @click="byCategory(data.num)"
            ><span>{{data.main}}</span>
            </v-chip>
          </v-chip-group>
      </v-col>
    </v-row>

    <v-row style="background-color: rgb(25,25,25)" class="mb-6">
      <!--List Card-->
      <v-col class="no-gutters ml-md-4 ml-sm-4 ml-16">
        <div style="text-align: start;">
          <div
              style="display: inline-block;"
              class="pa-3"
              v-for="(book, index) in bookDatas"
              :key="index"
          >
            <v-card
                style="height: 100%; overflow: hidden; width: 150px"
                elevation="4"
                tile
            >
              <v-img
                  :src="book.bookThumb"
                  alt="bookThumb"
                  height="100%"
                  loading="lazy"
                  @click="widthSize(book)"
              >
                <template v-slot:placeholder>
                  <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                  >
                    <v-progress-circular
                        indeterminate
                        color="black lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </div>
        </div>
      </v-col>


      <!--Transition Select-->
      <transition name="sub-slide" mode="in-out" class="detail-hide">
        <v-col
            class="pa-0 detail-hide"
            cols="7" sm="5" md="3"
            color="grey lighten-3"
            v-show="show.data"
        >
          <div
              class="select-book pr-12 pr-md-0"
          >
            <div class="inner-select-book">
              <v-card-actions class="pt-5 pl-5">
                <v-btn
                    icon
                    color="rgb(220,220,220)"
                    @click.stop="show.data =false"
                >
                  <v-icon size="40px">mdi-close</v-icon>
                </v-btn>
              </v-card-actions>

              <div class="align-center justify-center d-flex flex-column pt-8">


                  <v-img
                      class="select-book-img"
                      :src="selectBook.bookThumb"
                  ></v-img>

                <v-col cols="12" md="10">
                  <h4 class="pt-4" style="color: rgb(220,220,220)"> {{selectBook.bookTitle}} </h4>
                </v-col>

                 <v-card-subtitle style="color: rgb(220,220,220)">{{selectBook.bookAuthor}}&nbsp;|&nbsp;{{selectBook.bookPublisher}}</v-card-subtitle>


                <div>
                  <v-chip
                      class="inner-chip ma-1"
                      v-for="keyword in selectKeywords"
                      :key="keyword"
                      :value="keyword"
                      outlined
                      color="rgb(220,220,220)"
                      small
                      @click="keywordSearch(keyword)"
                  >
                    <span>{{keyword}}</span>
                  </v-chip>
                </div>

                <v-divider></v-divider>
                <v-card-actions class="mt-2">
                  <v-col>
                    <v-tooltip top color="green darken-2">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="ma-2"
                            v-bind="attrs"
                            v-on="on"
                            elevation="2"
                            fab color="rgb(50,50,50)"
                            @click.stop="addCart(selectBook.bid)"
                        >
                          <v-icon color="green darken-2" large>
                            mdi-cart
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>???????????? ??????</span>
                    </v-tooltip>

                    <v-tooltip top color="pink">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="ma-2"
                            v-bind="attrs"
                            v-on="on"
                            elevation="2"
                            fab color="rgb(50,50,50)"
                            @click.stop="setComponentData(selectBook.bid)"
                        >
                          <v-icon color="pink" large>
                            mdi-heart
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>?????????????????? ??????</span>
                    </v-tooltip>

                    <v-tooltip top color="yellow darken-2 black--text">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="ma-2"
                            v-bind="attrs"
                            v-on="on"
                            elevation="2"
                            fab color="rgb(50,50,50)"
                            @click.stop="detailView(selectBook.bid)"
                        >
                          <v-icon color="yellow darken-2" large>
                            mdi-book-open-variant
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>??? ????????????</span>
                    </v-tooltip>
                  </v-col>
                </v-card-actions>
              </div>
            </div>
          </div>
        </v-col>
      </transition>

      <!--???????????? msg-->
      <v-dialog
          max-width="400"
          v-model="cartDialog"
          content-class="my-custom-dialog"
      >
        <v-card rounded color="rgb(55,55,55)" tile dark>
          <div class="pa-4 pb-6 pt-6" style="font-weight: lighter; font-size: 15px">{{cartDialogMsg}}</div>
          <v-card-actions class="justify-end" style="background-color: rgb(50,50,50)">
            <v-btn
                rounded class="white--text"
                @click="cartDialog = false"
            >??????</v-btn>
            <v-spacer/>
            <v-btn
                rounded class="white--text"
                color="teal accent-6"
                @click="$router.push({path:'/my/cart'})"
            >??????????????? ??????</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <!--      ???????????? ??????      -->
      <v-container fluid class="pa-0 ma-0">
        <v-dialog
            class="align-center justify-center align-content-center"
            v-model="dialog"
            max-width="600"
        >
          <v-card color="rgb(50,50,50)" dark>
            <v-toolbar
                elevation="0"
                class="white--text"
                color="rgb(40,40,40)"
            >
              <v-card-title>?????? ???????????????</v-card-title>
            </v-toolbar>

            <component
                v-bind:selectBid="setBid"
                :key="componentKey"
                :is="component"
                @childKey="updateComponentKey"
                @pushTab="setWishTab"
            ></component>

            <v-card-text>
              <div>
                <ul>
                  <li>???????????? ????????? ??????????????? > ??? ????????? ???????????????</li>
                  <li>?????? ???????????? ??????????????? ???????????? ?????????????????????.</li>
                  <li>???????????? ????????? ??????????????? > ??????????????? > ?????? ????????? ?????? ??????????????? ???????????????.</li>
                </ul>
              </div>
            </v-card-text>
            <v-card-actions style="background-color: rgb(40,40,40)">
              <v-btn
                  class="white--text"
                  rounded
                  @click="dialog = false"
              >
                Close
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  color="teal accent-5" class="white--text"
                  rounded
                  @click="$router.push({path:'/my/wish'})"
              >
                <h4>??? ??????????????? ??????</h4>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>

    </v-row>
  </v-container>
</template>

<script>
import vClickOutside from 'v-click-outside';
import SearchMenu from "@/views/SearchMenu";
import { getMemberList } from "@/api/account"

export default {
  name: "About",
  components: {SearchMenu},
  data: () => ({

    drawer : false,
    mini: true,
    //?????? ?????????
    bookDatas : [],         //?????? ????????? (???????????? ??????)
    bookDataByKeyword : [], //???????????? ????????? ?????????
    searchByChip : [],      //chip
    selectTag : '',         //tag

    cartDialog:false,
    cartDialogMsg : '',

    //????????? ??? ??????
    show : {data:false , bid: null},
    selectBook : '',
    selectKeywords : '',


    //?????? ????????????
    tab : null,
    detailTag : [
      { main : '??????' },
      { main: '??????', num: '00', },
      { main : '???/?????????', num: '01', },
      { main : '????????????', num: '02', },
      { main : '??????', num: '03', },
      { main : '??????/??????', num: '04', },
      { main : '??????', num: '05', },
      { main : '??????/??????', num: '06', },
      { main : '??????/????????????', num: '07', },
      { main : '??????', num: '08', },
      { main : '??????/??????', num: '09', },
      { main : '?????????/IT', num: '10', },
    ],
    completeData : [],
    inputMsg : '',

    searchQuery: {
      isPaging: 'Y',
      page: 1,
      pageSize: 10,
      keyword: '',
    },

    //???????????? ?????? ????????? (Dialog)
    dialog: false,              //wishlist Dialog
    componentKey: 0,             // reload component
    wishTab :'WishList',         // ????????? ???????????? ???
    setBid : '',                 // push to component


  }),

  watch: {
    inputMsg(val) {
      if (!val) {
        this.completeData=[]
      }
      this.fetchEntriesDebounced()
    },
  },

  directives: {
    clickOutside: vClickOutside.directive
  },

  created() {
    this.$eventBus.$on('searchData', (payload)=>{
      console.log(payload);
    });
    this.getMembers()
  },

  methods: {
    //search
    //Get Main Book Info
/*    getBookInfo(){
      this.$axios.get('book/info')
          .then(response=>{
            this.bookDatas = response.data
          })
          .catch(error =>{
            console.log(error.response);
          })
    },*/

    getMembers() {

      try {
        const res = getMemberList(this.searchQuery)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },

    //?????? ????????? ?????? ?????? method
    widthSize(book){
      let x = window.innerWidth

      if(x>=600){
        this.openInfo(book)
      }else{
        this.detailView(book.bid)
      }
    },
    //??? ????????????
    detailView(bid){
      this.$router.push({name: 'DetailView' ,query: {bid}});
    },
    //Select Book Info
    openInfo(book){
      if(this.show.data === true){  //??? ????????? ???????????????
         if(this.show.bid === book.bid){ //?????? ???????????? ?????? ??????
         this.show.data= !this.show.data
        }
      }else{  //??????????????? ??????
        this.show.data= !this.show.data
      }
      this.show.bid = book.bid
      this.selectBook=book
      this.selectKeywords = book.bookKeyword.split(',')
    },



    //???????????? ??????
/*    keywordSearch(data){
      this.$axios.get("book/keyword/"+data)
          .then(response=>{
            this.bookDatas = response.data
          }).catch(error =>{
        console.log(error.response);
      })
    },*/



    /*
    * ????????????
    * */
    //DB??? ???????????? ????????? ?????? ???????????? ?????? ????????????
    fetchEntriesDebounced() {
      this.completeData = null;
      // cancel pending call
      clearTimeout(this._timerId)
      // delay new call 500ms
      this._timerId = setTimeout(() => {
        // maybe : this.fetch_data()
        this.completeSearch()
      }, 500)
    },


    //??????????????? ??????
/*    byCategory(num){
      this.selectTag=null
      if(num==null){
        this.getBookInfo()
      }else{
        this.$axios.get("book/category/"+num)
            .then(response=>{
              this.bookDatas = response.data
            }).catch(error =>{
          console.log(error.response);
        })
      }
    },*/


    /*
    * ???????????? ?????? ?????????
    *
    * */
    setComponentData(bid){
      this.dialog =true;
      this.setBid = bid             //????????? ??? id??? child ??????????????? ???????????????
      this.setWishTab("WishList")   // ????????? ???????????? ?????? WishList
      this.updateComponentKey()     // ??????????????? ????????? ????????????
    },

    updateComponentKey(){
      this.componentKey +=1        //???????????? ?????????
    },
    setWishTab(data){
      this.wishTab = data
    },


    //cart??? ??????
/*    addCart(bid){
      this.$axios.get("cart/add/"+bid
       ).then(response=>{
        console.log(response.data.message);
        this.cartDialogMsg = "??????????????? ??????????????? ??????????????????"
        this.cartDialog = true
      }).catch(error =>{
        console.log(error.response);
        this.cartDialogMsg = "???????????? ????????? ??????????????????"
        this.cartDialog = true
      })
    },*/

    // == ?????????????????? ??? ==



  },
  computed:{
    // ?????????????????? ????????? ??????
    component() {
      const wishTab = this.wishTab;
      return () => import(`@/views/wishlist/${wishTab}`);
    }
  },

  mounted() {
    // this.getBookInfo()
  }
}
</script>

<style scoped>

/* 1. ?????? ???????????? ?????? */

.top-chip span{
  font-size: 13px;
  font-weight: lighter;
}

/* ?????? chip */


.high-chip span{
  color: black;
}



/* 2.??? ????????? ?????? */


/* ????????? ??? ?????? */
.select-book{
  background-color: rgb(40,40,40);
  text-align: center;
  height: 100vh;
  position: sticky;
  top: 40px;
}
.inner-select-book{
  position: sticky;
  top: 10px;
}
.select-book-img{
  width: 200px;
}

.sub-slide-enter{
  transform: translateX(400px);
  opacity: 1;
}
.sub-slide-enter-active,
.sub-slide-leave-active {
  transition: all 0.4s ease-out;
}
.sub-slide-leave-to {
  transform: translateX(400px);
  opacity: 1;
}
.detail-hide{
  display: block;
}
@media screen and (max-width: 600px){
  /* ????????? ?????? */

  .select-book-img{
    width: 130px;
    margin-right: 13px;
  }
  .detail-hide{
    display: none;
  }
}

/* ????????????  */
li{
  font-size: 12px;
}


</style>
