const dex = document.getElementById("dex");

const originalPokemon = 150;

const types = {
  fire: "#DC4E35",
  grass: "#24FC72",
  electric: "#DCE12D",
  water: "#2DB4E1",
  ground: "#f4e7da",
  rock: "#BC8F8F",
  fairy: "#DB8BDF",
  poison: "#AFDF8B",
  bug: "#DEFDE0",
  dragon: "#2DE1C2",
  psychic: "#E1C8F2",
  flying: "#D8BFD8",
  fighting: "#F9B245",
  normal: "CCCBCA"
};

// Object.keys() allows us to pass in an object name and pull the keys from it
const all_types = Object.keys(types);

// Get data from API
const accessDex = async () => {
  for (let i = 1; i <= originalPokemon; i++) {
    await getPokemon(i);
  }
};

// Access API
const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createEntry(pokemon);
};

// Create container with individual Pokemon
function createEntry(pokemon) {
  // Create element
  const pokeDiv = document.createElement("div");
  pokeDiv.classList.add("pokemon");
  // map through types and name
  // 'pokemon' here refers to the returned object from the fetch()
  // The structure of accessing types, etc. is much clearer if you look at the API homepage's JSON output
  const totalTypes = pokemon.types.map(type => type.type.name);
  // -1 is returned when nothing is found, so we only want results where something was found
  // We're trying to match the type name from the object up top to those in the JSON from the API
  const pokeType = all_types.find(type => totalTypes.indexOf(type) > -1);
  const pokeName = pokemon.name[0] + pokemon.name.slice(1); // Gets rid of extra first letter that comes through with data and replaces it
  const pokeImg = pokemon.sprites.front_default;
  // Pass in the type we found as these names are the same as those in the types/ colours object
  const colour = types[pokeType];
  //add classes
  pokeDiv.style.backgroundColor = colour;

  // The padstart is a super nifty trick I learnt from this project. It basically allows you to insert space or characters at the beginning of your string!
  const pokeContent = `
  <div class="dex-entry-image">
<img src="${pokeImg}" alt="${pokemon.name}"/>
</div>
<div class="about">
  <p class="number">#${pokemon.id.toString().padStart(3, '0')}</p> 
  <p class="name">${pokeName}</p>
  <p class="type">Type: ${pokeType}</p>
</div>
`;

  pokeDiv.innerHTML = pokeContent;

  dex.appendChild(pokeDiv);
}

accessDex();
