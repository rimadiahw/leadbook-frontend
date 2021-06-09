<template>
  <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        MAIN MENU
                        <hr>
                        <ul class="list-group">
                            <router-link :to="{name: 'dashboard'}"
                                class="list-group-item text-dark text-decoration-none">DASHBOARD</router-link>
                            <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none"
                                style="cursor:pointer">LOGOUT</li>
                            <router-link :to="{name: 'company'}"
                                class="list-group-item text-dark text-decoration-none">COMPANY</router-link>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        COMPANY LIST
                        <!-- <form @submit.prevent="search"> -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" v-model="search" placeholder="Search companies..."/>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="table-responsive mt-2">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>COMPANY NAME</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="company in filteredCompanies" :key="company.id">
                                        <td>{{ company.id }}</td>
                                        <td>{{ company.company_name }}</td>
                                        <td>
                                            <button v-if='company.favourite == false' class="btn btn-primary" @click.prevent="markCompany(company.id)">Mark as Favourite</button>
                                            <button v-if='company.favourite == true' class="btn btn-danger" @click.prevent="unmarkCompany(company.id)">Remove From Favourite</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                                </div>
                            </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import axios from 'axios'

    export default {
        data() {
            return {
                // declare variable
                filteredCompanies: [], 
                search: "",
                token:localStorage.getItem('token'),
                user:ref('')
            }
        },
        watch:{
            'search':function(val){
                this.getAllCompany(val);
            }
        },
        mounted() {
            //run getAllCompany method
            this.getAllCompany(this.search);
        },
        methods: {
            //method to get company list
            getAllCompany(search){
				//get data user
                axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
                //call API
                axios.post(process.env.VUE_APP_URL+'find-company?name='+search)
                .then(response => {
                    console.log(response.data.data)
                     this.filteredCompanies = response.data.data
                })
			},
            //method to mark company
            markCompany(id)
            {
                //call API
                axios.get(process.env.VUE_APP_URL+'mark-company/'+id)
                    .then(() => {
                        this.getAllCompany('')
                    });
            },
            //method to unmark favourite company
            unmarkCompany(id)
            {
                //call API
                axios.get(process.env.VUE_APP_URL+'unmark-company/'+id)
                    .then(() => {
                        this.getAllCompany('')
                    });
            }
        }

    }
</script>