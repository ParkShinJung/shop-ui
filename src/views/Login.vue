<template>
  <v-container fluid class="pa-0">
    <v-row class="ma-0 align-center" style="background-color: rgb(20,20,20); height: 100vh">
      <v-col class="pa-0 justify-center d-flex">
        <v-card rounded flat width="400px" color="rgb(40,40,40)">
          <div style="height: 24px; background-color: rgb(30,30,30)" class="align-center justify-end d-flex">
            <v-btn width="14px" elevation="0" height="14px" color="yellow darken-2 mr-2" fab></v-btn>
            <v-btn width="14px" elevation="0" height="14px" color="red darken-2 mr-2" fab></v-btn>
          </div>
          <v-divider dark></v-divider>
          <div class="pa-3">
            <div class="pa-3 pb-5">
              <v-text-field
                  outlined
                  placeholder="id"
                  v-model="loginForm.userId"
                  required dark>
              </v-text-field>
              <v-text-field
                  outlined hide-details
                  placeholder="password"
                  type="password"
                  v-model="loginForm.password"
                  required dark>
              </v-text-field>
            </div>
            <v-card-actions>
              <v-btn color="#2c4f91" dark large rounded block @click="loginSubmit" >
                <span style="font-size: 17px; font-weight: bold">Login</span>
              </v-btn >
            </v-card-actions>
            <v-card-actions>
              <v-btn
                  color="teal accent-6 white--text"
                  @click="signLink" rounded
              >
                <span style="color: rgb(45,45,45); font-weight: bold">Sign-up</span>
              </v-btn>
              <v-btn
                  color="teal accent-6" rounded
                  @click="$router.push({path:'/'})"
              >
                <span style="color: rgb(45,45,45); font-weight: bold">Home</span>
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>

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
              @click="$router.push({path:'/'})"
          >Home</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { logInCheck } from "@/api/account"

export default {
  name: "Login.vue",
  data () {
    return {
      email: '',
      password: '',
      id: '',

      dialog:false,
      dialogMsg:'',

      loginForm: {
        userId: '',
        password: ''
      },
      accountInfo: {}
    }
  },
  methods: {
    async loginSubmit() {

      if(this.loginForm.userId&&this.loginForm.password){

        try {
          const res = await logInCheck(this.loginForm.userId, this.loginForm)
          this.accountInfo = res.data
          console.log('로그인한 계정의 정보 ', this.accountInfo)
          if (!this.accountInfo.accountIdMatched || !this.accountInfo.accountPasswordMatched) {
            alert("인증오류. 아이디와 비밀번호를 확인해주세요");
            return
          }
          if (!this.accountInfo.adminAccess) {
            alert("권한이 없습니다.");
            return
          }

          this.$store.dispatch('login',this.accountInfo)
              .then(()=>{
                this.dialogMsg="로그인 성공."
                this.dialog=true
              })
        } catch (e) {
          console.error(e)
          alert("인증오류. 아이디와 비밀번호를 확인해주세요");
          this.loginForm.userId = null; this.loginForm.password = null;
        }
/*        let saveData = {};
        saveData.email = this.email;
        saveData.password = this.password;
        try {
          this.$axios.post("/authenticate", JSON.stringify(saveData), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
              .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                  this.$store.dispatch('login',response.data)
                      .then(()=>{
                        this.dialogMsg="로그인 성공."
                        this.dialog=true
                      })
                }
              })
              .catch(error =>{
                console.log(error.response);
                if(error.response.status === 401){
                  alert("인증오류. 아이디와 비밀번호를 확인해주세요");
                  this.password = null; this.email = null;
                }
              })
        } catch (error) {
          console.error(error);
        }*/
      }else{
        alert("아이디 혹은 비밀번호가 입력되지 않았습니다")
        return false
      }
    },
    signLink(){
      this.$router.push({path:'/signup'})
    },
    dialogOff() {
      this.dialog = false
    }
  },
}
</script>

<style scoped>
>>> .my-custom-dialog {
  align-self: flex-start;
}
</style>
