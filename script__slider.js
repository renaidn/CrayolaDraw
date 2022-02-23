// CREATE VARIABLES FOR slider__range AND slider__value 
let brushSizeSlider = document.getElementById("slider__range");
let sliderValue = document.getElementById("slider__value");
// DISPLAY DEFAULT SLIDER VALUE IF USER DIDN'T INTERACT WITH SLIDER
sliderValue.innerHTML = brushSizeSlider.defaultValue;
// UPDATE SLIDER VALUE DISPLAYED ON USER INTERACTION
brushSizeSlider.oninput = function () {
    sliderValue.innerHTML = this.value;
}