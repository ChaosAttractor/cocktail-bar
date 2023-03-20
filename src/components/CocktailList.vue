<template>
    <Notification @notification="notify" v-model:showNotification="showNotification">Товар добавлен в корзину</Notification>
    <div class="result">
        <h2 v-if="cocktails_list.length > 0"> видно {{ cocktails_list.length }} из {{ cocktails.length }}</h2>
        <h2 v-else>Результат поиска пуст</h2>
        <div class="cart" @click="showModal">
            <h4>{{ itemsInCart }}</h4>
            <svg-icon type="mdi" :path="path" class="icon"/>
        </div>
    </div>
        <div class="wrapper">
            <CocktailItem v-for="cocktail in cocktails_list" :key="cocktail.id" :cocktail="cocktail" @addToCart="addToCart"/>
        </div>
        <Modal v-model:show="modalVisible" v-if="cartItems.length > 0">
            <template v-slot:title>
                <div class="bg">
                    <h1 style="text-align: center;" >Корзина</h1>
                </div>
            </template>
            <CartItem v-for="cocktail in cartItems" :key="cocktail.id" :cocktail="cocktail" @removeFromCart="removeFromCart"/>
            <template v-slot:footer>
                <div class="btn-wrap bg">
                    <button class="buy">Оформить заказ {{ total }} ₽</button>
                </div>
            </template>
        </Modal>
        <Modal v-model:show="modalVisible" v-else>
            <template v-slot:title>Корзина пустая</template>
        </Modal>
</template>

<script>
import CocktailItem from '@/components/CocktailItem.vue';
import CartItem from '@/components/CartItem.vue'
import Modal from './Modal.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import Notification from '../components/Notification.vue';
import { mdiCartOutline } from '@mdi/js';


    export default {
    components: {
    CocktailItem,
    CartItem,
    Modal,
    SvgIcon,
    Notification,
},
    props: {
        cocktails_list: {
            id: Number,
            title: String,
            deg: String,
            taste: Array,
            base: String,
            ingridients: Array,
            src: String,
            price: Number,
            rate: Number,
        },
        cocktails: {
            id: Number,
            title: String,
            deg: String,
            taste: Array,
            base: String,
            ingridients: Array,
            src: String,
            price: Number,
            rate: Number,
        },
    },
    data() {
        return {
            cartItems: [],
            modalVisible: false,
            path: mdiCartOutline,
            msg: '',
            showNotification: false,
        }
    },
    methods: {
        addToCart(data){
            if (this.cartItems.includes(data)) {
                data.num++
            } else {
                data.num = 1
                this.cartItems.push(data)
            }
            this.showNotification = true
            setTimeout(() => {
                this.showNotification = false
            }, 1500)
        },
        removeFromCart(data){
            if (this.cartItems.includes(data)) {
                if(data.num > 1) {
                    data.num--
                } else {
                    let index = this.cartItems.indexOf(data)
                    this.cartItems.splice(index, 1)
                }
            }
        },
        showModal(){
            this.modalVisible = !this.modalVisible
            if (this.modalVisible == true){
                this.$router.push('/?cart')
            }
        }
    },
    computed: {
        total() {
            let result = []

            if(this.cartItems.length){
                for(let cocktail of this.cartItems) {
                    result.push(cocktail.price * cocktail.num)
                }
                result = result.reduce((sum, el) => parseInt(sum)+parseInt(el))
                return result
            } else {
                return 0
            }
        },
        itemsInCart() {
            let items = []

            if(this.cartItems.length){
                for(let cocktail of this.cartItems) {
                    items.push(cocktail.num)
                }

                items = items.reduce((sum, el) => parseInt(sum)+parseInt(el))
                return items
            } else {
                return 0
            }
        }
    },
    watch: {
        modalVisible() {
            if (this.modalVisible == false) {
                this.$router.push('/')
            } 
        }
    }

}
</script>

<style scoped>
    .wrapper{
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        width: 100%;
        gap: 10px;
        margin: 10px 0 0 10px;
    }

    .result {
        width: 86%;
        display: flex;
        justify-content: flex-end;
        color: #2c3e50;
        font-size: 12px;
    }

    .cart {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        cursor: pointer;
        position: fixed;
        right: 30px;
        bottom: 30px;
        border-radius: 5px;
        padding: 10px;
        background: var(--main-border-color);
    }

    .icon, h4 {
        background: var(--main-border-color);
    }

    .buy {
        font-family: 'Roboto', sans-serif;
        font-size: 1.2rem;
        border: 1px solid var(--btn-main-color);
        border-radius: 5px;
        border-top-right-radius: 0px;
        background: var(--btn-main-color);
        padding: 5px;
        color: white;
        cursor: pointer;
    }

    .buy:hover{
        border: 1px solid var(--btn-active-color);
        background: var(--btn-active-color);
        transition: .3s all;
    }

    .btn-wrap {
        display: flex;
        justify-content: flex-end;
    }
    .bg, h1{
        background: var(--card-background-color);
    }
    
</style>