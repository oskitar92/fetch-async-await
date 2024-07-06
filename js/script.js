// ./js/script.js
const baseURL = 'https://pokeapi.co/api/v2/pokemon';
const limit = 10;
let offset = 0;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const appDiv = document.getElementById('app');

async function fetchPokemons() {
    try {
        const response = await fetch(baseURL + '?limit=' + limit + '&offset=' + offset); 
        const data = await response.json();
        renderPokemons(data.results);
    } catch (error) {
        console.error('Error al obtener los Pokémon:', error); 
    }
}

function renderPokemons(pokemons) {
    appDiv.innerHTML = ''; 
    pokemons.forEach(pokemon => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'pokemon'; 
        pokemonDiv.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}">
        `;
        appDiv.appendChild(pokemonDiv); 
    });
}

async function searchPokemon() {
    const query = searchInput.value.toLowerCase();
    if (!query) return; 
    try {
        const response = await fetch(`${baseURL}/${query}`);
        if (!response.ok) {
            throw new Error('Pokemon no encontrado');
        }
        const data = await response.json();
        appDiv.innerHTML = ''; 
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'pokemon';
        pokemonDiv.innerHTML = `
            <h3>${data.name}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
        appDiv.appendChild(pokemonDiv); 
    } catch (error) {
        appDiv.innerHTML = `<p>Pokemon no encontrado</p>`; 
    }
}

function handlePagination(direction) {
    if (direction === 'next') {
        offset += limit; 
    } else if (direction === 'prev' && offset >= limit) {
        offset -= limit; 
    }
    fetchPokemons(); 
}

searchBtn.addEventListener('click', searchPokemon); 
prevBtn.addEventListener('click', function() { handlePagination('prev'); }); 
nextBtn.addEventListener('click', function() { handlePagination('next'); });
resetBtn.addEventListener('click', function() {
    offset = 0;
    fetchPokemons();
    searchInput.value = ''; 
});

document.addEventListener('DOMContentLoaded', fetchPokemons); 
