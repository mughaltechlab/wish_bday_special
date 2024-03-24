let highestZ = 1;

class Paper {

    // it tell us that are we holding our paper or not; mousedown
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

        // mousedown on .paper elements
        paper.addEventListener('mousedown',(e)=>{
            this.holdingPaper = true;
            
            paper.style.zIndex = highestZ;
            highestZ += 1;

            // check if right click mousebutton 
            if (e.button === 0) {
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                console.log(this.prevMouseX);
            }
            
        })


        // mousemove on document
        document.addEventListener('mousemove',(e)=>{

            this.mouseX = e.clientX
            this.mouseY = e.clientY

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            if (this.holdingPaper) {
                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform = `translate(${this.currentPaperX}px,${this.currentPaperY}px)`;            }
        })

        // mouseup on window
        window.addEventListener('mouseup',(e)=>{
            this.holdingPaper = false;
        })
    }
}


const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();

    p.init(paper);
})


// console.log(papers);