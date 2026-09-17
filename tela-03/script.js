/* =========================================
   MINI BANCO DE DADOS LOCAL
========================================= */

const DB_KEY = "portal_usuarios";

const SESSION_KEY = "portal_usuario_logado";


/* =========================================
   ELEMENTOS
========================================= */

const loginFormContainer =
    document.getElementById("loginForm");

const registerFormContainer =
    document.getElementById("registerForm");

const dashboard =
    document.getElementById("dashboard");

const loginForm =
    document.getElementById("login");

const registerForm =
    document.getElementById("register");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const logoutButton =
    document.getElementById("logout");

const loginMessage =
    document.getElementById("loginMessage");

const registerMessage =
    document.getElementById("registerMessage");

const toast =
    document.getElementById("toast");


/* =========================================
   BANCO DE DADOS
========================================= */

/*
    Retorna todos os usuários cadastrados.
*/

function getUsers() {

    const users =
        localStorage.getItem(DB_KEY);

    if (!users) {
        return [];
    }

    try {

        return JSON.parse(users);

    } catch (error) {

        console.error(
            "Erro ao ler banco local:",
            error
        );

        return [];
    }
}


/*
    Salva os usuários no localStorage.
*/

function saveUsers(users) {

    localStorage.setItem(
        DB_KEY,
        JSON.stringify(users)
    );
}


/* =========================================
   UTILIDADES
========================================= */

function normalizeEmail(email) {

    return email
        .trim()
        .toLowerCase();
}


function showMessage(element, message, type) {

    element.textContent = message;

    element.className =
        `message ${type}`;
}


function clearMessage(element) {

    element.textContent = "";

    element.className = "message";
}


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* =========================================
   NAVEGAÇÃO ENTRE TELAS
========================================= */

showRegister.addEventListener(
    "click",
    () => {

        clearMessage(loginMessage);

        loginFormContainer.classList.add("hidden");

        dashboard.classList.add("hidden");

        registerFormContainer.classList.remove(
            "hidden"
        );

        document
            .getElementById("registerName")
            .focus();
    }
);


showLogin.addEventListener(
    "click",
    () => {

        clearMessage(registerMessage);

        registerFormContainer.classList.add("hidden");

        dashboard.classList.add("hidden");

        loginFormContainer.classList.remove(
            "hidden"
        );

        document
            .getElementById("loginEmail")
            .focus();
    }
);


/* =========================================
   CADASTRO
========================================= */

registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        clearMessage(registerMessage);


        const name =
            document
                .getElementById("registerName")
                .value
                .trim();

        const email =
            normalizeEmail(
                document
                    .getElementById("registerEmail")
                    .value
            );

        const password =
            document
                .getElementById("registerPassword")
                .value;

        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        /* Validação do nome */

        if (name.length < 3) {

            showMessage(
                registerMessage,
                "Digite seu nome completo.",
                "error"
            );

            return;
        }


        /* Validação do e-mail */

        if (!email.includes("@")) {

            showMessage(
                registerMessage,
                "Digite um e-mail válido.",
                "error"
            );

            return;
        }


        /* Validação da senha */

        if (password.length < 6) {

            showMessage(
                registerMessage,
                "A senha precisa ter pelo menos 6 caracteres.",
                "error"
            );

            return;
        }


        /* Confirmação */

        if (password !== confirmPassword) {

            showMessage(
                registerMessage,
                "As senhas não são iguais.",
                "error"
            );

            return;
        }


        /* Recupera usuários */

        const users = getUsers();


        /* Verifica e-mail duplicado */

        const userExists =
            users.some(
                user => user.email === email
            );


        if (userExists) {

            showMessage(
                registerMessage,
                "Este e-mail já está cadastrado.",
                "error"
            );

            return;
        }


        /* Cria novo usuário */

        const newUser = {

            id:
                Date.now(),

            name:
                name,

            email:
                email,

            /*
                IMPORTANTE:

                Para manter este exemplo simples,
                a senha é armazenada localmente.

                Em produção, NUNCA armazene senhas
                dessa forma.
            */

            password:
                password,

            createdAt:
                new Date().toISOString()
        };


        /* Adiciona ao banco */

        users.push(newUser);

        saveUsers(users);


        /* Limpa formulário */

        registerForm.reset();


        /* Mostra mensagem */

        showMessage(
            registerMessage,
            "Conta criada com sucesso! Agora faça login.",
            "success"
        );


        showToast(
            "Usuário cadastrado com sucesso."
        );


        /* Volta para login após 1,5 segundos */

        setTimeout(() => {

            registerFormContainer
                .classList
                .add("hidden");

            loginFormContainer
                .classList
                .remove("hidden");

            document
                .getElementById("loginEmail")
                .value = email;

            document
                .getElementById("loginPassword")
                .focus();

            clearMessage(registerMessage);

        }, 1500);

    }
);


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        clearMessage(loginMessage);


        const email =
            normalizeEmail(
                document
                    .getElementById("loginEmail")
                    .value
            );

        const password =
            document
                .getElementById("loginPassword")
                .value;


        /* Busca usuários */

        const users =
            getUsers();


        /* Procura usuário */

        const user =
            users.find(
                item =>
                    item.email === email &&
                    item.password === password
            );


        /* Usuário não encontrado */

        if (!user) {

            showMessage(
                loginMessage,
                "E-mail ou senha incorretos.",
                "error"
            );

            return;
        }


        /* Salva sessão */

        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            })
        );


        /* Limpa formulário */

        loginForm.reset();


        /* Abre dashboard */

        openDashboard(user);


        showToast(
            "Login realizado com sucesso."
        );

    }
);


/* =========================================
   DASHBOARD
========================================= */

function openDashboard(user) {

    loginFormContainer
        .classList
        .add("hidden");

    registerFormContainer
        .classList
        .add("hidden");

    dashboard
        .classList
        .remove("hidden");


    document
        .getElementById("userName")
        .textContent =
        getFirstName(user.name);


    document
        .getElementById("dashboardName")
        .textContent =
        user.name;


    document
        .getElementById("dashboardEmail")
        .textContent =
        user.email;


    document
        .getElementById("userAvatar")
        .textContent =
        getInitials(user.name);
}


/* =========================================
   NOME / AVATAR
========================================= */

function getFirstName(name) {

    return name
        .split(" ")[0];
}


function getInitials(name) {

    const words =
        name
            .trim()
            .split(/\s+/);

    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();
}


/* =========================================
   LOGOUT
========================================= */

logoutButton.addEventListener(
    "click",
    function() {

        localStorage.removeItem(
            SESSION_KEY
        );


        dashboard
            .classList
            .add("hidden");

        loginFormContainer
            .classList
            .remove("hidden");


        loginForm.reset();


        showToast(
            "Você saiu da sua conta."
        );

    }
);


/* =========================================
   MOSTRAR / OCULTAR SENHA
========================================= */

document
    .querySelectorAll(".password-toggle")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const targetId =
                    this.dataset.target;

                const input =
                    document.getElementById(
                        targetId
                    );


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    this.textContent =
                        "Ocultar";

                } else {

                    input.type = "password";

                    this.textContent =
                        "Mostrar";
                }

            }
        );

    });


/* =========================================
   ESQUECI A SENHA
========================================= */

document
    .getElementById("forgotPassword")
    .addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            showToast(
                "Em um sistema real, aqui entraria o fluxo de recuperação de senha."
            );

        }
    );


/* =========================================
   VERIFICA SESSÃO AO ABRIR A PÁGINA
========================================= */

function checkSession() {

    const session =
        localStorage.getItem(
            SESSION_KEY
        );

    if (!session) {
        return;
    }


    try {

        const user =
            JSON.parse(session);

        if (
            user &&
            user.id &&
            user.email
        ) {

            openDashboard(user);

        }

    } catch (error) {

        localStorage.removeItem(
            SESSION_KEY
        );

    }
}


checkSession();
