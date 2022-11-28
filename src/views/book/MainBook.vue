<template>
    <v-container fluid class="container">
      <!--
      <div style="width: 100%; height: 80vh; overflow: hidden; margin: 0 auto; position: relative;"
        class="d-flex flex-column"
      >
        <video
            muted
            autoplay
            loop
            style="width: 100%;"
        >
          <source :src="rainVideo" type="video/mp4">
        </video>
      </div>
-->
      <v-row style="height: 100vh" class="justify-center align-center">
        <v-col cols="6">
          <v-row>

            <v-col :cols="firstShow ? 4 : 2" class="pa-0">
              <v-sheet color="grey" height="600px" @click="firstShow = !firstShow">
              </v-sheet>
            </v-col>

            <v-col :cols="secondShow ? 6 : 2" class="pa-0">
              <v-sheet height="600px" @click="secondShow = !secondShow">

              </v-sheet>
            </v-col>

            <v-col cols="3">
              <v-row>
                <v-col cols="12" class="pa-0">
                  <v-sheet color="blue" height="400">
                  </v-sheet>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-sheet color="green" height="200">
                  </v-sheet>
                </v-col>
              </v-row>
            </v-col>

          </v-row>



        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: "MainBook",
  data: function (){
    return{
      firstShow : false,
      secondBox: 2,
      secondShow:false,

      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }},

  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 0;
  padding: 0;
}
.main-chip-div{
  margin-right: 7%;
}
.book-title{
  font-size: 18px;
}
.book-content{
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: rgb(220,220,220);
  font-size: 14px;
}
a{
  color: rgb(220,220,220);
}
::v-deep .v-carousel__controls > div{
  margin-bottom: 40%;
  margin-left: 45%;
}
::v-deep .v-carousel__controls > div > button{
  width: 26px;
  height: 26px;
  color: #534340 !important;
}
::v-deep .v-carousel__controls > div > button > span > i {
  font-size: 20px !important;
  color: #534340 !important;
}

@media screen and (max-width: 768px){
  .img-area .main-img,.img-box{
    max-width : 160px;
    max-height :250px;
    width: 160px;
  }
}

.img-area{
  margin-top: 30px;
  margin-left: 50px;
}
.info-area{
  margin-top: 50px;
  margin-left: 30px;
}

</style>