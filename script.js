const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonImage = document.getElementById("sprite");
const types = document.getElementById("types");
const typeOne = document.createElement("span");
const typeTwo = document.createElement("span");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const defaultSkin = document.getElementById("default");
const shinySkin = document.getElementById("shiny");
const screen = document.querySelector(".screen");
const lightCircle = document.querySelector(".circle");

const arrStats = [hp, attack, defense, spAttack, spDefense, speed];

const fetchPokemon = async (request) => {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${request}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await response.json();
    assignStats(data);
  } catch (error) {
    console.error("Error:", error);
    pokemonName.innerText = "Pokemon not found";
    setColorLight("red");
    setTimeout(() => {
      alert("Pokémon not found");
    }, 0);
  }
};

const searchPokemon = () => {
  screen.style.background =
    "radial-gradient(circle, #b0e0e6, #87ceeb, #2f648f)";
  setColorLight("aqua");
  event.preventDefault();
  if (!searchInput.value) {
    // to make sure the fild is still required after deleting info
    searchInput.reportValidity();
    return;
  }
  // Clear all data
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  weight.innerText = "";
  height.innerText = "";
  pokemonImage.setAttribute("src", "");
  types.innerHTML = "";
  arrStats.forEach((stat) => (stat.innerText = "??"));

  const input = searchInput.value.toLowerCase();
  fetchPokemon(input);
};

const assignStats = (data) => {
  console.log(data);
  setColorLight("green");
  pokemonName.innerText = data.name.toUpperCase();
  pokemonId.innerText = `#${data.id}`;
  weight.innerText = `Weight: ${data.weight}`;
  height.innerText = `Height: ${data.height}`;
  if (defaultSkin.checked) {
    pokemonImage.setAttribute("src", data.sprites.front_default);
  } else if (shinySkin.checked) {
    pokemonImage.setAttribute("src", data.sprites.front_shiny);
  }
  if (data.types.length > 1) {
    setTypeColor(data.types[0].type.name, typeOne);
    typeOne.innerText = data.types[0].type.name.toUpperCase();
    types.appendChild(typeOne);
    setTypeColor(data.types[1].type.name, typeTwo);
    typeTwo.innerText = data.types[1].type.name.toUpperCase();
    types.appendChild(typeTwo);
  } else {
    typeOne.innerText = data.types[0].type.name.toUpperCase();
    typeTwo.innerText = "";
    setTypeColor(data.types[0].type.name, typeOne);
    setTypeColor("", typeTwo);
    types.appendChild(typeOne);
  }

  for (let i = 0; i < arrStats.length; i++) {
    arrStats[i].innerText = data.stats[i].base_stat;
  }
};

const setColorLight = (color) => {
  switch (color) {
    case "green":
      lightCircle.style.background =
        "radial-gradient(circle, rgba(173, 255, 47, 0.9) 30%, rgba(0, 255, 0, 0.6) 80%)";
      lightCircle.style.boxShadow =
        "0 0 20px rgba(173, 255, 47, 0.8), inset 0 0 10px rgba(173, 255, 47, 0.6)";
      break;
    case "red":
      lightCircle.style.background =
        "radial-gradient(circle, rgba(255, 0, 0, 0.8) 30%, rgb(70, 3, 3) 80%)";
      lightCircle.style.boxShadow =
        "0 0 20px rgba(255, 0, 0, 0.8), inset 0 0 10px rgba(255, 0, 0, 0.6)";
      break;

    case "aqua":
      lightCircle.style.background =
        "radial-gradient(circle, rgba(0, 255, 255, 0.8) 30%, rgba(0, 128, 128, 0.5) 80%)";
      lightCircle.style.boxShadow =
        "0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 255, 255, 0.6)";
      break;
  }
};

const setTypeColor = (type, element) => {
  switch (type) {
    case "grass":
      element.style.background = "rgb(31, 197, 31)";
      break;
    case "water":
      element.style.background = "rgb(73, 144, 202)";
      break;
    case "poison":
      element.style.background = "rgb(211, 71, 211)";
      break;
    case "fire":
      element.style.background = "rgb(253, 93, 75)";
      break;
    case "flying":
      element.style.background = "rgb(95, 132, 211)";
      break;
    case "fairy":
      element.style.background = "pink";
      break;
    case "bug":
      element.style.background = "rgb(147, 224, 32)";
      break;
    case "normal":
      element.style.background = "rgb(180, 128, 61)";
      break;
    case "electric":
      element.style.background = "yellow";
      break;
    case "ground":
      element.style.background = "rgb(226, 128, 63)";
      break;
    case "ice":
      element.style.background = "rgb(57, 248, 248)";
      break;
    case "fighting":
      element.style.background = "rgb(240, 105, 87)";
      break;
    case "psychic":
      element.style.background = "rgb(248, 52, 215)";
      break;
    case "rock":
      element.style.background = "goldenrod";
      break;
    case "steel":
      element.style.background = "grey";
      break;

    case "ghost":
      element.style.background = "rgb(163, 98, 206)";
      break;

    case "dark":
      element.style.background = "rgb(95, 95, 95)";
      break;

    case "dragon":
      element.style.background = "rgb(252, 65, 137)";
      break;

    default:
      element.style.background = "rgba(0, 0, 0, 0)";
  }
};

searchButton.addEventListener("click", searchPokemon);

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchPokemon();
  }
});
