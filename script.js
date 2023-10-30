(() => {
    document.addEventListener('DOMContentLoaded', () => {

        // Document body inicialization
        document.body.style.display = 'flex';
        document.body.style.flexWrap = 'wrap';
        document.body.style.margin = '0';
        document.body.style.height = '100vh';
    
        document.body.innerHTML = '';
    
        let screenWidth = window.innerWidth, 
                screenHeight = window.innerHeight,
                X_QUANTITY = 10,
                SquareSideSize = screenWidth / X_QUANTITY,
                Y_QUANTITY = screenHeight / SquareSideSize;
            
        for (let i = 0; i < (X_QUANTITY * Y_QUANTITY); i++) {
        document.body.innerHTML += `<div
            style='width: ${SquareSideSize}px; 
            height: ${SquareSideSize}px'> </div>`;
        }
    
        function generateSquares(event) {
    
            if (event.which !== 13) return;
            console.log('enter')
            
            document.querySelectorAll('div')
                .forEach(elemento => randomBg(elemento))
        }
    
        async function randomBg(element) {
            let number = Math.round(Math.random() * 1000);
            element.style.backgroundColor = '#' + number.toString(16);
            
        }


        document.addEventListener('keydown', generateSquares)
    })
})();