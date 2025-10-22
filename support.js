let modal = document.getElementById("supportModal");
let btn = document.getElementById("supportBtn");
let span = document.getElementsByClassName("close")[0];
let sendBtn = document.getElementById("sendBtn");

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
sendBtn.onclick = function() {
    let phone = document.getElementById("phoneInput").value.trim();
    if (phone === "") {
        alert("Введіть номер телефону!");
    } else {
        alert("Дякуємо! Ми зв'яжемося з вами за номером: " + phone);
        modal.style.display = "none";
        document.getElementById("phoneInput").value = "";
    }
}