<template>
  <v-container fluid class="pa-0 ma-0" style="background-color: rgb(20,20,20)">

    <v-row class="justify-center  align-center" style="background-color: rgb(40,40,40);">
      <v-col cols="10" md="8" class="pt-2 pb-1">
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


    <v-row style="background-color: rgb(20,20,20)" class="mb-6">
      <!--List Card-->
      <v-col class="no-gutters ml-md-4">
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
      <transition name="sub-slide" mode="in-out">
        <v-col
            class="pa-0 ma-0"
            cols="7" sm="5" md="3"
            color="grey lighten-3"
            v-show="show.data"
        >
          <div
              class="select-book"
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

              <div class="align-center d-flex flex-column pt-8">
                <v-img
                    class="select-book-img"
                    :src="selectBook.bookThumb"
                ></v-img>

                <h4 class="pt-4" style="color: rgb(220,220,220)"> {{selectBook.bookTitle}} </h4>

                <v-card-subtitle style="color: rgb(220,220,220)">{{selectBook.bookAuthor}} | {{selectBook.bookPublisher}}</v-card-subtitle>

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


      <!--      ???????????? ??????      -->
      <v-container fluid class="pa-0 ma-0">
        <v-dialog
            class="align-center justify-center align-content-center"
            v-model="dialog"
            max-width="600"
        >
          <v-card color="#FDF6EC">
            <v-toolbar
                elevation="0"
                class="white--text"
                color="rgb(33,33,33)"
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
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color=rgb(33,33,33)
                  text
                  @click="pushInfoWishList(3)"
              >
                <h4>??? ??????????????? ??????</h4>
              </v-btn>
              <v-btn
                  color=rgb(33,33,33)
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>

    </v-row>
  </v-container>
</template>

<script>
import SearchMenu from "@/views/SearchMenu";
export default {
  name: "search",
  components: {SearchMenu},
  data: function (){
    return{
      //?????? ?????????
      bookDatas : [],         //?????? ????????? (???????????? ??????)



      //????????? ??? ??????
      show : {data:false , bid: null},
      selectBook : '',
      selectKeywords : '',


      //?????? ????????????
      tab : null,
      selectTag : [],
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



      //???????????? ?????? ????????? (Dialog)
      dialog: false,              //wishlist Dialog
      componentKey: 0,             // reload component
      wishTab :'WishList',         // ????????? ???????????? ???
      setBid : '',                 // push to component

    }
  },

  watch: {
    $route(to,from){
      if (to.query !== from.query) {
        this.searchByMenu(to.query.search)
      }
    },


  },
  methods: {
    searchByMenu(val){
      this.$axios.get("book/search/" + val)
          .then(response => {
            this.bookDatas = response.data
          }).catch(error => {
        console.log(error.response);
      })
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

    //??????????????? ??????
    byCategory(num){
      this.$axios.get("book/category/"+num)
          .then(response=>{
            this.bookDatas = response.data
          }).catch(error =>{
        console.log(error.response);
      })
    },
    //???????????? ??????
    keywordSearch(data){
      this.$axios.get("book/keyword/"+data)
          .then(response=>{
            this.bookDatas = response.data
          }).catch(error =>{
        console.log(error.response);
      })
    },

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

    //??????????????? ??????????????? ???????????? ????????????
    pushInfoWishList(pushNum){
      // num 0 ~ 3
      console.log("push num : "+ pushNum)
      this.$router.push({name: 'InfoNavi', params: {AboutTab: pushNum}})
    },

    //cart??? ??????
    addCart(bid){
      this.$axios.get("cart/add/"+bid
      ).then(response=>{
        console.log(response.data.message);
        alert("??????????????? ??????????????? ??????????????????")
      }).catch(error =>{
        console.log(error.response);
      })
    },

    // == ?????????????????? ??? ==


  },
  computed:{
    // ?????????????????? ????????? ??????
    component() {
      const wishTab = this.wishTab;
      return () => import(`@/views/wishlist/${wishTab}`);
    },
  },

  mounted() {
    this.searchByMenu(this.$route.query.search)
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
  top: 55px;
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

@media screen and (max-width: 600px){


  .select-book-img{
    width: 130px;
    margin-right: 13px;
  }

}

/* ????????????  */
li{
  font-size: 12px;
}


</style>