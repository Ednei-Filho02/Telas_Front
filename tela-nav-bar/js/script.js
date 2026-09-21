/* =========================================================
   DEVSPACE
   SCRIPT.JS
   JavaScript global do projeto
========================================================= */


/* =========================================================
   01. MENU MOBILE
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const navMenu =
    document.getElementById("navMenu");


if (mobileMenuButton && navMenu) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle("active");


            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen
            );


            /*
             * Animação do ícone hamburger
             */

            const lines =
                mobileMenuButton.querySelectorAll("span");


            if (isOpen) {

                lines[0].style.transform =
                    "translateY(7px) rotate(45deg)";

                lines[1].style.opacity =
                    "0";

                lines[2].style.transform =
                    "translateY(-7px) rotate(-45deg)";

            } else {

                lines[0].style.transform =
                    "none";

                lines[1].style.opacity =
                    "1";

                lines[2].style.transform =
                    "none";
            }

        }
    );

}


/* =========================================================
   02. DROPDOWN DA NAVBAR
========================================================= */

const navDropdown =
    document.querySelector(".nav-dropdown");

const dropdownButton =
    document.querySelector(".dropdown-button");


if (navDropdown && dropdownButton) {

    dropdownButton.addEventListener(
        "click",
        (event) => {

            /*
             * Evita que o clique seja interpretado
             * como um clique fora do dropdown.
             */

            event.stopPropagation();


            /*
             * Só utilizamos esse comportamento
             * principalmente em telas menores.
             */

            if (window.innerWidth <= 800) {

                navDropdown.classList.toggle("open");

            }

        }
    );

}


/* =========================================================
   03. FECHAR MENU AO CLICAR FORA
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        /*
         * Fecha dropdown
         */

        if (
            navDropdown &&
            !navDropdown.contains(event.target)
        ) {

            navDropdown.classList.remove("open");

        }


        /*
         * Fecha menu mobile
         */

        if (
            navMenu &&
            mobileMenuButton &&
            !navMenu.contains(event.target) &&
            !mobileMenuButton.contains(event.target)
        ) {

            navMenu.classList.remove("active");


            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            const lines =
                mobileMenuButton.querySelectorAll("span");


            if (lines.length === 3) {

                lines[0].style.transform =
                    "none";

                lines[1].style.opacity =
                    "1";

                lines[2].style.transform =
                    "none";
            }

        }

    }
);


/* =========================================================
   04. LINKS DA NAVBAR NO MOBILE
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );


navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 800 &&
                    navMenu &&
                    mobileMenuButton
                ) {

                    navMenu.classList.remove(
                        "active"
                    );


                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const lines =
                        mobileMenuButton.querySelectorAll(
                            "span"
                        );


                    if (lines.length === 3) {

                        lines[0].style.transform =
                            "none";

                        lines[1].style.opacity =
                            "1";

                        lines[2].style.transform =
                            "none";
                    }

                }

            }
        );

    }
);


/* =========================================================
   05. FECHAR MENU AO REDIMENSIONAR
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800 &&
            navMenu &&
            mobileMenuButton
        ) {

            navMenu.classList.remove(
                "active"
            );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            if (navDropdown) {

                navDropdown.classList.remove(
                    "open"
                );

            }


            const lines =
                mobileMenuButton.querySelectorAll(
                    "span"
                );


            if (lines.length === 3) {

                lines[0].style.transform =
                    "none";

                lines[1].style.opacity =
                    "1";

                lines[2].style.transform =
                    "none";
            }

        }

    }
);


/* =========================================================
   06. MOSTRAR / OCULTAR SENHA
========================================================= */

const showPassword =
    document.getElementById("showPassword");

const passwordInput =
    document.getElementById("password");


if (showPassword && passwordInput) {

    showPassword.addEventListener(
        "click",
        () => {

            const passwordVisible =
                passwordInput.type === "text";


            if (passwordVisible) {

                passwordInput.type =
                    "password";


                showPassword.textContent =
                    "👁";


                showPassword.setAttribute(
                    "aria-label",
                    "Mostrar senha"
                );

            } else {

                passwordInput.type =
                    "text";


                showPassword.textContent =
                    "🙈";


                showPassword.setAttribute(
                    "aria-label",
                    "Ocultar senha"
                );

            }

        }
    );

}


/* =========================================================
   07. LOGIN
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


if (loginForm && loginMessage) {

    loginForm.addEventListener(
        "submit",
        (event) => {

            /*
             * Impede o formulário de recarregar
             * a página.
             */

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    ?.value;


            /*
             * Limpa mensagem anterior.
             */

            loginMessage.textContent =
                "";

            loginMessage.className =
                "login-message";


            /* -----------------------------------------
               VALIDAÇÃO DO EMAIL
            ----------------------------------------- */

            if (!email) {

                loginMessage.textContent =
                    "Digite seu e-mail.";

                loginMessage.classList.add(
                    "error"
                );

                return;
            }


            /*
             * Validação simples de formato.
             */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                loginMessage.textContent =
                    "Digite um e-mail válido.";

                loginMessage.classList.add(
                    "error"
                );

                return;
            }


            /* -----------------------------------------
               VALIDAÇÃO DA SENHA
            ----------------------------------------- */

            if (!password) {

                loginMessage.textContent =
                    "Digite sua senha.";

                loginMessage.classList.add(
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                loginMessage.textContent =
                    "A senha deve possuir pelo menos 6 caracteres.";

                loginMessage.classList.add(
                    "error"
                );

                return;
            }


            /* -----------------------------------------
               LOGIN SIMULADO
            ----------------------------------------- */

            loginMessage.textContent =
                "Login realizado com sucesso!";

            loginMessage.classList.add(
                "success"
            );


            /*
             * Aqui futuramente você poderia
             * enviar os dados para um backend.
             *
             * Exemplo:
             *
             * fetch("/api/login", {
             *     method: "POST",
             *     body: ...
             * });
             */


            setTimeout(
                () => {

                    /*
                     * Por enquanto não redirecionamos
                     * para outra página.
                     *
                     * Isso permite testar o formulário
                     * sem backend.
                     */

                },
                1000
            );

        }
    );

}


/* =========================================================
   08. FILTROS DE PROJETOS
========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


if (
    filterButtons.length > 0 &&
    projectCards.length > 0
) {

    filterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /*
                     * Remove o estado ativo
                     * dos outros botões.
                     */

                    filterButtons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                     * Ativa o botão clicado.
                     */

                    button.classList.add(
                        "active"
                    );


                    /*
                     * Descobre a categoria.
                     *
                     * Exemplo:
                     *
                     * all
                     * web
                     * javascript
                     * design
                     */

                    const selectedCategory =
                        button.dataset.filter;


                    /*
                     * Percorre todos os projetos.
                     */

                    projectCards.forEach(
                        (card) => {

                            const cardCategory =
                                card.dataset.category;


                            /*
                             * "all" mostra tudo.
                             */

                            const shouldShow =
                                selectedCategory === "all" ||
                                cardCategory === selectedCategory;


                            if (shouldShow) {

                                card.classList.remove(
                                    "filter-hidden"
                                );


                                card.classList.add(
                                    "filter-visible"
                                );

                            } else {

                                card.classList.remove(
                                    "filter-visible"
                                );


                                card.classList.add(
                                    "filter-hidden"
                                );

                            }

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   09. PESQUISA DA NAVBAR
========================================================= */

const searchButton =
    document.getElementById("searchButton");


if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            /*
             * Por enquanto utilizamos o prompt
             * nativo do navegador.
             *
             * Futuramente podemos transformar
             * isso em uma caixa de pesquisa
             * profissional dentro da navbar.
             */

            const search =
                window.prompt(
                    "O que você deseja pesquisar?"
                );


            if (
                search &&
                search.trim() !== ""
            ) {

                console.log(
                    "Pesquisa:",
                    search.trim()
                );


                /*
                 * Aqui futuramente poderíamos
                 * pesquisar conteúdos reais.
                 */

            }

        }
    );

}


/* =========================================================
   10. ANO AUTOMÁTICO DO FOOTER
========================================================= */

const currentYear =
    new Date().getFullYear();


const footerYear =
    document.querySelector(
        ".footer-year"
    );


if (footerYear) {

    footerYear.textContent =
        currentYear;

}


/* =========================================================
   11. LINKS DE DEMONSTRAÇÃO
========================================================= */

const placeholderLinks =
    document.querySelectorAll(
        'a[href="#"]'
    );


placeholderLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                /*
                 * Impede que links "#"
                 * joguem a página para o topo.
                 */

                event.preventDefault();

            }
        );

    }
);


/* =========================================================
   12. ANIMAÇÃO DE ENTRADA
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".topic-card, .project-card"
    );


if (
    animatedElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (
                entries,
                observerInstance
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";


                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        (element) => {

            element.style.opacity =
                "0";


            element.style.transform =
                "translateY(20px)";


            element.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";


            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   13. LOG NO CONSOLE
========================================================= */

console.log(
    "%cDevSpace carregado!",
    "color: #8e82ff; font-size: 16px; font-weight: bold;"
);


console.log(
    "JavaScript funcionando corretamente."
);


/* =========================================================
   FIM DO SCRIPT.JS
========================================================= */
