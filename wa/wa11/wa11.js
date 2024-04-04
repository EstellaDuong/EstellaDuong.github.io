const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

/* Declaring the alternative text for each image file */
const altText = {
    "pic1.jpg" : "alt",
    "pic2.jpg" : "alt",
    "pic3.jpg" : "alt",
    "pic4.jpg" : "alt",
    "pic5.jpg" : "alt",
}
/* Looping through images */
for(const i of images){
    const nsrc = `images/${i}`;
    // const nsrc = filenames[i];
    const nalt = altText[i];
    const newImage = document.createElement('img');
    newImage.setAttribute('src', nsrc);
    newImage.setAttribute('alt', nalt);
    thumbBar.appendChild(newImage);

    newImage.addEventListener("click", () => {
        displayedImage.setAttribute('src', nsrc);
        displayedImage.setAttribute('alt', nalt);
    })
}


/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
    if(btn.getAttribute("class") === "dark"){
        btn.setAttribute("class", "light")
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    }
    else{
        btn.setAttribute("class", "dark")
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
})