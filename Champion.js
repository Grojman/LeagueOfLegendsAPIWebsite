window.addEventListener("load", () => {
    getLanguages()
    changeContent()
    document.querySelector("select").addEventListener("change", (event) => {
        changeContent(event.target.value)
        document.activeElement.blur()
    })
    document.querySelector("#botonIzquierda").addEventListener("click", () => {changeSkin(-1)})
    document.querySelector("#botonDerecha").addEventListener("click", () => {changeSkin(1)})
    window.addEventListener("keydown", (event) => {
        event.key === "ArrowLeft" ? changeSkin(-1) : event.key === "ArrowRight" ? changeSkin(1) : 1
    })
})

function changeContent(idioma) {
    language = idioma == null ? "en_US" : idioma
    fetch(`${champion_url}${language}${champion_folder}${urlParams.get('champion')}.json`).then(response => {
        response.json().then(champion => {
            for (var v in champion.data) {
                ch = champion.data[v]
            }
            document.title = `${ch.name}: ${ch.title}`
            document.querySelector('h1').textContent = `${ch.name}: ${ch.title}`
            document.head.querySelector("link").href = `${champion_img}${ch.image.full}`
            document.body.style.backgroundImage = `url(${champion_back}${ch.id}_0.jpg)`
            document.querySelector('#lore').textContent = ch.lore
            document.querySelectorAll("#habilidades > div").forEach((div, n) => {
                div.querySelector("h3").textContent = n == 0 ? ch.passive.name : ch.spells[n-1].name
                div.querySelector("p").innerHTML = n == 0 ? ch.passive.description : ch.spells[n-1].description
                div.querySelector("img").src = n == 0 ? `${champion_pass}${ch.passive.image.full}` : `${champion_spells}${ch.spells[n-1].image.full}`
            })

            let stats = [
                ch.stats.hp,
                ch.stats.armor,
                ch.stats.attackdamage,
                ch.stats.attackspeed,
                ch.stats.attackrange,
                ch.stats.movespeed
            ]

            document.querySelectorAll("tr").forEach((tr, n) => {
                tr.querySelectorAll("td")[1].textContent = stats[n]
            })

            document.querySelector("#aspecto").src = `${champion_skins}${ch.id}_${ch.skins[champion_skin].num}.jpg`
            document.querySelector("h4").textContent = ch.skins[champion_skin].name
            document.querySelector("main").querySelectorAll(".block").forEach(n => n.classList.add("aparicion"))    
        })
    })
}

function changeSkin(move) {
    let maxSkin = ch.skins.length - 1
    champion_skin = champion_skin + move == -1 ? maxSkin : champion_skin + move > maxSkin ? 0 : champion_skin + move
    document.querySelector("#aspecto").src = `${champion_skins}${ch.id}_${ch.skins[champion_skin].num}.jpg`
    document.querySelector("h4").textContent = ch.skins[champion_skin].name
}

function getLanguages() {
    fetch(languages_url).then(response => response.json().then(idiomas => {
        idiomas.forEach(i => {
            let idioma = document.createElement("option")
            idioma.innerHTML = getFlagEmoji(i.slice(-2))
            idioma.value = i
            document.querySelector("select").appendChild(idioma)
        })
    }))
}

function getFlagEmoji(countryCode) {
    return countryCode.toUpperCase().replace(/./g, char => 
        String.fromCodePoint(127397 + char.charCodeAt())
    );
  }