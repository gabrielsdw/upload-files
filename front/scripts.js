const form = document.querySelector("#uploadForm")
form.addEventListener("submit", sendForm)

async function sendForm(ev) {
    ev.preventDefault()

    const data = new FormData()
    data.append("username", document.querySelector("#username").value)
    data.append("photo", document.querySelector("#foto").files[0])
    
     response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        body: data
    })

    response = await response.json()
    document.querySelector("#response").innerHTML = JSON.stringify(response, null, 2)
}
