const addItemBtn = document.getElementById('add-item-btn');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const filterAllBtn = document.getElementById('filter-all');
const filterPurchasedBtn = document.getElementById('filter-purchased');
const filterUnpurchasedBtn = document.getElementById('filter-unpurchased');

const items = [];

addItemBtn.addEventListener('click', function() {
    const itemName = itemInput.value.trim(); 

    if (itemName !== "") {
        const newItem = {
            name: itemName,
            purchased: false
        };

        items.push(newItem);
        renderList(items); 
        itemInput.value = "";
    } else {
        alert("Please enter an item name.");
    }
});

function renderList(filteredItems) {
    itemList.innerHTML = ""; 

    filteredItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            items.splice(index, 1); 
            renderList(items); 
        });

        const togglePurchasedBtn = document.createElement('button');
        togglePurchasedBtn.textContent = item.purchased ? 'Unpurchased' : 'Purchased';
        togglePurchasedBtn.addEventListener('click', function() {
            item.purchased = !item.purchased; 
            renderList(items); 
        });

        li.appendChild(deleteBtn);
        li.appendChild(togglePurchasedBtn);
        itemList.appendChild(li);
    });
}

filterAllBtn.addEventListener('click', function() {
    renderList(items); 
});

filterPurchasedBtn.addEventListener('click', function() {
    const purchasedItems = items.filter(item => item.purchased);
    renderList(purchasedItems); 
});

filterUnpurchasedBtn.addEventListener('click', function() {
    const unpurchasedItems = items.filter(item => !item.purchased);
    renderList(unpurchasedItems); 
});
