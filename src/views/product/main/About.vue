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
                v-for="(data,index) in categoryData"
                :key="index"
                outlined
                color="rgb(60,60,60)"
                text-color="rgb(240,240,240)"
                class="top-chip"
                active-class="white"
                @click="byCategory(data.categoryId)"
            ><span>{{data.categoryName}}</span>
            </v-chip>
          </v-chip-group>
      </v-col>
    </v-row>

    <v-row style="background-color: rgb(25,25,25)" class="mb-6">
      <!--List Card-->
      <v-col class="no-gutters ml-md-4 ml-sm-4 ml-16">
        <div v-if="productData.productItems && productData.productItems.length > 0" style="text-align: start;">
          <div
              style="display: inline-block;"
              class="pa-3"
              v-for="(product, index) in productData.productItems"
              :key="index"
          >
            <v-card
                style="height: 100%; overflow: hidden; width: 200px"
                elevation="4"
                tile
            >
              <v-img
                  :src="product.mainImg"
                  alt="bookThumb"
                  height="100%"
                  loading="lazy"
                  @click="widthSize(product)"
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
              <div>
                {{ product.title }}
              </div>
            </v-card>
          </div>
        </div>
        <div v-else>
          <span style="color: white">
            해당하는 카테고리의 제품이 존재하지않습니다.
          </span>
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
                      :src="productDetail.mainImg"
                  ></v-img>

                <v-col cols="12" md="10">
                  <h4 class="pt-4" style="color: rgb(220,220,220)"> {{productDetail.title}} </h4>
                </v-col>

                 <v-card-subtitle style="color: rgb(220,220,220)">{{productDetail.price}}원</v-card-subtitle>


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
                      <span>장바구니 추가</span>
                    </v-tooltip>

                    <v-tooltip top color="pink">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="ma-2"
                            v-bind="attrs"
                            v-on="on"
                            elevation="2"
                            fab color="rgb(50,50,50)"
                            @click.stop="setComponentData(productDetail.productId)"
                        >
                          <v-icon color="pink" large>
                            mdi-heart
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>위시리스트에 추가</span>
                    </v-tooltip>

                    <v-tooltip top color="yellow darken-2 black--text">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="ma-2"
                            v-bind="attrs"
                            v-on="on"
                            elevation="2"
                            fab color="rgb(50,50,50)"
                            @click.stop="detailView(productDetail.productId)"
                        >
                          <v-icon color="yellow darken-2" large>
                            mdi-cake-layered
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>상품 보러가기</span>
                    </v-tooltip>
                  </v-col>
                </v-card-actions>
              </div>
            </div>
          </div>
        </v-col>
      </transition>

      <!--장바구니 msg-->
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
            >확인</v-btn>
            <v-spacer/>
            <v-btn
                rounded class="white--text"
                color="teal accent-6"
                @click="$router.push({path:'/my/cart'})"
            >장바구니로 이동</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <!--      컴포넌트 호출      -->
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
              <v-card-title>나의 위시리스트</v-card-title>
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
                  <li>카테고리 추가는 메인페이지 > 책 등록시 가능합니다</li>
                  <li>새로 만들어진 카테고리는 자동으로 공개처리됩니다.</li>
                  <li>카테고리 관리는 마이페이지 > 위시리스트 > 나의 찜목록 으로 이동하시면 가능합니다.</li>
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
                <h4>내 보관함으로 이동</h4>
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
import {getProductList} from "@/api/product";
import {getCategoryList} from "@/api/common";

export default {
  name: "About",
  components: {SearchMenu},
  data: () => ({

    drawer : false,
    mini: true,
    //메인 데이터
    bookDatas : [],         //메인 데이터 (타이틀로 검색)
    bookDataByKeyword : [], //키워드로 검색된 데이터
    searchByChip : [],      //chip
    selectTag : '',         //tag

    cartDialog:false,
    cartDialogMsg : '',

    //선택된 책 보기
    show : {data:false , productId: null},
    selectBook : '',
    selectKeywords : '',


    //상단 카테고리
    tab : null,

    completeData : [],
    inputMsg : '',

    searchQuery: {
      isPaging: 'Y',
      page: 1,
      pageSize: 10,
      keyword: '',
      categoryId: ''
    },
    productData: [],
    categoryData: [],
    productDetail: {},

    //컴포넌트 관련 데이터 (Dialog)
    dialog: false,              //wishlist Dialog
    componentKey: 0,             // reload component
    wishTab :'WishList',         // 보여줄 컴포넌트 값
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
    this.getProduct()
    this.getCategory()
  },

  methods: {
    //search
    //Get Main Book Info
/*    getBookInfo(){
      this.$axios.get('product/info')
          .then(response=>{
            this.bookDatas = response.data
          })
          .catch(error =>{
            console.log(error.response);
          })
    },*/

    async getProduct() {
      try {
        const res = getProductList(this.searchQuery)
        console.log('res', res)
        this.productData = (await res).data
        console.log('productData', this.productData)
      } catch (e) {
        console.log(e)
      }
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

    byCategory(categoryId) {
      console.log(categoryId)
      this.searchQuery.categoryId = categoryId
      this.getProduct()
    },

    async getProductDetail(product) {
      if(this.show.data === true){  //책 정보가 열려있을때
        if(this.show.productId === product.productId){ //같은 책이라면 정보 닫기
          this.show.data= !this.show.data
        }
      }else{  //닫혀있으면 열기
        this.show.data= !this.show.data
      }
      this.show.productId = product.productId
      this.productDetail=product
      // this.selectKeywords = product.bookKeyword.split(',')

/*      console.log('productId', product.productId)
      try {
        const res = getProductDetailByProductId(product.productId)
        console.log('res', res)
        this.productDetail = (await res).data
        console.log('productDetail', this.productDetail)
      } catch (e) {
        console.log(e)
      }*/
    },

    //화면 크기에 따라 다른 method
    widthSize(product){
      let x = window.innerWidth

      if(x>=600){
        //this.openInfo(product)
        this.getProductDetail(product)
      }else{
        this.getProductDetail(product)
      }
    },
    //책 보러가기
    detailView(productId){
      this.$router.push('/detailView/' + productId)
    },
    //Select Book Info
    openInfo(product){
      if(this.show.data === true){  //책 정보가 열려있을때
         if(this.show.bid === product.productId){ //같은 책이라면 정보 닫기
         this.show.data= !this.show.data
        }
      }else{  //닫혀있으면 열기
        this.show.data= !this.show.data
      }
      this.show.bid = product.productId
      this.selectBook=product
      // this.selectKeywords = product.bookKeyword.split(',')
    },



    //키워드로 검색
/*    keywordSearch(data){
      this.$axios.get("product/keyword/"+data)
          .then(response=>{
            this.bookDatas = response.data
          }).catch(error =>{
        console.log(error.response);
      })
    },*/



    /*
    * 자동완성
    * */
    //DB에 불필요한 데이터 입력 방지위해 입력 기다리기
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


    //카테고리로 검색
/*    byCategory(num){
      this.selectTag=null
      if(num==null){
        this.getBookInfo()
      }else{
        this.$axios.get("product/category/"+num)
            .then(response=>{
              this.bookDatas = response.data
            }).catch(error =>{
          console.log(error.response);
        })
      }
    },*/


    /*
    * 컴포넌트 관련 메소드
    *
    * */
    setComponentData(bid){
      this.dialog =true;
      this.setBid = bid             //선택한 책 id를 child 컴포넌트에 보내기위해
      this.setWishTab("WishList")   // 디폴트 페이지는 항상 WishList
      this.updateComponentKey()     // 컴포넌트를 리로드 하기위해
    },

    updateComponentKey(){
      this.componentKey +=1        //컴포넌트 리로드
    },
    setWishTab(data){
      this.wishTab = data
    },


    //cart에 담기
/*    addCart(bid){
      this.$axios.get("cart/add/"+bid
       ).then(response=>{
        console.log(response.data.message);
        this.cartDialogMsg = "성공적으로 장바구니에 추가했습니다"
        this.cartDialog = true
      }).catch(error =>{
        console.log(error.response);
        this.cartDialogMsg = "장바구니 추가에 실패했습니다"
        this.cartDialog = true
      })
    },*/

    // == 컴포넌트관련 끝 ==



  },
  computed:{
    // 컴포넌트에서 페이지 변경
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

/* 1. 상단 카테고리 영역 */

.top-chip span{
  font-size: 13px;
  font-weight: lighter;
}

/* 상단 chip */


.high-chip span{
  color: black;
}



/* 2.책 리스트 영역 */


/* 선택한 책 영역 */
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
  /* 최상단 검색 */

  .select-book-img{
    width: 130px;
    margin-right: 13px;
  }
  .detail-hide{
    display: none;
  }
}

/* 컴포넌트  */
li{
  font-size: 12px;
}


</style>
