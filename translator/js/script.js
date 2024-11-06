import { fakeTranslate } from './fakeTranslate.js';

let favorites = [];

async function translateWord() {
    const word = document.getElementById("wordInput").value.trim();
    if (!word) {
        alert("Введите слово для перевода.");
        return;
    }
    try {
        const translation = await fakeTranslate(word);
        document.getElementById("translationResult").innerText = translation;
        document.getElementById("saveButton").disabled = false;
    } catch (error) {
        document.getElementById("translationResult").innerText = error;
    }
}

function saveTranslation() {
    const word = document.getElementById("wordInput").value.trim();
    const translation = document.getElementById("translationResult").innerText;

    favorites.push({ word, translation });
    updateFavorites();
    document.getElementById("saveButton").disabled = true;

    alert(`Сохранено: ${word} - ${translation}`);
}

function updateFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        const message = document.createElement("li");
        message.innerText = "Нет избранных переводов.";
        favoritesList.appendChild(message);
    } else {
        favorites.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = `${item.word} - ${item.translation}`;

            const removeButton = document.createElement("button");
            removeButton.innerText = "Удалить";
            removeButton.addEventListener("click", () => removeFavorite(index));

            listItem.appendChild(removeButton);
            favoritesList.appendChild(listItem);
        });
    }
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    updateFavorites();
    alert("Перевод удален из избранного.");
}

document.getElementById("translateButton").addEventListener("click", translateWord);
document.getElementById("saveButton").addEventListener("click", saveTranslation);
