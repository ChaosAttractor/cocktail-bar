<template>
    <div >
        <div class="card">
            <div class="card_img">
                <img :src="cocktail.src">
            </div>
            <div class="card_content">
                <p class="title">{{cocktail.title}}</p>
                <p class="quan">Кол-во: <svg-icon type="mdi" :path="pathUp" :viewbox="'-4 -5 24 24'" @click="incNum" class="icon"/><b>{{ cocktail.num }}</b> <svg-icon type="mdi" :path="pathDown" :viewbox="'8 -5 24 24'" @click="deincNum(data)" class="icon"/></p>
            </div>
            <div class="cart_info">
                <p class="price"><b>{{cocktail.price}} ₽</b></p>
                <button class="buy" @click="removeFromCart(data)">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenuUp, mdiMenuDown } from '@mdi/js'

    export default {
        components: {
            SvgIcon,
        },
        props: {
            cocktail: {
                type: Object
            }
        },
        data() {
            return {
                pathUp: mdiMenuUp,
                pathDown: mdiMenuDown,
            }
        },
        methods: {
            removeFromCart() {
                this.$emit('removeFromCart',this.cocktail)
            },
            incNum() {
                this.cocktail.num++
            },
            deincNum() {
                if(this.cocktail.num > 1) {
                    this.cocktail.num--
                } else {
                    this.$emit('removeFromCart', this.cocktail)
                }
            },
        },
    }
</script>

<style scoped>
.card {
        display: flex;
        align-items: center;
        border: 1px solid var(--card-background-color);
        background: var(--card-background-color);
        width: 500px;
        max-height: 400px;
    }

    .card_content {
        flex: 1;
        user-select: none;
    }

    .card_content p {
        background: var(--card-background-color);
    }

    .card_img {
        padding: 15px;
        background: var(--card-background-color);
    }


    .card_img img {
        height: 200px;
        width: 100%;
        background: var(--card-background-color);
    }

    .buy {
        font-family: 'Roboto', sans-serif;
        font-size: 1.5em;
        border: 1px solid var(--btn-main-color);
        border-radius: 5px;
        background: var(--btn-main-color);
        padding: 5px;
        margin-right: 10px;
        color: white;
        cursor: pointer;
    }

    .buy:hover{
        border: 1px solid var(--btn-active-color);
        background: var(--btn-active-color);
        transition: .3s all;
    }

    .icon {
        cursor: pointer;
        background: var(--card-background-color);
    }

    .cart_info, p, b{
        background: var(--card-background-color);
    }

    .title {
        font-size: 1.5em;
    }
    .quan {
        font-size: 1.2em;
    }
    .price {
        font-size: 1.5em;
    }
</style>