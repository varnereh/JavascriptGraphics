const cvs = document.querySelector('#c'); // Selects HTML element with id 'c'
const ctx = cvs.getContext('2d'); // Gets the 2D rendering context for the canvas

cvs.width = 1080; // Res
cvs.height = 620;

const CW = cvs.width; // Canvas width
const CH = cvs.height; // Canvas height
const CW2 = CW / 2; // Half of canvas width
const CH2 = CH / 2; // Half of canvas height

// --------------------------------------------------------------Matrix math---------------------------------------------------
let angle = 0; // Initial angle for rotation

// Projection matrix for 3D to 2D transformation
const proj = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];

// Function to create a rotation matrix for z 3D transformations. Just matrix math
const rotZMat = (angle) => {
    return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0 , 0, 1]
    ];
}

const rotXMat = (angle) => {
    return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0 , Math.sin(angle), Math.cos(angle)]
    ];
}

const rotYMat = (angle) => {
    return [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ];
}

function multMat(matrix, vertex) {
    const x = vertex.x;
    const y = vertex.y;
    const z = vertex.z;

    return {
        x: matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z,
        y: matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z,
        z: matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z
    };
}




//const texture = new Image(); // Creates texture used later
//texture.src = 'wallTex.jpg'; // Sets the source of the image



// Vertex class to represent a point in 3D space
class Vertex {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x; // X coordinate
        this.y = y; // Y coordinate
        this.z = z; // Z coordinate
    }
}
const drawVertex = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "white";
    ctx.stroke();
}


const P = []; // Array to hold vertices
const center = new Vertex(CW2, CH2, 0); // Creates a center vertex at the middle of the canvas

const init = () => {
    P[0] = new Vertex(400, 200, -100);
    P[1] = new Vertex(600, 200, -100);
    P[2] = new Vertex(400, 400, -100);
    P[3] = new Vertex(600, 400, -100);
    P[4] = new Vertex(400, 200, 100);
    P[5] = new Vertex(600, 200, 100);
    P[6] = new Vertex(400, 400, 100);
    P[7] = new Vertex(600, 400, 100);
}

const T = [
    [0, 1, 2], [1, 3, 2],
    [5, 4, 7], [4, 6, 7],
    [4, 0, 6], [0, 2, 6],
    [1, 5, 3], [5, 7, 3],
    [4, 5, 0], [5, 1, 0],
    [2, 3, 6], [3, 7, 6],
];

const engine = () => {
    angle += 0.02;

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    const projected = [];

    for (let v of P) {
        let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z);
        let rotated = multMat(rotYMat(angle), translated);
        rotated = multMat(rotXMat(angle), rotated);
        rotated = multMat(rotZMat(angle), rotated);
        let movedBack = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z);
        let proj2D = multMat(proj, movedBack);
        
        drawVertex(proj2D.x, proj2D.y);
        projected.push(proj2D);
    }

    for(let t of T) {
        const p1 = projected[t[0]];
        const p2 = projected[t[1]];
        const p3 = projected[t[2]];

        drawLine(p1.x, p1.y, p2.x, p2.y);
        drawLine(p2.x, p2.y, p3.x, p3.y);
        drawLine(p3.x, p3.y, p1.x, p1.y);
    }
    requestAnimationFrame(engine);
}

init();
engine();