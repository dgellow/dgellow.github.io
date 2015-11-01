/*global setTimeout, $, particlesJS*/
function randomLoadingText() {
    var texts = [
        "Preparing next planetary alignment",
        "Building incredible stuff",
        "Fighting zombies",
        "Nobody reads those texts"
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
        "สวัสดีครับ"
    ];
    var item = texts[Math.floor(Math.random() * texts.length)];
    return item.toUpperCase().concat('!');
}

window.onload = function() {
    var loader = $('#loader'),
        loadText = $('#loader .text'),
        circle = $('#loader .circle'),
        salutation = $('#salutation'),
        sentences = $('#sentences');

    loadText.text(randomLoadingText());
    salutation.text(randomSalutation()).slabText();

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
    }, 5000);

    particlesJS.load('particles-js', 'particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
};
