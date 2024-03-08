const myModal = new bootstrap.Modal("#transactionModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

// Add Lançamento

document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("Valueinput").value);
    const description = document.getElementById("Inputdescription").value;
    const date = document.getElementById("Inputdate").value;
    const type = document.querySelector('input[name="typeinput"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    savedata(data);
    e.target.reset();
    myModal.hide();

    alert("Lançamento adcionado com sucesso");

    getransactions();

});

checklogged();

function checklogged()
{
    if(session)
    {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged)
    {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser)
    {
        data = JSON.parse(dataUser);
    }

    getransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getransactions() {
    const transactions = data.transactions;
    let transactionshtml = ``;

    if(transactions.length){
        transactions.forEach((item) => {

            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            transactionshtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        }
        )
    }

    document.getElementById("transactionslist").innerHTML = transactionshtml;

}

function savedata(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}