const url = `http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json`
const champion_url = `http://ddragon.leagueoflegends.com/cdn/13.10.1/data/`
const champion_folder = `/champion/`
const champion_img = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/`
const champion_pass = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/passive/`
const champion_spells = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/`
const champion_skins = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/`
const champion_back = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/`
const languages_url = `https://ddragon.leagueoflegends.com/cdn/languages.json`
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let ch
let champion_skin = 0
let champions = []
let champion_names = []
let language = "en_US"