let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sub = document.getElementById('sub');
let mood = 'create'
let tmp;

function getTotal()
{
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result
        total.style.background ='#040'
    }else{
        total.innerHTML = ''
        total.style.background = '#e80d0d'
    }
}
let dataPro;
if(localStorage.predate != null){
    dataPro = JSON.parse( localStorage.predate)
}else{
    dataPro = [];
}



sub.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !=''
    && price.value !=''
    && category.value !=''
    && newPro.count < 1000){
         if (mood === 'create' ){
       if(newPro.count > 0){
            for(let i = 0  ; i < newPro.count;i++ ){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }
    clearData()
    }
    else{
        dataPro[ tmp ] = newPro;
        mood = 'create'
        sub.innerHTML='Create'
        count.style.display = 'block' 
    }
    
    

    localStorage.setItem('predate',    JSON.stringify(dataPro)      )
    console.log(dataPro)
    
    showData()

}

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData (){
    getTotal()
    let table = '' ;
    for(let i =0; i< dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})"  id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
         </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataPro.length >0 ){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = "";
    }
}
showData()
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.predate = JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
function updateData (i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category
    sub.innerHTML = 'Update'
    mood = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
let searchMood = 'title'
function getSearch(id){
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMood = 'title'
    }else{
        searchMood = 'category'
    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus() 
    search.value = ''
    showData()
}
function searchData(value){
    let table = '';
    if(searchMood == 'title')
    {
        for(let i = 0; i < dataPro.length;i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})"  id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                 </tr>
                `

            }
        }
    }else{
        for(let i = 0; i < dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})"  id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                 </tr>
                `

            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
