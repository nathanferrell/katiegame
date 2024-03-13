const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const infoDiv = document.getElementById('info');
const img = new Image();
const differenceAreas = [
    [92, 308, 111, 332],
    [296, 297, 360, 332],
    [422, 371, 422, 386],
    [422, 370, 475, 410],
    [441, 440, 466, 487],
    [432, 512, 451, 534],
    [411, 483, 438, 507],
    [347, 415, 368, 438],
    [233, 398, 264, 428],
    [240, 375, 252, 387],
    [144, 542, 204, 570],
    [79, 496, 104, 506],
    [71, 423, 98, 453],
    [134, 464, 159, 494],
    [310, 500, 341, 534],
    [291, 496, 304, 516],
    [390, 540, 413, 567],
    [292, 452, 307, 466],
    [248, 429, 262, 444],
    [59, 335, 80, 368],
    [130, 423, 150, 442],
    [200, 424, 223, 446],
    [150, 414, 170, 430],
    [229, 485, 248, 506]
];
let foundDifferences = [];
let startTime, timerId;

img.onload = function() {
    ctx.drawImage(img, 0, 0);
    startTime = new Date();
    updateTimer();
};
img.src = 'images/cropkatietest.png'; // Ensure this points to your image file

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    checkDifference(x, y);
});

function checkDifference(x, y) {
    for (let i = 0; i < differenceAreas.length; i++) {
        const [x1, y1, x2, y2] = differenceAreas[i];
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
            if (!foundDifferences.includes(i)) {
                foundDifferences.push(i);
                drawHighlight(x1, y1, x2, y2);
                infoDiv.textContent = `Difference found! Total found: ${foundDifferences.length}`;
                if (foundDifferences.length === differenceAreas.length) {
                    clearInterval(timerId);
                    infoDiv.textContent += " All differences found!";
                }
                return;
            }
        }
    }
}

function drawHighlight(x1, y1, x2, y2) {
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 5;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
}

function updateTimer() {
    timerId = setInterval(() => {
        const now = new Date();
        const elapsed = new Date(now - startTime);
        const minutes = elapsed.getUTCMinutes();
        const seconds = elapsed.getUTCSeconds();
        infoDiv.textContent = `Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}
