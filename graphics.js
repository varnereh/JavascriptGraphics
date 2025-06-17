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
    [0, 0, 1],
];

// Function to create a rotation matrix for z 3D transformations. Just matrix math
const rozMat = (angle) => { 
    return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ];
}

const rotXMat = (angle) => {
    return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]
}

const rotYMat = (angle) => {
    return [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ]
}

function multMat(m, v) {
    const { x, y, z } = v; // Destructures the vector v into x, y, z components
    // Multiplies a matrix m by a vector v
    return {
        x: m[0][0] * x + m[0][1] * y + m[0][2] * z,
        y: m[1][0] * x + m[1][1] * y + m[1][2] * z,
        z: m[2][0] * x + m[2][1] * y + m[2][2] * z
    }
}














const texture = new Image(); // Creates texture used later
texture.src = 'wallTex.jpg'; // Sets the source of the image



// Vertex class to represent a point in 3D space
class Vertex {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x; // X coordinate
        this.y = y; // Y coordinate
        this.z = z; // Z coordinate
    }

    draw() { // Method to draw the vertex
        ctx.beginPath(); // Begins a new path
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2); // Draws a circle at the vertex position
        ctx.fillStyle = "white"; // Sets the fill color to white
        ctx.fill(); // Fills the circle
    }
}


const P = []; // Array to hold vertices
P[0] = new Vertex(400, 200, 0); // Creates a vertex at the center of the canvas
P[1] = new Vertex(600, 200, 0); // Creates a vertex 100 pixels to the right of the center
P[2] = new Vertex(400, 400, 0); // Creates a vertex 100 pixels below the center
P[3] = new Vertex(600, 400, 0); // Creates a vertex 100 pixels to the left of the center



const engine = () => {
    angle += 0.02; // Increments the angle for rotation
    ctx.clearRect(0, 0, CW, CH); // Clears the canvas
    ctx.fillStyle = 'black'; // Sets the fill color to black for background
    ctx.fillRect(0, 0, CW, CH); // Fills the entire canvas with black


    for (let v of P) {
        let rotated = multMat(rotYMat(angle), v); // Rotates the vertex around the Y-axis
        let proj2D = multMat(proj, rotated); // Projects the 3D vertex onto the 2D canvas

        drawVertex(proj2D.x, proj2D.y)
    }


    requestAnimationFrame(engine); // Calls the engine function recursively to create an animation loop
}

engine(); // Starts the engine function