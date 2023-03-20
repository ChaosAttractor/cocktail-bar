<template>
    <div>
      <div class="search_wrap">
        <input type="text" class="search" v-model="searchText" placeholder="Введите название коктейля">
      </div>
      <div class="flex">
        <div class="sidebar">
          <SidebarFilter :cocktails = "cocktails" :searchH = "searchH" :optionsDeg="optionsDeg"
           :optionsTaste="optionsTaste" :optionsBase="optionsBase"  :optionsIngridients="optionsIngridients"
           :removedIngridients = 'removedIngridients' @getIngridient="getSelectedIngridients" 
           @getDeg="getSelectedDeg" @getTaste="getSelectedTaste" @getBase="getSelectedBase" @getPrice="getSelectedPrice"/>
        </div>
        <div class="content">
          <CocktailList :cocktails_list="cocktails_list" :cocktails="cocktails"/>
        </div>
      </div>
      <div class="center">
        <button @click="showMore" v-if="!this.pageEnd" class="btn_pag">Показать еще...</button>
        <button @click="goBack" v-if="this.pageEnd && (this.pagination_items_per_page >= this.searchH.length || Math.ceil(this.searchH.length / this.pagination_items_per_page != 1))" class="btn_pag">Вернуться к началу</button>
            <div v-if="searchH.length>0">
              <Paginate
                v-model="page"
                :page-range="3"
                :margin-pages="2"
                :page-count="pagesCount"
                :click-handler="changePage"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :container-class="'pagination'"
                :page-class="'page_item'"
                :active-class="'active'"
                :first-last-text="'buttons'"
              />
            </div>
          </div>
    </div>
  </template>
  
  <script>
  import CocktailList from '@/components/CocktailList.vue';
  import SidebarFilter from '@/components/SidebarFilter.vue';

    export default {
      components: { CocktailList, SidebarFilter },
      data() {
        return {
          cocktails: [
            {id: 1, title: "Мохито клубничный", deg: "Слабоалкогольный", taste: ["Кислый", "Мятный"], base: "На роме", ingridients: ["Лед", "Клубничный сироп", "Содовая", "Лайм", "Клубника", "Мята"], src: "src/assets/img/strawberryMojito.png",price: 200, rate: 3},
            {id: 2, title: "Поцелуемся?", deg: "Крепкий", taste: ["Кислый"], base: "На виски", ingridients: ["Лед", "Односолодовый виски с острова Айла", "Цитрусовый биттер", "Медовый сироп", "Лимонный сок", "Белок перепелиного яйца", "Пшеничный колос", "Тимьян", "Мед", "Корень красного женьшеня", "Пшеничный хлеб"], src: "src/assets/img/ShallWeKiss.png",price: 300, rate: 2},
            {id: 3, title: "Глинтвейн", deg: "Слабоалкогольный", taste: ["Цитрусовый"], base: "На вине", ingridients: ["Лед", "Красное вино сухое", "Сахар", "Корица в палочках", "Гвоздика", "Лимонная цедра", "Апельсиновая цедра"], src: "src/assets/img/MulledWine.png",price: 240, rate: 5},
            {id: 4, title: "Эволюшен", deg: "Крепкий", taste: ["Кислый"], base: "На роме", ingridients: ["Лед", "Белый ром", "Бенедиктин", "Ревеневый биттер", "Медовый сироп", "Лаймовый сок", "Белок перепелиного яйца", "Красный базилик"], src: "src/assets/img/Evolution.png",price: 150, rate: 3},
            {id: 5, title: "Сломан, но не сломлен", deg: "Слабоалкогольный", taste: ["Цитрусовый"], base: "На хересе", ingridients: ["Лед", "Апероль", "Херес педро хименес", "Апельсиновый сироп с хреном", "Лимонный сок", "хрен"], src: "src/assets/img/DownButNotOut.png", price: 300, rate: 5},
            {id: 6, title: "Любовь к Милану", deg: "Крепкий", taste: ["Кислый", "Горький"], base: "На виски", ingridients: ["Лед", "Односолодовый виски из Хайленда", "Красный биттер", "Биттер милано", "Сахарный сироп", "Лаймовый сок", "Грейпфрутовый сок", "Мята", "Лимонная цедра"], src: "src/assets/img/AmoreMillano.png", price: 150, rate: 4},
            {id: 7, title: "Северное сияние", deg: "Крепкий", taste: ["Сладкий", "Цитрусовый"], base: "На игристом", ingridients: ["Лед", "Грейпфрутовая водка Царская", "Просеко", "Розмарин", "Мед", "Лимонная цедра"], src: "src/assets/img/NorthernLights.png", price: 500, rate: 3},
            {id: 8, title: "Пача Сан-Паулу", deg: "Слабоалкогольный", taste: ["Фруктовый", "Сладкий"], base: "На роме", ingridients: ["Лед", "Темный ром", "Кокосовый ликер Fruko Schulz", "Гренадин", "Ананасовый сок", "Манго", "Вишня"], src: "src/assets/img/PachaSaoPaulo.png", price: 250, rate: 2},
            {id: 9, title: "Шотландский флип", deg: "Крепкий", taste: ["Пряный"], base: "На виски", ingridients: ["Лед", "Шотландский виски", "Портвейн руби", "Желток переплиного яйца", "Корень имбиря", "Мускатный орех молотый", "Сахарный сироп"], src: "src/assets/img/Flip.png",price: 250, rate: 5},
            {id: 10, title: "Город снов", deg: "Крепкий", taste: ["Кислый"], base: "На джине", ingridients: ["Лед", "Лондонский сухой джин", "Амаро", "Ревеневый ликер De Kuyper", "Фенхелевый биттер", "Орхидея", "Яблочный уксус", "Лимонный сок", "Мята"], src: "src/assets/img/CityOfDreams.png",price: 300, rate: 4},
            {id: 11, title: "Монохром", deg: "Слабоалкогольный", taste: ["Сладкий"], base: "На вине", ingridients: ["Лед", "Ореховый ликер De Kuyper", "Портвейн тони", "Сливовый биттер", "Херес педо хименес"], src: "src/assets/img/Monochrome.png", price: 380, rate: 1},
            {id: 12, title: "Апероль Шприц", deg: "Слабоалкогольный", taste: ["Сладкий"], base: "На игристом", ingridients: ["Лед", "Апероль", "Просекко", "Содовая", "Апельсин"], src: "src/assets/img/Aperol.png",price: 250, rate: 4},
            {id: 13, title: "Негрони", deg: "Крепкий", taste: ["Горький"], base: "На джине", ingridients: ["Лед", "Лондонский сухой джин", "Красный вермут", "Красный биттер", "Апельсиновая цедра"], src: "src/assets/img/Negroni.png",price: 350, rate: 5},
            {id: 14, title: "Маргарита", deg: "Крепкий", taste: ["Кислый", "Цитрусовый"], base: "На текиле", ingridients: ["Лед", "Серебряная текила", "Трипл сек Fruko Schulz", "Сахарный сироп", "Лайм", "Лаймовый сок", "Соль"], src: "src/assets/img/Margarita.png",price: 200, rate: 3},
            {id: 15, title: "Джин тоник", deg: "Крепкий", taste: ["Горький"], base: "На джине", ingridients: ["Лед", "Лайм", "Тоник", "Лондонский сухой джин"], src: "src/assets/img/GinTonic.png", price: 230, rate: 3},
            {id: 16, title: "Мохито", deg: "Слабоалкогольный", taste: ['Кислый', 'Мятный'], base: "На роме", ingridients: ["Лед",  "Содовая", "Лайм", "Мята", "Сахарный сироп"], src: "src/assets/img/Mojito.png",price: 180, rate: 5},
          ],
          optionsDeg: ["Все", "Слабоалкогольный", "Крепкий"],
          optionsTaste: ["Все", "Сладкий", "Горький", "Кислый", "Цитрусовый", "Пряный", "Фруктовый", "Мятный"],
          optionsBase: ["Все", "На вине", "На игристом", "На джине", "На текиле", "На роме", "На виски", "На хересе"],
          optionsIngridients: ["Лед", "Апероль", "Просекко", "Содовая", "Ореховый ликер De Kuyper", "Портвейн тони", "Лондонский сухой джин", "Красный вермут", "Сливовый биттер", "Грейпфрутовая водка Царская", "Просеко", "Розмарин", "Темный ром", "Кокосовый ликер Fruko Schulz", "Гренадин", "Ананасовый сок", "Манго", "Вишня", "Лондонский сухой джин", "Амаро", "Ревеневый ликер De Kuyper", "Фенхелевый биттер", "Орхидея", "Яблочный уксус", "Шотландский виски", "Портвейн руби", "Желток переплиного яйца", "Корень имбиря", "Мускатный орех молотый", "Сахарный сироп", "Серебряная текила", "Белый ром", "Бенедиктин", "Ревеневый биттер", "Херес педро хименес", "Апельсиновый сироп с хреном", "Грейпфрутовый сок", "Односолодовый виски из Хайленда", "Красный биттер", "Биттер милано", "хрен","Трипл сек Fruko Schulz", "Апельсин", "Клубничный сироп", "Лайм", "Клубника", "Мята", "Тоник", "Лондонский сухой джин", "Красный базилик", "Красное вино сухое", "Сахар", "Корица в палочках", "Гвоздика", "Лимонная цедра", "Апельсиновая цедра", "Односолодовый виски с острова Айла", "Лаймовый сок", "Соль", "Цитрусовый биттер", "Медовый сироп", "Лимонный сок", "Белок перепелиного яйца", "Пшеничный колос", "Тимьян", "Мед", "Корень красного женьшеня", "Пшеничный хлеб", ],
          searchText: '',
          selected_deg: '',
          selected_taste: '',
          selected_base: '',
          removedIngridients: [],
          selected_price: [0, 500],
          page: 1,
          pagination_items_per_page: 10,
          pagination_offset: 0,
          PageEnd: false,
        }
      },
      mounted(){
          if(localStorage.deg) {
              this.selected_deg = localStorage.deg
          }
          if(localStorage.taste) {
              this.selected_taste = localStorage.taste
          }
          if(localStorage.selected_base) {
              this.selected_base = localStorage.base
          }
          if(localStorage.removedIngridients){
            this.removedIngridients = JSON.parse(localStorage.removedIngridients)
          }
      },
      methods: {
        getSelectedIngridients(data) {
          if (!this.removedIngridients.includes(data.ingridient)){
            this.removedIngridients.push(data.ingridient)
            localStorage.removedIngridients = JSON.stringify(this.removedIngridients)
            if(this.pagination_items_per_page >= this.searchH.length || this.page == Math.ceil(this.searchH.length / this.pagination_items_per_page)){
              this.pageEnd = true
            }
            return this.removedIngridients
          }
        },
        getSelectedDeg(data){
          localStorage.deg = localStorage.selected_deg
          if (data.deg == 'Все'){
            return this.selected_deg = ''
          }
          return this.selected_deg = data.deg
        },
        getSelectedTaste(data){
          localStorage.taste = localStorage.selected_taste
          if (data.taste == 'Все'){
            return this.selected_taste = ''
          }
          return this.selected_taste = data.taste
        },
        getSelectedBase(data){
          localStorage.base = localStorage.selected_base
          if (data.base == 'Все'){
            return this.selected_base = ''
          }
          return this.selected_base = data.base
        },
        getSelectedPrice(data){
          return this.selected_price = data.price
        },
        changePage(page_num) {
          this.page = page_num
          this.pagination_offset = (this.pagination_items_per_page * page_num) - this.pagination_items_per_page

          page_num === 1? this.$router.push('/') : this.$router.push(`/?page=${page_num}`)
  
          this.searchH = this.cocktails_list.filter((item, index) => index >= this.pagination_offset &&
           index < (this.pagination_offset + this.pagination_items_per_page))
          window.scrollTo(0,0)
          if(this.page == Math.ceil(this.searchH.length / this.pagination_items_per_page)){
            this.pageEnd = true
          }else{
            this.pageEnd = false
          }
        },
        showMore(){
          this.pagination_items_per_page += this.pagination_items_per_page
          if(this.pagination_items_per_page >= this.searchH.length || this.page == Math.ceil(this.searchH.length / this.pagination_items_per_page)){
            this.pageEnd = true
          }
        },
        goBack(){
          this.pageEnd = false
          this.pagination_items_per_page = 10
          this.page = 1
          this.pagination_offset = 0
          this.$router.push('/')
  
          this.cocktails_list = this.searchH.filter((item, index) => index >= this.pagination_offset && index < (this.pagination_offset + this.pagination_items_per_page))
          window.scrollTo(0,0)
        }
      },
      computed: {
        searchH() {
          return this.cocktails.filter((cocktail, index) => cocktail.title.toLowerCase().trim().includes(this.searchText.toLowerCase().trim()) &&
          !cocktail.ingridients.some(e => this.removedIngridients.includes(e)) &&
          cocktail.deg.includes(this.selected_deg) &&
          cocktail.taste.some(e => e.includes(this.selected_taste)) &&
          cocktail.base.includes(this.selected_base) &&
          cocktail.price >= this.min_price && cocktail.price <= this.max_price)
        },
        pagesCount() {
          return Math.ceil(this.cocktails.length / this.pagination_items_per_page)
        },  
        cocktails_list(){
          return this.searchH.filter((cocktail, index) => index >= this.pagination_offset && index < (this.pagination_offset + this.pagination_items_per_page))
        },
        min_price(){
          return this.selected_price[0]
        },
        max_price(){
          return this.selected_price[1]
        },
        showMoreBtn(){
          if (this.searchH.length > 0) {
            return true
          } else if (!this.pageEnd && this.searchH.length > 0) {
            return true
          } else {
            return true
          }
        }
      },
    }
  </script>
  
  <style>
    *{
      scroll-behavior: smooth;
      margin: 0;
      padding: 0;
      background: var(--main-bg-color);
      color: var(--main-text-color)
    }
  
    .flex {
      display: flex;
    }
  
    .sidebar {
      width: 230px;
    }
    
    .content {
      width: 75%;
    }
  
    .search_wrap {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
  
    .search {
        width: 300px;
        padding: 5px;
        font-size: 1.2rem;
        background: var(--search);
        color: var(--search-text);
        border: none;
        border-radius: 5px;
    }

    .search:focus {
      border: none;
    }
  
  
    .pagination {
      display: flex;
      align-items: center;
      list-style: none;
    }

    .btn_pag{
      font-family: 'Roboto', sans-serif;
      border: 1px solid var(--btn-main-color);
      font-size: 1.1em;
      background: var(--btn-main-color);
      padding: 5px;
      border-radius: 5px;
      margin-bottom: 10px;
      color: white;
      cursor: pointer;
    }

    .btn_pag:hover{
      border: 1px solid #36956a;
      background: #36956a;
      transition: .3s all;
    }
  
    .page_item {
      float: left;
      padding: 8px 16px;
      cursor: pointer;
    }

    .page_item:hover {
      text-decoration: underline;
    }

  
    .active {
      text-decoration: underline;
      color: white;
    }
  
    .page-link:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  
    .center {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      margin-top: 15px;
    }
  </style>