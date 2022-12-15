<template>
  <v-form>
    <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
        class="justify-center"
        style="margin-left: 56px"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>

      <v-spacer/>
      <v-btn @click="homeLink" class="top-icon" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-card
          elevation="0"
          v-click-outside="onClickOutside"
          class="main-search"
      >
        <v-text-field
            class="main-input"
            hide-details
            flat
            v-model="inputMsg"
            @focus="autoSearchList = true"
            @keyup="autoSearchList = true"
            background-color="rgb(20,20,20)"
        ></v-text-field>
        <v-expand-transition>
          <div class="search-list-div" v-show="autoSearchList">
            <v-list class="pa-0 ma-0 search-list">
              <v-list-item-group>
                <v-hover v-slot="{ hover }"
                         v-for="(item,index) in completeData"
                         :key="index">
                  <v-list-item
                      class="pa-3 pl-5 top-list"
                      :class="{ 'on-hover': hover }"
                      @click="inputMsg=item.bookTitle">
                    <v-card
                        class="search-list-img"
                        elevation="1"
                        tile>
                      <img
                          :src="item.bookThumb"
                          alt="bookThumb"
                          height="100%"
                          @click="detailView(item.bid)">
                    </v-card>
                    <v-list-item-content class="pl-8">
                      <v-list-item-title>
                        <span class="search-list-title" @click="detailView(item.bid)"> {{item.bookTitle}} </span>
                      </v-list-item-title>

                      <v-list-item-subtitle class="pt-2">
                        <span class="search-list-subtitle"> {{ item.bookAuthor }} | {{item.bookPublisher}}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                </v-hover>

              </v-list-item-group>
            </v-list>
          </div>
        </v-expand-transition>
      </v-card>

      <v-btn class=" search-icon" @click="mainSearch" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>


      <v-spacer class="top-icon"></v-spacer>

      <v-btn class="search-icon teal--text accent-6"  large icon v-show="!loginCheck" @click="LoginDialog">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>




      <v-menu
          bottom
          min-width="200px"
          rounded
          offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
              style="float: right"
              v-show="loginCheck"
              icon
              v-on="on"
          >
            <v-avatar
                color="brown"
                size="32"
            >
              <img
                  v-if="profileImg"
                  style="object-fit: cover"
                  src="https://picsum.photos/1024/400/?image=41"
                  v-show="profileImg !== void 0"
                  alt="">
            </v-avatar>
          </v-btn>
        </template>

        <v-card color="rgb(40,40,40)" rounded>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                  size="60"
              >
                <img
                    v-if="profileImg"
                    style="object-fit: cover"
                    src="https://picsum.photos/1024/400/?image=41"
                    v-show="profileImg !== void 0"
                    alt="">
              </v-avatar>
              <h3 class="grey--text text--lighten-2 mt-3">{{ $store.state.member.userData.name }}</h3>
              <p class="text-caption mt-1 grey--text text--lighten-2">
                {{ $store.state.member.loginData.email }}
                {{ $store.state.member.userData.accountType }}
              </p>
              <v-btn v-show="$store.state.member.userData.accountType === 'ADMIN'"
                     rounded small color="grey lighten-2" class="mb-1"
                     @click="$router.push({path:'/admin/order'})"
              >
                <v-avatar color="red darken-4" class="mr-1" size="8"/>관리자페이지
              </v-btn>


              <v-divider dark class="my-3"></v-divider>
              <v-btn
                  depressed
                  rounded
                  text @click="$router.push({path:'/my/cart'})"
                  class="grey--text text--lighten-2"
              >
                <v-avatar color="teal accent-6" class="mr-2" size="12"></v-avatar>My page
              </v-btn>
              <v-divider dark class="my-3"></v-divider>
              <v-btn
                  depressed
                  rounded
                  text @click="$router.push({path:'/my/infoEdit'})"
                  class="grey--text text--lighten-2"
              >
                <v-avatar color="yellow darken-2" class="mr-2" size="12"></v-avatar>Edit Info
              </v-btn>
              <v-divider dark class="my-3"></v-divider>
              <v-btn
                  dark rounded text depressed
                  @click="Logout"
                  class="grey--text text--lighten-2"
              >
                <v-avatar color="red darken-2" class="mr-2" size="12"></v-avatar>Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

      <v-dialog
          max-width="400"
          v-model="dialog" persistent
          content-class="my-custom-dialog"
      >
        <v-card rounded color="rgb(55,55,55)" tile dark>
          <div class="pa-4 pb-6 pt-6" style="font-weight: lighter; font-size: 15px">{{dialogMsg}}</div>
          <v-card-actions class="justify-end" style="background-color: rgb(50,50,50)">
            <v-btn
                rounded class="white--text"
                color="teal accent-6"
                @click="LogoutDialog"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

<!--    <v-form>
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

                <v-list-item-title style="color: rgb(190,190,190)">Home</v-list-item-title>
              </v-list-item>

            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon color="rgb(190,190,190)" medium>mdi-thumb-up</v-icon>
              </v-list-item-icon>

              <v-list-item-title style="color: rgb(190,190,190)">Best 50</v-list-item-title>
            </v-list-item>

              <v-list-group
                  :value="false"
                  prepend-icon="mdi-account-circle grey&#45;&#45;text"
              >
                <template v-slot:activator >
                  <v-list-item-title style="color: rgb(190,190,190)">Category</v-list-item-title>
                </template>

                <v-list-item
                    :value="true"
                    v-for="item in categoryData"
                    :key="item.categoryId"
                    v-model="item.categoryId"
                    link
                    :to="{
                      path: `/category/${item.categoryId}`,
                    }"
                >
                  <v-list-item-content>
                    <v-list-item-title style="color: rgb(190,190,190)" v-text="item.categoryName"></v-list-item-title>
                  </v-list-item-content>

                </v-list-item>

              </v-list-group>

              <v-divider class="ma-6 white" />


              <v-list-item
                  v-for="(data,index) in links"
                  :key="index"
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

            <span>

            </span>
            <v-list-item to="/register">
              <v-list-item-icon>
                <v-icon color="rgb(190,190,190)" medium>mdi-briefcase-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title style="color: rgb(190,190,190)">Add Product</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-navigation-drawer>
    </v-form>-->
  </v-form>

</template>

<script>



import {getCategoryList} from "@/api/common";
import cookie from "@/utils/cookie";

export default {
  name: "SearchMenu",
  data () {
    return {
      completeData : [],
      drawer: false,
      inputMsg : '',
      autoSearchList : false,
      mini : true,

      memberType: cookie.getCookie('accountType'),

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
        {icon:'mdi-comment-text', name:'Comment', link:'/my/comment', show:true},
        {icon:'mdi-credit-card', name:'Order', link:'/my/order',  show:true},
        {icon:'mdi-account-box', name:'infoEdit', link:'/my/infoEdit',  show:true},
      ],

      categoryList : false,
      bySearch: '',

      loginCheck: this.$store.state.member.loginData.loginState,
      hideMenu : false,

      dialog: false,
      dialogMsg : '',

      categoryData: []
   }
  },
  watch: {
    inputMsg(val) {
      if (!val) {
        this.completeData=[]
      }
      this.fetchEntriesDebounced()
    },
    profileImg(val){
      console.log(val)
    },
    memberType() {
      console.log('memberType', this.memberType)
    }
  },
  created() {
    this.init()
  },
  methods:{
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

    mainSearch(){
      let str = this.inputMsg
      str = str.trim()                                             //양끝 공백 제거
      str = str.replace(/\s/g,'+')            //스페이스바 +로 치환
      const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|+:(),]+$/.test(str);         //특문검사 정규식
      if(reg) {
        // 페이지 이동?
        this.$router.push({name: 'search' , query:{search: str}}).catch(()=>{});
      }else{
        alert("검색어를 입력해주세요")
        this.inputMsg="";
      }
    },
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
    //자동완성 기능
    completeSearch(){
      let str = this.inputMsg
      str = str.trim()                                             //양끝 공백 제거
      str = str.replace(/\s/g,'+')            //스페이스바 +로 치환
      const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|+]+$/.test(str);           //특문검사 정규식
      if(reg) {
        this.$axios.get("book/complete/" + str)
            .then(response => {
              this.completeData = response.data
            }).catch(error => {
              console.log(error.response);
        })
      }
    },

    //자동검색 리스트에서 바깥부분 클릭시 리스트 닫음
    onClickOutside () {
      this.autoSearchList = false
    },
    drawMenu(){
     // this.$router.push('drawMenu', true ).catch(()=>{});
      this.hideMenu = ! this.hideMenu
      this.$emit('drawMenu', this.hideMenu )
    },




    homeLink() {
      this.inputMsg = ''
      if(this.$router.history.current.name !== 'About') {
        this.$router.push({path: "/"})
      }
    },



    LoginDialog(){
      if(this.$route.path==="/login"){
        return null
      }else{
        this.dialogMsg="로그인 페이지로 이동합니다"
        this.dialog=true
      }
    },

    Logout(){
      this.$store.dispatch('logout').then(() => {
        location.reload()
        })
    },
    LogoutDialog(){
      if(this.$route.path==="/login"){
        this.dialog=false
      }else{
        this.$router.push({path:'/login'})
            .then(()=>this.dialog=false)
      }
    },

    //책 보러가기
    detailView(bid){
      this.$router.push({name: 'DetailView' ,query: {bid}});
    },
  },
  computed:{
    profileImg(){
      return this.$store.state.member.userData.profilePicture;
    },
    isLoading(){
      return this.$store.state.member.loadingData;
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
.top-chip span{
  font-size: 13px;
  font-weight: lighter;
}

.search-list-div{
  position : absolute;
  width: 100%;
}
.main-input >>> .v-input__slot::before {
  border-style: none !important;
}
>>> .my-custom-dialog {
  align-self: flex-start;
}
.search-list-title{
  color: rgb(180,180,180);
  font-weight: bold;
}
.search-list-title:hover{
  text-decoration: underline;
}
.search-list-subtitle{
  color: rgb(160,160,160);
}

.search-list-img{
  height: 90px;
  overflow: hidden;
}


.main-search{
  width: 30vw;
}
@media screen and (max-width: 768px){
  /* 최상단 검색 */
  .main-search{
    width: 57vw;
  }

  .top-icon{
    display: none;
  }

  .search-list-title{
    font-size: 14px;
  }
  .search-list-subtitle{
    font-size: 12px;
  }
  .search-list-img{
    height: 60px;
  }
}


</style>
