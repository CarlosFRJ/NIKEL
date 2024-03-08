const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//Logar no Sistema

document.getElementById("login-form").addEventListener("submit", function(e)
{
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getaccount(email);

    if(!account)
    {
        alert("Usuário ou senha incorreto(a).");
        return;
    }

    if(account)
    {
        if(account.password !== password)
        {
            alert("Usuário ou senha incorreto(a).");
            return;   
        }

        savesession(email, checksession);
        window.location.href = "home.html";
    }

    
});

//Criar Conta

document.getElementById("create-form").addEventListener("submit", function(e)
{
    e.preventDefault();

    const email = document.getElementById("createInputEmail1").value;
    const password = document.getElementById("createInputPassword1").value;
    const confpass = document.getElementById("confirmInputPassword1").value;

    if(email.length < 5) 
    {
        alert("Preencha o campo com um email válido!");
        return;
    }

    if(password.length < 4)
    {
        alert("Preencha a senha com no mínimo 4 dígitos");
        return;
    }

    if(confpass !== password)
    {
        alert("Preencha as senhas igualmente para prosseguir.");
        return;
    }
    
    alert("Conta criada com sucesso.");

    myModal.hide();
    saveAccount({
        login: email,
        password: password,
        transactions: []
    });
});

function checklogged()
{
    if(session)
    {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged)
    {
        savesession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function savesession(data, savesession) 
{
    if(savesession)
    {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getaccount(key)
{
    const account = localStorage.getItem(key);
    if(account)
    {
        return JSON.parse(account);
    }

    return "";
}