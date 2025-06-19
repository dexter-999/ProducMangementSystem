let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let descount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let create = document.getElementById('create');
let deleted = document.getElementById('deleteAll');
let btnn = document.getElementById('btnShow');
let btnTitle = document.getElementById('btnTitle');
let btnCategory = document.getElementById('btnCategory');
let search = document.getElementById('search');

let mood = "create";
let tmp;

// create total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +descount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = "red";

    }

}

// create prduct

let dataPro;

create.addEventListener('click', function () {


    if (title.value === "" || price.value === "" || taxes.value === "" || ads.value === "" || descount.value === "") {
        alert("Please Enter informations")
        newPro = "";
    }
    else {
        dataPro = [];
    };


    if (localStorage.product != null) {
        dataPro = JSON.parse(localStorage.product);
    }
    else {
        dataPro = [];

    }



    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        descount: descount.value,
        count: count.value,
        category: category.value,
        total: total.textContent
    }
    // count



    if (mood === "create") {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }

        }
        else {
            dataPro.push(newPro);
        }

    } else {
        dataPro[tmp] = newPro;
        mood = "create";
        create.innerHTML = "Create";
        count.style.display = "block";
    }




    localStorage.setItem("product", JSON.stringify(dataPro));
    clearInput();
    readPro();
});



// clear input
function clearInput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    descount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "Total : ";
    total.style.backgroundColor = "red";

}
// read 



function readPro() {

    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
               <td>${[i]}</td>
               <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].descount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
               <td> <button id="btn" onclick="UpdatePro(${i});">Update</button> </td>
               <td> <button id="btn" onclick="DeletePro(${i});">delete</button> </td>
            </tr>`

    }
    document.getElementById('bodyy').innerHTML = table;
    if (dataPro.length > 0) {
        deleted.style.display = "block";
        deleted.innerHTML = `DELETE ALL (${dataPro.length})`;

    }
    else {
        deleted.style.display = "none";
    }
}
// update
function UpdatePro(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    descount.value = dataPro[i].descount;
    category.value = dataPro[i].category;
    getTotal();
    create.innerHTML = 'Update';
    mood = "update";
    tmp = i;
    count.style.display = "none";
}









// delete

function DeletePro(id) {
    dataPro.splice(id, 1);
    localStorage.product = JSON.stringify(dataPro);
    readPro();
}

deleted.addEventListener('click', function () {
    dataPro.splice(0);
    localStorage.product = JSON.stringify(dataPro);
    readPro();
});






btnn.addEventListener('click', function () {
    if (localStorage.product != null) {
        dataPro = JSON.parse(localStorage.product)

    }
    else {
        alert('slm')
    };
    readPro();
});

function searchPro(id) {
    if (id === "btnTitle") {
        search.focus();
        search.placeholder = "Search on title";
        search.classList.add('focuss');
    } else {
        search.focus();
        search.placeholder = "Search on category";
    }
};




