window.addEventListener("load", PrepareChampions);

function PrepareChampions() {
  return fetch(url).then(response => response.json()).then(datos => {
      for(let x in datos.data) {
        champion_names.push(x)
      }
      champions = datos.data
      let input = document.querySelector("input")
      let sugerencias = document.forms[0].querySelector("#sugerencias")
      let sugerencia
      input.addEventListener("input", (event) => {
        sugerencias.textContent = ""
        if (event.target.value != "") {
          champion_names.forEach(n => {
            if(n.toLowerCase().startsWith(event.target.value.toLowerCase())) {
              sugerencia = document.createElement("button")
              sugerencia.textContent = n
              sugerencia.addEventListener("click", (event) => {
                ChangeScreen(event.target.textContent)
                event.preventDefault();
              })
              sugerencias.appendChild(sugerencia)
            }
          })
        } 
      })
      input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          let champion = sugerencias.firstChild.textContent
          champion != "" && champion != null ? ChangeScreen(champion) : 1
          event.preventDefault()
        } 
      })
  })
}
function ChangeScreen(champion) {
  document.querySelector("input").value = champions[champion].id
  window.location.href = `Champion.html?champion=${document.querySelector("input").value}`
}