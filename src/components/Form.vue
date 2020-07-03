<template>
    <div class="">
        <my-header :cartItemCount="cartItemCount"></my-header>
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-info">
                    <div class="panel-heading">Pet Deport Checkout</div>
                    <div class="panel-body">
                        <div class="form-group">
                            <div class="col-md-12">
                                <h4><strong>Enter Your Information</strong></h4>
                            </div><!-- end of col-md-12 -->
                        </div><!-- end of form-group -->
                        <div class="form-group">
                            <div class="col-md-6">
                                <strong>First Name:</strong>
                                <input class="form-control" v-model.trim="order.firstName" />
                            </div><!-- end of col-md-6 -->
                            <div class="col-md-6">
                                <strong>Last Name:</strong>
                                <input class="form-control" v-model.trim="order.lastName" />
                            </div><!-- end of col-md-6 -->
                        </div><!-- end of form-group -->
                        <div class="form-group">
                            <div class="col-md-12">
                                <strong>Address:</strong>
                            </div><!-- end of col-md-12 -->
                            <div class="col-md-12">
                                <input class="form-control" v-model.trim="order.address" />
                            </div><!-- end of col-md-12 -->
                        </div><!-- end of form-group -->
                        <div class="form-group">
                            <div class="col-md-12">
                                <strong>City:</strong>
                            </div><!-- end of col-md-12 -->
                            <div class="col-md-12">
                                <input class="form-control" v-model.trim="order.city" />
                            </div><!-- end of col-md-12 -->
                        </div><!-- end of form-group -->
                        <div class="form-group">
                            <div class="col-md-2">
                                <strong>State:</strong>
                                <select v-model="order.state" class="form-control">
                                    <option disabled value="">State</option>
                                    <option v-for="(state, key) in states"
                                            :value="state"
                                            :key="key"
                                    >
                                        {{ key }}
                                    </option>
                                </select>
                            </div><!-- end of col-md-12 -->
                        </div><!-- end of form-group -->
                        <div class="form-group">
                            <div class="col-md-6 boxes">
                                <input type="checkbox"
                                       id="gift"
                                       value="true"
                                       :true-value="order.sendGift"
                                       :false-value="order.dontSendGift"
                                       v-model="order.gift"
                                >
                                <label for="gift">Ship As Gift?</label>
                            </div><!-- end of col-md-6 boxes -->
                        </div><!-- end of form-group -->
                        <div class="form-group">
                            <div class="col-md-6 boxes">
                                <input type="radio"
                                       id="home"
                                       :value="order.home"
                                       v-model="order.method"
                                >
                                <label for="home">Home</label>
                                <input type="radio"
                                       id="business"
                                       :value="order.business"
                                       v-model="order.method"
                                >
                                <label for="business">Business</label>
                            </div><!-- end of col-md-6 boxes -->
                        </div><!-- end of form-group -->
                        <div class="form-group">
                            <div class="col-md-6">
                                <button class="btn btn-primary submit"
                                        type="submit"
                                        @click="submitForm"
                                >Place Order</button>
                            </div><!-- end of col-md-6 -->
                        </div><!-- end of form-group -->
                        <div class="col-md-12 verify">
                            <pre>
                                FirstName: {{ order.firstName }}
                                LastName: {{ order.lastName }}
                                Address: {{ order.address }}
                                City: {{ order.city }}
                                State: {{ order.state }}
                                Method: {{ order.method }}
                                Gift: {{ order.gift }}
                            </pre>
                        </div><!-- end of col-md-12 verify -->
                    </div><!-- end of panel-body -->
                </div><!-- end of panel panel-info -->
            </div><!-- end of col-md-10 col-md-offset-1 -->
        </div><!-- end of row -->
    </div>
</template>

<script>
    import MyHeader from './Header';

    export default {
        name: "Form",
        components: {
            MyHeader
        },
        props: ['cartItemCount'],
        data() {
            return {
                order: {
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    method: 'Home Address',
                    home: 'Home Address',
                    business: 'Business Address',
                    gift: 'Send As A Gift',
                    sendGift: 'Send As A Gift',
                    dontSendGift: 'Do Not Send As A Gift',
                },
                states: {
                    NY: 'New-Yirk',
                    LA: 'Los Angeles',
                    CA: 'California',
                },
            }
        },
        methods: {
            submitForm() {
                alert('Submitted');
            }
        },
    }
</script>

<style scoped>

</style>