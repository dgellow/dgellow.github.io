function randomLoadingText() {
    var texts = [
        "Preparing next planetary alignment",
        "Building incredible stuff",
        "Fighting zombies",
        "Nobody reads thoses texts"
    ];
    return texts[Math.floor(Math.random() * texts.length)];
}

function randomSalutation() {
    var texts  = [
        "hi",
        "ohayou",
        "bonjour",
        "hello",
        "Welcome",
    ];
    var item = texts[Math.floor(Math.random() * texts.length)];
    return item.toUpperCase().concat('!');
}

window.onload = function() {
    var loader = $('#loader'),
        loadText = $('#loader .text'),
        circle = $('#loader .circle'),
        salutation = $('#salutation'),
        salutationText = $('#salutation .text'),
        sentences = $('#sentences');

    loadText.text(randomLoadingText());
    salutationText.text(randomSalutation());

    setTimeout(function() {
        loader.get(0).style.top = "-100vh";
    }, 2000);

    setTimeout(function() {
        loader.addClass('hidden');
        circle.removeClass('breath');

        salutation.get(0).style.opacity = 0;
    }, 4000);

    setTimeout(function() {
        salutation.addClass('hidden');
    }, 6000);
};
