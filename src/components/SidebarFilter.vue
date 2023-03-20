<template>
    <div>
        <div class='filter__wrapper'>
            <div class="btn_content">
                <button class="btn_filter" @click="filteredName()">По названию</button>
                <button class="btn_filter" @click="filteredMin()">По min цене</button>
                <button class="btn_filter" @click="filteredMax()">По max цене</button>
                <button class="btn_filter" @click="filteredPop()">По популярности</button>
                <button class="btn_filter" @click="filteredDefault()">Сброс</button>
            </div>
            <VueSlider v-model="rangeValue" :enable-cross="false" :tooltip="'always'" :tooltip-placement="'top'" :min="min" :max="max"  @change="choosePrice" style="width: 180px"/>
            <p class="filter">Выбрать крепкость: </p>
            <select v-model="selected_deg" @change="chooseDeg">
                <option v-for="deg in optionsDeg" :key="deg">
                    {{ deg }}
                </option>
            </select>
            <p class="filter">Выбрать по вкусу: </p>
            <select v-model="selected_taste" @change="chooseTaste">
                <option v-for="taste in optionsTaste" :key="taste">
                    {{ taste }}
                </option>
            </select>
            <p class="filter">Выбрать основу: </p>
            <select v-model="selected_base" @change="chooseBase">
                <option v-for="base in optionsBase" :key="base">
                    {{ base }}
                </option>
            </select>
            <p class="filter">Исключить ингредиент: </p>
                <select v-model="selected_ingridient" @change="removeIngridient">
                    <option v-for="ingridient in optionsIngridients" :key="ingridient">
                        {{ ingridient }}
                    </option>
                </select>
                <div class="removed_ingridients">
                    <div v-for="ingridient in removedIngridients" :key="ingridient" class="removed_ingridient" @click="deleteRemove(ingridient)">
                        <p>{{ ingridient }}</p>
                        <svg-icon type="mdi" :path="path"  :viewbox="'0 -9 40 40'" class="icon"></svg-icon>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCloseThick } from '@mdi/js'

export default {
    components: {
        VueSlider,
        SvgIcon,
    },

    data() {
        return {
            selected_ingridient: '',
            selected_deg: 'Все',
            selected_taste: 'Все',
            selected_base: 'Все',
            rangeValue: [0, 500],
            min: 0,
            max: 500,
            path: mdiCloseThick,
        }
    },
    
    props: {
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
        searchH: {
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
        removedIngridients: Array,
        optionsIngridients: Array,
        optionsDeg: Array,
        optionsTaste: Array,
        optionsBase: Array,
    },
    mounted(){
        if(localStorage.selected_deg) {
            this.selected_deg = localStorage.selected_deg
        }
        if(localStorage.selected_taste) {
            this.selected_taste = localStorage.selected_taste
        }
        if(localStorage.selected_base) {
            this.selected_base = localStorage.selected_base
        }
    },
    watch: {
        selected_deg(data) {
            localStorage.selected_deg = data;
        },
        selected_base(data) {
            localStorage.selected_base = data;
        },
        selected_taste(data) {
            localStorage.selected_taste = data;
        },
    },
    methods: {
        filteredName() {
            return this.cocktails.sort((a, b) => a.title.localeCompare(b.title))
        },
        filteredMin() {
            return this.cocktails.sort((a, b) => a.price - b.price)
        },
        filteredMax() {
            return this.cocktails.sort((a, b) => b.price - a.price)
        },
        filteredPop() {
            return this.cocktails.sort((a, b) => b.rate - a.rate)
        },
        filteredDefault() {
            return this.cocktails.sort((a, b) => a.id - b.id)
        },
        removeIngridient(){
            this.$emit('getIngridient', {
                ingridient: this.selected_ingridient
            })
        },
        chooseDeg(){
            localStorage.selected_deg = this.selected_deg
            this.$emit('getDeg', {
                deg: this.selected_deg
            })
        },
        chooseTaste(){
            localStorage.selected_taste = this.selected_taste
            this.$emit('getTaste', {
                taste: this.selected_taste
            })
        },
        chooseBase(){
            localStorage.selected_base = this.selected_base
            this.$emit('getBase', {
                base: this.selected_base
            })
        },
        choosePrice(){
            this.$emit('getPrice', {
                price: this.rangeValue
            })
        },
        deleteRemove(ingridient){
            let index = this.removedIngridients.indexOf(ingridient)
            this.removedIngridients.splice(index, 1)
            localStorage.removedIngridients = JSON.stringify(this.removedIngridients)
        }
    },
}
</script>

<style>
body{
    font-family: 'Roboto', sans-serif;
}
.filter__wrapper {
    border: 1px solid var(--main-border-color);
    border-radius: 10px;
    min-height: 600px;
    width: 178px;
    padding: 17px;
    margin: 0 15px;
}

.btn_content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 40px;
}


.btn_filter {
    font-family: 'Roboto', sans-serif;
    border: 1px solid var(--btn-main-color);
    background: var(--btn-main-color);
    padding: 5px;
    margin-top: 10px;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.btn_filter:hover{
    border: 1px solid var(--btn-active-color);
    background: var(--btn-active-color);
    transition: .3s all;
}

.filter {
    padding: 10px 0;
}

select {
    width: 170px;
    border-radius: 5px;
}

.removed_ingridients{
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
    margin-top: 10px;
}

.removed_ingridient{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 3px 5px;
    background-color: var(--main-border-color);
    font-size: 13px;
    border-radius: 5px;
    cursor: pointer;
}

.removed_ingridient p, .icon{
    background: var(--main-border-color);
}
.vue-slider-process, .vue-slider-dot-handle, .vue-slider-dot-tooltip-inner{
    background-color: var(--btn-main-color);
}

.vue-slider-rail{
    background-color: #9ff1cc;
}

.vue-slider-dot-handle::after{
    background-color: rgba(66, 185, 131, 0.38);
}

</style>