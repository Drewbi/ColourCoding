function changeBG(colour) {
    rgbColour = hexToRgb("#" + colour)
    const { r, g, b } = rgbColour;
    document.body.style.background = `rgb(${r}, ${g}, ${b})`;
    colourName(colour);
    setTextColour(rgbColour);
}

function checkField(elem) {
    elem.value = elem.value.toLowerCase.replace(/[^0-9a-f]/g, '')
    if (elem.value.length === 6) {
        changeBG(elem.value);
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function colourName(colour) {
    const subtext = document.getElementById("colourName");
    const loader = document.getElementById("loader");
    subtext.style.display = "none";
    loader.style.display = "inline-block";
    fetch(`https://www.thecolorapi.com/id?hex=${colour}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("colourName").innerHTML = data.name.value;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            loader.style.display = "none";
            subtext.style.display = "block";
        })
}

function setTextColour(rgb) {
    const total = Object.values(rgb).reduce((acc, cur) => {
        return acc + cur;
    })
    const lightness = total > 382 ? 0 : 255;
    const rgbVal = `rgb(${lightness}, ${lightness}, ${lightness})`;
    const [...text] = document.getElementsByClassName("text");
    text.forEach(element => {
        element.style.color = rgbVal;
    });
    const [...loadingelems] = document.querySelectorAll("#loader > div");
    loadingelems.forEach(element => {
        element.style.background = rgbVal;
    });
}
