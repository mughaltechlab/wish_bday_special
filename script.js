let highestZ = 1;

class Paper {

    // it tell us that are we holding our paper or not; mousedown or touchstart
    holdingPaper = false;

    // mouse positions, previous and current
    prevMouseX = 0;
    prevMouseY = 0;
    // current mouse pos
    mouseX = 0;     
    mouseY = 0;

    // paper current positions 
    currentPaperX = 0;
    currentPaperY = 0;

    // make velocity variable for moving animation speed
    velocityX = 0;
    velocityY = 0;
    
    init (paper) {

        // mousedown or touchstart on .paper elements
        paper.addEventListener('mousedown',(e)=>{
            this.holdingPaper = true;
            this.handleStart(e.clientX, e.clientY, paper);
        })

        // touchstart on .paper elements
        paper.addEventListener('touchstart',(e)=>{
            const touch = e.touches[0];
            this.holdingPaper = true;
            this.handleStart(touch.clientX, touch.clientY, paper);
        })

        // mousemove or touchmove on document
        document.addEventListener('mousemove',(e)=>{
            this.handleMove(e.clientX, e.clientY, paper);
        })

        document.addEventListener('touchmove',(e)=>{
            const touch = e.touches[0];
            this.handleMove(touch.clientX, touch.clientY, paper);
        })

        // mouseup or touchend on window
        window.addEventListener('mouseup',(e)=>{
            this.holdingPaper = false;
        })

        window.addEventListener('touchend',(e)=>{
            this.holdingPaper = false;
        })
    }

    // handle start of dragging or touching
    handleStart(x, y, paper) {
        paper.style.zIndex = highestZ;
        highestZ += 1;

        this.prevMouseX = this.mouseX = x;
        this.prevMouseY = this.mouseY = y;
    }

    // handle move during dragging or touching
    handleMove(x, y, paper) {
        this.mouseX = x;
        this.mouseY = y;

        this.velocityX = this.mouseX - this.prevMouseX;
        this.velocityY = this.mouseY - this.prevMouseY;

        if (this.holdingPaper) {
            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translate(${this.currentPaperX}px,${this.currentPaperY}px)`;
        }
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
})
