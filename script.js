let allColors;

// LOAD JSON FILE DATA ON PAGE LOAD
window.addEventListener("load", () => {
    fetch("./data__crayola.json")

        .then(response => response.json())
        .then((data) => {
            allColors = data.colors;
            //CREATE HTML ELEMENTS FOR THE COLORS IN THE ARRAY
            for (let i = 0; i < allColors.length; i++) {
                //CREATE AN LI FOR EACH COLOR AND ADD IT TO THE list__item CLASS
                let listItem = document.createElement('li');
                listItem.classList.add("list__item");
                //COLOR EACH OF THE ITEMS ACCORDINGLY TO THE COLOR IT STORES
                listItem.style.backgroundColor = allColors[i].hex;
                //GET THE LIST ELEMENT USING THE ID "palette__colors-list"
                let list = document.getElementById("palette__colors-list");
                //APPEND THE LI TO THE UL
                list.appendChild(listItem);
            }

            let listitems = document.querySelectorAll(".list__item");
            // ITERATE THROUGH THE PALETTE ITEMS
            for (let i = 0; i < listitems.length; i++) {
                // SET ON CLICK FUNCTION FOR PALETTE ITEM
                listitems[i].addEventListener("click", () => {
                    colorNow = allColors[i].hex;
                    // CHANGE THE BORDER SETTINGS FOR THE ITEM CLICKED (SO THAT IT LOOKS SMALLER)
                    listitems[i].style.border = "0.5vw solid whitesmoke";
                    listitems[i].style.boxSizing = "border-box";
                    // FOR UNCLICKED PALETTE ITEMS -> SET BORDER TO NONE (SO THAT THEY DON'T LOOK LIKE ACTIVE)
                    for (let k = 0; k < listitems.length; k++) {
                        if (k != i) {
                            listitems[k].style.border = "none";
                        }
                    }
                    // DISPLAY COLOR NAME AND HEX ON THE PAGE
                    document.getElementById("color__name").innerHTML = `color: ${allColors[i].color}`
                    document.getElementById("color__hex").innerHTML = `hex: ${allColors[i].hex}`
                })
            }
        })
})

// DEFAULT SIZE VALUE artboardSizeAdjust FUNCTION
let sizeValue = 540;
// DEFAULT SIZE VALUE FOR artboardOrientAdjust FUNCTION
let sizeValueOrient = 540;
// DEFAULT BRUSH NUMBER FOR brushSelector FUNCTION (crayon)
let brushNum = 1;
// DEFAULT COLOR VALUE OF THE BRUSH (black)
let colorNow = 0;
// DEFAULT BRUSH FOR draw FUNCTION (crayon)
let brush = 1;

// RESIZE AND CLEAN CANVAS ON BUTTON CLICK
function artboardSizeAdjust(sizeValue) {
    // FOR SQUARE PROPORTIONS
    if (sizeValue == 540) {
        resizeCanvas(sizeValue, 540, true);
        background(255);
    }
    // FOR 16:9 PROPORTIONS
    else if (sizeValue == 287.5) {
        resizeCanvas(sizeValue, 540, true);
        background(255);
    }
    // FOR A4 PROPORTIONS
    else if (sizeValue == 374.2) {
        resizeCanvas(sizeValue, 540, true);
        background(255);
    };
    // UPDATE SIZE VALUE FOR artboardOrientAdjust FUNCTION
    sizeValueOrient = sizeValue;
}

// IMITATE CHANGE OF CANVAS ORIENTATION BY RESIZING AND CLEANING CANVAS ON BUTTON CLICK
function artboardOrientAdjust(orientValue) {
    // FOR PORTRAIT ORIENTATION
    if (orientValue == 1) {
        resizeCanvas(sizeValueOrient, 540, true);
        background(255);
    }
    // FOR LANDSCAPE ORIENTATION
    else if (orientValue == 2) {
        resizeCanvas(540, sizeValueOrient, true);
        background(255);
    };
}

// SAVE ARTBOARD ON BUTTON CLICK
function saveUserArtboard() {
    saveCanvas(canvas, 'myCrayolaDrawing', 'jpg');
}

// CLEAR ARTBOARD ON BUTTON CLICK
function clearArtboard() {
    background(255);
}

// COPY HEX NUMBER ON BUTTON CLICK
function copyHex() {
    // GET THE HEX NUMBER FIELD
    let copyHex = document.getElementById("color__hex");
    // COPY HEX NUMBER INSIDE THE TEXT FIELD
    navigator.clipboard.writeText(copyHex.innerHTML.slice(4, 12));
    // DISPLAY ALERT WINDOW TO USER TO SIGNIFY SUCCESS
    alert("Copied color hex: " + copyHex.innerHTML.slice(4, 12));
}

// SETUP CANVAS
function setup() {
    // CREATE SQUARE CANVAS (DEFAULT SIZE)
    let canvas = createCanvas(540, 540);
    // PLACE CANVAS IN THE artboard DIV
    canvas.parent("artboard");
    // MAKE CANVAS WHITE
    background(255);
}

// SET DRAWING FUNCTION FOR CANVAS
function draw() {
    // IF MOUSE IS PRESSED -> DRAW ON CANVAS WITH SELECTED BRUSH
    if (mouseIsPressed) {
        brushSelector(brush);
    }
}

// CRAYON BRUSH FUNCTION
function brushCrayon() {
    // UPDATE BRUSH SIZE ACCORDING TO THE SLIDER VALUE
    let sliderValueOutput = document.getElementById("slider__value");
    let sliderValue = sliderValueOutput.innerHTML;
    // DECLARE brushRadius VARIABLE WHICH WILL HOLD THE BRUSH SIZE FROM SLIDER VALUE
    let brushRadius;
    // UPDATE COLOR OF THE BRUSH
    stroke(colorNow);
    // DEFINE BRUSH DENSITY VALUE
    let brushDensity = 95;
    // SET THE NUMBER OF TIMES WE FIND THE LINEAR INTERPOLATION IN THE FOR LOOP (AFFECTS THE DENSITY OF THE BRUSH)
    let lerps = 10;

    // IF STATEMENT TO SET BRUSH SIZE
    // IF SLIDER WAS NOT TOUCHED BY THE USER -> MAKE THE BRUSH OF A DEFAULT SIZE (10)
    if (sliderValue == "") {
        // DEFAULT BRUSH SIZE
        brushRadius = 10;
    }
    // IF SLIDER WAS TOUCHED -> UPDATE BRUSH RADIUS VARIABLE
    else {
        brushRadius = sliderValue;
    };

    // SQUARE THE BRUSH RADIUS VALUE TO MAKE THE CHANGE IN BRUSH SIZE MORE IMPACTFUL
    let radiusSquared = brushRadius * brushRadius;

    // MAKE THE CRAYON HAVE A GRAINY TEXTURE
    // DRAW A FILLED IN CIRCLE MADE OUT OF A BUNCH OF POINTS BUILD AROUND THE POINT OF MOUSE CLICK
    for (let i = 0; i < lerps; i++) {
        // FIND THE LERPed X AND Y COORDINATES
        const lerpX = lerp(mouseX, pmouseX, i / lerps);
        const lerpY = lerp(mouseY, pmouseY, i / lerps);

        // DRAW RANDOMIZED POINTS WITHIN A CIRCLE
        for (let j = 0; j < brushDensity; j++) {
            //PICK RANDOM POSITION
            const randX = random(-brushRadius, brushRadius);
            const randY = random(-1, 1) * sqrt(radiusSquared - randX * randX);
            //DRAW THE POINT
            point(lerpX + randX, lerpY + randY);
        }
    }
}

// MARKER BRUSH FUNCTION
function brushMarker() {
    // UPDATE BRUSH SIZE ACCORDING TO THE SLIDER VALUE
    let sliderValueOutput = document.getElementById("slider__value");
    let sliderValue = sliderValueOutput.innerHTML;
    // DECLARE brushWidth VARIABLE WHICH WILL HOLD THE BRUSH SIZE FROM SLIDER VALUE
    let brushWidth;
    // UPDATE COLOR OF THE BRUSH
    stroke(colorNow);
    // SET THE NUMBER OF TIMES WE FIND THE LINEAR INTERPOLATION IN THE FOR LOOP (AFFECTS THE DENSITY OF THE BRUSH)
    let lerps = 20;

    // IF STATEMENT TO SET BRUSH SIZE
    // IF SLIDER WAS NOT TOUCHED BY THE USER -> MAKE THE BRUSH OF A DEFAULT SIZE (10)
    if (sliderValue == "") {
        // DEFAULT BRUSH SIZE
        brushWidth = 10;
    }
    // IF SLIDER WAS TOUCHED -> UPDATE BRUSH WIDTH VARIABLE
    else {
        brushWidth = parseInt(sliderValue);
    };

    // IMITATE MARKER BRUSH SHAPE
    // USE FOR LOOP AND LERP TO REPEAT THE BRUSH LINE
    for (let i = 0; i <= lerps - 1; i++) {
        // FIND THE LERPed X AND Y COORDINATES
        const x = lerp(mouseX, pmouseX, i / lerps);
        const y = lerp(mouseY, pmouseY, i / lerps);
        // DRAW A LINE
        console.log(x - brushWidth, y - brushWidth, x + brushWidth, y + brushWidth)
        line(x - brushWidth, y - brushWidth, x + brushWidth, y + brushWidth);
    }
}

// SPRAY PAINT BRUSH FUNCTION
function brushSpray() {
    // UPDATE BRUSH SIZE ACCORDING TO THE SLIDER VALUE
    let sliderValueOutput = document.getElementById("slider__value");
    let sliderValue = sliderValueOutput.innerHTML;
    // DECLARE brushRadius VARIABLE WHICH WILL HOLD THE BRUSH SIZE FROM SLIDER VALUE
    let brushRadius;
    // UPDATE COLOR OF THE BRUSH
    stroke(colorNow);
    // DEFINE BRUSH DENSITY VALUE
    let brushDensity = 80;
    // SET THE NUMBER OF TIMES WE FIND THE LINEAR INTERPOLATION IN THE FOR LOOP (AFFECTS THE DENSITY OF THE BRUSH)
    let lerps = 5;

    // FIND THE SPEED OF MOUSE MOVEMENT
    let mouseSpeed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);

    // IF STATEMENT TO SET BRUSH SIZE
    // IF SLIDER WAS NOT TOUCHED BY THE USER -> MAKE THE BRUSH OF A DEFAULT SIZE (10)
    if (sliderValue == "") {
        // DEFAULT BRUSH SIZE
        brushRadius = 10;
    }
    // IF SLIDER WAS TOUCHED -> UPDATE BRUSH RADIUS VARIABLE
    else {
        brushRadius = parseInt(sliderValue);
    };

    // MAKE A NEW VARIABLE THAT ACCOUNTS BOTH brushRadius AND mouseSpeed VARIABLES
    // THE FASTER YOU MOVE THE MOUSE -> THE BIGGER THE BRUSH RADIUS
    let radiusDynamic = mouseSpeed + brushRadius;
    // SQUARE THE BRUSH RADIUS VALUE TO MAKE THE CHANGE IN BRUSH SIZE MORE IMPACTFUL
    let radiusSquared = radiusDynamic * radiusDynamic;

    // MAKE THE SPRAY PAINT HAVE A SPRAY TEXTURE
    // DRAW A FILLED IN CIRCLE MADE OUT OF A BUNCH OF POINTS BUILD AROUND THE POINT OF MOUSE CLICK
    for (let i = 0; i < lerps; i++) {
        // FIND THE LERPed X AND Y COORDINATES
        const lerpX = lerp(mouseX, pmouseX, i / lerps);
        const lerpY = lerp(mouseY, pmouseY, i / lerps);

        // DRAW RANDOMIZED POINTS WITHIN A CIRCLE
        for (let j = 0; j < brushDensity; j++) {
            //PICK RANDOM POSITION
            const randX = random(-radiusDynamic, radiusDynamic);
            const randY = random(-1, 1) * sqrt(radiusSquared - randX * randX);
            //DRAW THE POINT
            point(lerpX + randX, lerpY + randY);
        }
    }
}

// ERASER BRUSH FUNCTION
function brushEraser() {
    // UPDATE BRUSH SIZE ACCORDING TO THE SLIDER VALUE
    let sliderValueOutput = document.getElementById("slider__value");
    let sliderValue = sliderValueOutput.innerHTML;
    // DECLARE brushRadius VARIABLE WHICH WILL HOLD THE BRUSH SIZE FROM SLIDER VALUE
    let brushRadius;
    // COLOR BRUSH BLACK
    stroke(255);
    // DEFINE BRUSH DENSITY VALUE
    let brushDensity = 100;
    // SET THE NUMBER OF TIMES WE FIND THE LINEAR INTERPOLATION IN THE FOR LOOP (AFFECTS THE DENSITY OF THE BRUSH)
    let lerps = 100;

    // IF STATEMENT TO SET BRUSH SIZE
    // IF SLIDER WAS NOT TOUCHED BY THE USER -> MAKE THE BRUSH OF A DEFAULT SIZE (10)
    if (sliderValue == "") {
        // DEFAULT BRUSH SIZE
        brushRadius = 10
    }
    // IF SLIDER WAS TOUCHED -> UPDATE BRUSH RADIUS VARIABLE
    else {
        brushRadius = sliderValue;
    };

    // SQUARE THE BRUSH RADIUS VALUE TO MAKE THE CHANGE IN BRUSH SIZE MORE IMPACTFUL
    let radiusSquared = brushRadius * brushRadius;

    // MAKE THE ERASER HAVE GRAINY TEXTURE
    // DRAW A FILLED IN CIRCLE MADE OUT OF A BUNCH OF POINTS BUILD AROUND THE POINT OF MOUSE CLICK
    for (let i = 0; i < lerps; i++) {
        // FIND THE LERPed X AND Y COORDINATES
        const lerpX = lerp(mouseX, pmouseX, i / lerps)
        const lerpY = lerp(mouseY, pmouseY, i / lerps)
        // DRAW RANDOMIZED POINTS WITHIN A CIRCLE
        for (let j = 0; j < brushDensity; j++) {
            //PICK RANDOM POSITION
            const randX = random(-brushRadius, brushRadius)
            const randY = random(-1, 1) * sqrt(radiusSquared - randX * randX)
            //DRAW THE POINT
            point(lerpX + randX, lerpY + randY)
        }
    }
}

// CHANGE CURRENT BRUSH ON CLICK
function brushSelector(brushNum) {
    // FOR CRAYON TOOL
    if (brushNum == 1) {
        brushCrayon()
    }
    // FOR MARKER TOOL
    else if (brushNum == 2) {
        brushMarker()
    }
    // FOR SPRAY PAINT TOOL
    else if (brushNum == 3) {
        brushSpray()
    }
    // FOR ERASER TOOL
    else if (brushNum == 4) {
        brushEraser()
    };
    // UPDATE CURRENT BRUSH VALUE FOR draw FUNCTION
    brush = brushNum;
}