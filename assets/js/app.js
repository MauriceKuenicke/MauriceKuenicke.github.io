new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Home', 'About Me', 'My Projects', 'My Blog'],
    anchors: ['Home', 'AboutMe', 'MyProjects', 'MyBlog'],
    onLeave: (origin, destination, direction) => {
        const section = destination.item;
        const tl = new TimelineMax({ delay: 0.5 });
        const title = section.querySelector(".about_text p");
        tl.fromTo(title, 0.6, { y: "50", opacity: 0 }, { y: 0, opacity: 1 });
    }
})

const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function () {
    //Current Index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    // Check if deleting
    if (this.isDeleting) {
        // Remove Char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add Char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 200;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // Check if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

function toggle(d) {
    var blur = document.getElementById("blur");
    blur.classList.toggle('active');
    var popup = document.getElementById("popup");
    if (popup.classList.contains("active")) {
        popup.classList.toggle('active');
    }
    else {
        popup.innerHTML = get_popup_data(d.getAttribute("data-id"));
        popup.classList.toggle('active');
    }
}

function get_popup_data(dataid) {

    if (dataid == "popup_11") {
        var src_active = "True"
        var src_link = `https://github.com/`;
        var imgsrc = "assets/images/java.png";
        var header = "This is the Java Tile";
        var code_info = generate_code_divs(["Test1", "Test2"]);
        var content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit, natus, provident
        molestias rerum voluptatibus expedita culpa voluptate ipsa tempore alias sint quis
        beatae illo repellendus maxime dicta atque aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit, natus, provident
        molestias rerum voluptatibus expedita culpa voluptate ipsa tempore alias sint quis
        beatae illo repellendus maxime dicta atque aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit, natus, provident
        molestias rerum voluptatibus expedita culpa voluptate ipsa tempore alias sint quis
        beatae illo repellendus maxime dicta atque aperiam?`;
    }
    else if (dataid == "popup_12") {
        var src_active = "True"
        var src_link = `https://github.com/`;
        var imgsrc = "assets/images/heic1501a.jpg";
        var header = "Here are the Pillars";
        var code_info = generate_code_divs(["Test1", "Test2"]);
        var content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit, natus, provident
    molestias rerum voluptatibus expedita culpa voluptate ipsa tempore alias sint quis
    beatae illo repellendus maxime dicta atque aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit, natus, provident
    molestias rerum voluptatibus expedita culpa voluptate ipsa tempore alias sint quis
    beatae illo repellendus maxime dicta atque aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit, natus, provident
    molestias rerum voluptatibus expedita culpa voluptate ipsa tempore alias sint quis
    beatae illo repellendus maxime dicta atque aperiam?`;
    }
    else {
        var src_active = "False"
        var src_link = `https://github.com/`;
        var imgsrc = "assets/images/kappa.png";
        var header = "Something went wrong here... " + dataid;
        var code_info = generate_code_divs(["Test1", "Test2"]);
        var content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit suscipit, natus, provident
    molestias rerum voluptatibus expedita culpa voluptate ipsa tempore alias sint quis
    beatae illo repellendus maxime dicta atque aperiam?`;
    }

    if (src_active == "True") {
        var src_link_btn = `<a href=${src_link} target="_blank" class="down_button">View Code <img src="assets/images/src.png" height=13px
            style="filter: invert(1)"></a>`
    }
    else if (src_active == "False") {
        var src_link_btn = `<a href=${src_link} target="_blank" class="down_button disableClick">View Code <img src="assets/images/src.png" height=13px
            style="filter: invert(1)"></a>`
    }

    var data = `<h2>${header}</h2>
    <div class="code_info">${code_info}</div>
    <div><img src=${imgsrc} style="max-width: 100%; margin-top:10px"></div>
    <p>${content}</p>
    <a href="#" onclick="toggle(this)" class="down_button">Close</a>
    ${src_link_btn}`
    return data;
}

function generate_code_divs(string_array) {
    var array_length = string_array.length;
    var div_string = "";
    for (var i = 0; i < array_length; i++) {
        div_string = div_string.concat(`<div class="code_sub">${string_array[i]}</div>`)
        console.log(div_string);
    }
    return div_string
}