<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>FORGOT PASSWORD</h4>
                        <hr>
                        <form @submit.prevent="forgot_password">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" v-model="user.email" class="form-control"
                                            placeholder="Email Address">
                                    </div>
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        {{ validation.email[0] }}
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block">Send Password Reset Link</button>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import swal from 'sweetalert';

    export default {


        setup() {

            //inisialisasi vue router on Composition API
            const router = useRouter()

            //state user
            const user = reactive({
                email: ''
            })

            //state validation
            const validation = ref([])

            //method forgot-password
            function forgot_password() {

                //define variable 
                let email = user.email

                //send server with axios
                axios.post(process.env.VUE_APP_URL+'forgot-password', {
                        email
                })
                .then(response => {
                    //show popup message
                    swal(response.data.message, "Check your Email!");
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
                forgot_password // <-- method register
            }

        }

    }
</script>