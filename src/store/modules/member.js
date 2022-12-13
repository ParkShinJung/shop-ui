// import axios from "axios";

import cookie from "@/utils/cookie";

const userData = () => {
    return {
        mid : void 0,
        nickName: void 0,
        fullName: void 0,
        phoneNum: void 0,
        profilePicture : void 0,
        userRule : void 0,
    }
}

const loginData = () => {
    return {
        loginState: false,
        email: void 0,
        token: void 0,
    }
}

const member = {
    state: {
        loginData: loginData(),
        userData: userData(),
        loadingData : false,
    },

    mutations: {
        putUserInfo: function (state, data){
            state.loginData.email = data.email
            state.loginData.token = data.token
            state.loginData.loginState = true

            state.userData.fullName = data.fullName
            state.userData.nickName = data.nickName
            state.userData.mid = data.mid
            state.userData.phoneNum = data.phoneNum
            state.userData.userRule = data.userRule
            state.userData.name = data.name

            console.log("loginData : " + state.loginData)
            console.log("putUserInfo : " + state.userData)


            cookie.setCookie('memberId', data.memberId)
            cookie.setCookie('memberName', data.name)
            cookie.setCookie('accountType', data.accountType)
            cookie.setCookie('email', data.email)
        },

        isLoading : function(state, data){
            state.loadingData = data;
            console.log("hi")
        },

        putUserProfile : function(state, data){
            state.userData.profilePicture = data
            console.log("profile Picture : " + state.userData.profilePicture)
        },

        initData: function (state){
            state.userData = userData();
            state.loginData = loginData();
            console.log(state)
        },

        putProfile: function (state, data){
            state.userData.nickName = data.nickName
            state.userData.profilePicture = data.profilePicture
            console.log(state.userData.profilePicture)
        },

    },

    actions: {
        login ({commit}, payload){
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('putUserInfo', payload);

                    if(payload.profilePicture!=null|| payload.profilePicture!==""){
                        commit('putUserProfile', payload.profilePicture);
                    }
                    resolve()
                }, 500)
            }).then(()=> console.log("success login"))
        },

        logout({commit}){
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('initData')
                    resolve()
                }, 500)
                cookie.removeCookie('memberId')
                cookie.removeCookie('memberName')
                cookie.removeCookie('accountType')
                cookie.removeCookie('email')
            }).then(()=> console.log("success logout :: member Store"))

        },

        updateProfile: function ({commit}, payload) {
            commit('isLoading', true);
            let data = {};
            data.nickName = payload.nickName;
            data.profilePicture = payload.profilePicture;

            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('putProfile', data);
                    resolve()
                }, 600)
            }).then(()=> commit('isLoading', false))
        },

        loginCheck_401: function ({commit}){
                return new Promise((resolve) => {
                    setTimeout(() => {
                        commit('initData');
                        resolve()
                    }, 1000)
                }
            )
        },




        /*

     logout({commit}){
            console.log("logout page")
            return new Promise((resolve) => {
                setTimeout(() => {
                    axios.post("/logout")
                        .then(() => {
                           console.log("success logout")
                        }).catch(error =>{
                            console.log("error : " + error.response);
                        }).then(()=> commit('initData'))
                        resolve()
                }, 1000)
            })
        },


        getUserInfo: function ({commit}, payload) {

            return new Promise((resolve) => {
                setTimeout(() => {

                let data = {};
                data.email = payload
                axios.post('/user/info', JSON.stringify(data), {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                })
                    .then((res) => {
                        console.log(res.data)
                        data.nickName = res.data.nickName
                        data.fullName = res.data.fullName
                        data.mid = res.data.mid
                        data.phoneNum = res.data.phoneNum
                        data.userRule = res.data.userRule
                        data.profilePicture = res.data.profilePicture
                    }).catch((error) => {
                        console.log(error.res)
                    }).then(()=>{
                        if(data.profilePicture==null|| data.profilePicture===""){
                            commit('putUserSimpleInfo', data);
                        }else{
                            commit('putUserInfo', data);
                        }
                    })
                    resolve()
                }, 1000)
            })
        },
 */
    },
}


export default member;
