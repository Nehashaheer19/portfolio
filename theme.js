$(document).ready(function () {

    // Set initial theme
    if (localStorage.getItem("theme") === "light") {
        $("body").addClass("light-mode");
        $("#themeToggle i").removeClass("fa-sun").addClass("fa-moon");
    }

    // Toggle Theme
    $("#themeToggle").click(function () {

        $("body").toggleClass("light-mode");

        if ($("body").hasClass("light-mode")) {
            $("#themeToggle i").removeClass("fa-sun").addClass("fa-moon");
            localStorage.setItem("theme", "light");
        } else {
            $("#themeToggle i").removeClass("fa-moon").addClass("fa-sun");
            localStorage.setItem("theme", "dark");
        }
    });

    // --- SCROLL ANIMATION OBSERVER FOR SKILL PILLS & PROJECTS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            let el = $(entry.target);
            
            if (entry.isIntersecting) {
                // When element enters the screen: Reveal it
                el.removeClass("scroll-hidden");
                
                // Clear any existing timeout
                if (el.data('timeout')) clearTimeout(el.data('timeout'));
                
                // Remove transition delay after animation finishes so hover effect is instant
                let to = setTimeout(() => { 
                    el.css("transition-delay", "0s"); 
                }, 1000);
                el.data('timeout', to);
                
            } else {
                // When element leaves the screen: Hide it again!
                if (el.data('timeout')) clearTimeout(el.data('timeout'));
                el.addClass("scroll-hidden");
                
                // Restore its original staggered delay for the NEXT time it enters the screen
                if (el.hasClass("skill-pill")) {
                    let index = el.index();
                    el.css("transition-delay", (index * 0.1) + "s");
                } else {
                    el.css("transition-delay", "0.2s");
                }
            }
        });
    }, { threshold: 0.1 });

    $(".skill-pill").each(function() {
        let index = $(this).index();
        $(this).addClass("scroll-hidden"); // hide initially
        $(this).css("transition-delay", (index * 0.1) + "s");
        observer.observe(this);
    });

    $(".project-row").each(function() {
        $(this).addClass("scroll-hidden");
        $(this).css("transition-delay", "0.2s");
        observer.observe(this);
    });

});
