
fetch('./annunci.json').then(resp => resp.json()).then(data => {

    // ELEMENTI DEL DOM
    const productsWrapper = document.querySelector('#productWrapper')
    const categoriesFilterWrapper = document.querySelector('#categoriesFilterWrapper')
    const searchInput = document.querySelector('#searchInput')
    const searchSuggest = document.querySelector('#searchSuggest')
    const minInputFilter = document.querySelector('#minInputFilter')
    const maxInputFilter = document.querySelector('#maxInputFilter')
    const orderInputs = document.querySelectorAll('.order-input')


    // FUNZIONI

    function showProducts(products){
        productsWrapper.innerHTML = ''
        products.forEach(product => {
            let card = document.createElement('div')
            card.classList.add('col-12','col-sm-6','col-lg-4','my-3')

            card.innerHTML =
            ` <div class="card-product position-relative py-5">
            <div class="card-image">
            <div class="overlay"></div>
            <img class="img-fluid" src="https://picsum.photos/${350 + product.id}" alt="">
            </div>
            <div class="details-product px-2 text-center">
            <div class="d-flex justify-content-between align-items-center my-4">
            <h4 class="fs-5 m-0">${product.name}</h4>
            <i class="fa-regular fa-heart"></i>
            </div>
            <div class="d-flex justify-content-between align-items-center my-4">
            <p>${product.category}</p>
            <p>${product.price} $</p>
            </div>
            <a class="btn btn-head-presto py-2 px-3 w-100 stretched-link" href="">Vai al Prodotto</a>
            </div>
            </div>`

            productsWrapper.appendChild(card)

        });
    }

    function globalFilter(){
        let filteredByCategory = filterByCategory(data)
        let  filteredBySearch = filterBySearch(filteredByCategory)
        let filteredByPrice = filterByPrice(filteredBySearch)
        let ordered = orderProducts(filteredByPrice)
        showProducts(ordered);
    }

    function filterByCategory(array){
        let categoriesFilter = document.querySelectorAll('.categoriesFilter')

        categoriesFilter = Array.from(categoriesFilter)
        let selectedCategory = categoriesFilter.find(el => el.checked == true).id

        if(selectedCategory == 'all'){
            return array
        }

        let filtered = array.filter(el => el.category == selectedCategory)
        populateSuggestList(filtered)

        return filtered
    }

    function filterBySearch(array){
        let searched = searchInput.value.toLowerCase().trim()
        let filtered = array.filter(product => {
            if(product.name.toLowerCase().includes(searched)){
                return true
            }
        })
        return filtered
    }

    function filterByPrice(array){
        let min = Number(minInputFilter.value)
        let max = Number(maxInputFilter.value)
        let prices = array.map(el => Number(el.price)).sort((a,b) => a - b)


        let productMin = Math.floor(prices[0])
        let productMax = Math.ceil(prices[prices.length - 1])

        if(!min){
            min = productMin
        }

        if(!max){
            max = productMax
        }

        let filtered = array.filter(product => {
            if(Number(product.price) > min && Number(product.price) < max){
                return true
            }
        })
        return filtered
    }

    function orderProducts(array){
        let selectedOrder = Array.from(orderInputs).find(el => el.checked == true).value

        switch(selectedOrder){
            case 'fromOld' :
            return array.sort((a , b ) => a.id - b.id )
            case 'fromNew' :
            return array.sort((a , b ) => b.id - a.id )
            case 'priceAsc' :
            return array.sort((a , b ) => a.price - b.price )
            case 'priceDesc' :
            return array.sort((a , b ) => b.price - a.price )
            case 'alphaAsc' :
            return array.sort(function(a,b){
                let nameA = a.name.toUpperCase()
                let nameB = b.name.toUpperCase()

                if(nameA < nameB){
                    return -1
                }
                if(nameA > nameB){
                    return 1
                }
                return 0
            })
            case 'alphaDesc' :
            return array.sort(function(a,b){
                let nameA = a.name.toUpperCase()
                let nameB = b.name.toUpperCase()

                if(nameA > nameB){
                    return -1
                }
                if(nameA < nameB){
                    return 1
                }
                return 0
            })
            default :
            break;
        }
    }

    function populateCategoriesFilter(){

        let categories = data.map( product => {
            return product.category
        })
        let uniqueCategories = new Set(categories)

        uniqueCategories.forEach( category => {
            let div = document.createElement('div')
            div.classList.add('form-check')

            div.innerHTML =
            `<input class="form-check-input categoriesFilter" type="radio" name="categoryFilter" id="${category}">
            <label class="form-check-label" for="all">
            ${category}
            </label>`

            categoriesFilterWrapper.appendChild(div)
        })
    }

    function populateSuggestList(array){
        searchSuggest.innerHTML = ''
        let suggest = array.map(el => el.name)

        suggest.forEach(suggest => {
            let option = document.createElement('option')
            option.value = suggest
            searchSuggest.appendChild(option)
        })
    }

    function attachFilterCategoryEvent(){
        let categoriesFilter = document.querySelectorAll('.categoriesFilter')

        categoriesFilter.forEach( input => {
            input.addEventListener('input' , () => {
                globalFilter()
            })
        })

    }
    // EVENTI

    searchInput.addEventListener('input' , () => {
        globalFilter()
    })

    minInputFilter.addEventListener('input' , () =>{
        globalFilter()
    })

    maxInputFilter.addEventListener('input' , () =>{
        globalFilter()
    })

    orderInputs.forEach(input => {
        input.addEventListener('input' , () => {
            globalFilter()
        })
    })

    // INIZIALIZZAZIONE
    showProducts(data)
    populateCategoriesFilter()
    attachFilterCategoryEvent()
})