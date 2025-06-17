const cvs = document.querySelector('#c'); // Selects HTML element with id 'c'
const ctx = cvs.getContext('2d'); // Gets the 2D rendering context for the canvas

cvs.width = 1920; // Res
cvs.height = 1080;

const CW = cvs.width; // Canvas width
const CH = cvs.height; // Canvas height
const CW2 = CW / 2; // Half of canvas width
const CH2 = CH / 2; // Half of canvas height

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
P[0] = new Vertex(CW2, CH2, 0); // Creates a vertex at the center of the canvas
P[1] = new Vertex(CW2 + 100, CH2, 0); // Creates a vertex 100 pixels to the right of the center
P[2] = new Vertex(CW2, CH2 + 100, 0); // Creates a vertex 100 pixels below the center
P[3] = new Vertex(CW2 - 100, CH2, 0); // Creates a vertex 100 pixels to the left of the center



const engine = () => {
    ctx.clearRect(0, 0, CW, CH); // Clears the canvas
    ctx.fillStyle = 'black'; // Sets the fill color to black for background
    ctx.fillRect(0, 0, CW, CH); // Fills the entire canvas with black


    P.forEach((v) => v.draw()); // Draws each vertex in the P array


    requestAnimationFrame(engine); // Calls the engine function recursively to create an animation loop
}

engine(); // Starts the engine function