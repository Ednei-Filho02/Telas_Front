const sidebar = document.getElementById("sidebar");

const toggleButton =
    document.getElementById("toggleButton");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const overlay =
    document.getElementById("overlay");

const reportsButton =
    document.getElementById("reportsButton");

const reportsGroup =
    reportsButton.closest(".nav-group");

const navItems =
    document.querySelectorAll(
        ".navigation > .nav-item"
    );

const submenuItems =
    document.querySelectorAll(
        ".submenu-item"
    );


// =====================================================
// RECOLHER / EXPANDIR SIDEBAR
// =====================================================

toggleButton.addEventListener("click", () => {

    sidebar.classList.toggle("collapsed");

    const collapsed =
        sidebar.classList.contains("collapsed");


    if (collapsed) {

        toggleButton.textContent = "›";

        toggleButton.setAttribute(
            "aria-label",
            "Expandir menu"
        );

        toggleButton.setAttribute(
            "title",
            "Expandir menu"
        );

        // Quando a sidebar é recolhida,
        // fecha o submenu.

        reportsGroup.classList.remove("open");

    } else {

        toggleButton.textContent = "‹";

        toggleButton.setAttribute(
            "aria-label",
            "Recolher menu"
        );

        toggleButton.setAttribute(
            "title",
            "Recolher menu"
        );
    }

});


// =====================================================
// SUBMENU DE RELATÓRIOS
// =====================================================

reportsButton.addEventListener("click", () => {

    // Se a sidebar estiver recolhida,
    // primeiro expande.

    if (sidebar.classList.contains("collapsed")) {

        sidebar.classList.remove("collapsed");

        toggleButton.textContent = "‹";

        toggleButton.setAttribute(
            "aria-label",
            "Recolher menu"
        );

        toggleButton.setAttribute(
            "title",
            "Recolher menu"
        );
    }


    reportsGroup.classList.toggle("open");

});


// =====================================================
// MENU MOBILE
// =====================================================

mobileMenuButton.addEventListener("click", () => {

    sidebar.classList.add("mobile-open");

    overlay.classList.add("active");

});


// =====================================================
// FECHAR MENU MOBILE
// =====================================================

overlay.addEventListener("click", () => {

    sidebar.classList.remove(
        "mobile-open"
    );

    overlay.classList.remove(
        "active"
    );

});


// =====================================================
// ITENS PRINCIPAIS
// =====================================================

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navItems.forEach((nav) => {

            nav.classList.remove(
                "active"
            );

        });

        item.classList.add("active");


        if (window.innerWidth <= 768) {

            sidebar.classList.remove(
                "mobile-open"
            );

            overlay.classList.remove(
                "active"
            );
        }

    });

});


// =====================================================
// SUBITENS
// =====================================================

submenuItems.forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        submenuItems.forEach((subitem) => {

            subitem.classList.remove(
                "active"
            );

        });

        item.classList.add("active");


        if (window.innerWidth <= 768) {

            sidebar.classList.remove(
                "mobile-open"
            );

            overlay.classList.remove(
                "active"
            );
        }

    });

});


// =====================================================
// ESC FECHA MENU MOBILE
// =====================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        sidebar.classList.remove(
            "mobile-open"
        );

        overlay.classList.remove(
            "active"
        );

    }

});
