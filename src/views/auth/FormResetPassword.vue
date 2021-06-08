<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>NEW PASSWORD</h4>
                        <hr>
                        <form @submit.prevent="reset_password">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" v-model="user.email" class="form-control"
                                placeholder="Email Address">
                            </div>
                            <div v-if="validation.email" class="mt-2 alert alert-danger">
                                {{ validation.email[0] }}
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="user.password" class="form-control"
                                placeholder="">
                            </div>
                            <div v-if="validation.password" class="mt-2 alert alert-danger">
                                {{ validation.password[0] }}
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="user.password_confirmation" class="form-control"
                                placeholder="">
                            </div>
                            <div v-if="validation.password_confirmation" class="mt-2 alert alert-danger">
                                {{ validation.password_confirmation[0] }}
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Change</button>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { reactive, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    import swal from 'sweetalert';

    export default {


        setup() {

            //inisialisasi vue router on Composition API
            const router = useRouter()
            const route = useRoute()

            //state user
            const user = reactive({
                email: '',
                password: '',
                password_confirmation: '',
                token: ''
            })
            
            //state validation
            const validation = ref([])

            //method reset password
            function reset_password() {
                //define variable
                let email = user.email
                let password = user.password
                let password_confirmation = user.password_confirmation
                let token = route.query.token

                //send server with axios
                axios.post(process.env.VUE_APP_URL+'reset-password', {
                        token,
                        email,
                        password,
                        password_confirmation
                })
                .then(() => {
                    //show alert
                    swal("Your password has been changed. Login now!");
                    //redirect ke halaman login
                    return router.push({
                        name: 'login'
                    })

                }).catch(error => {
                    //set validation dari error response
                    validation.value = error.response.data
                })

            }

            return {
                user, // <-- state user
                validation, // <-- state validation 
                reset_password // <-- method register
            }

        }

    }
</script>