(() => {
    document.addEventListener('DOMContentLoaded', () => {

        // Document body inicialization
        document.body.style.display = 'flex';
        document.body.style.flexWrap = 'wrap';
        document.body.style.margin = '0';
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden'
        function main() {
            while (true) {
            
                const response = prompt("Inserte el numero de cuadros en horizontal"),
                    X_QUANTITY = Number(response);

                if (!response) {
                    alert("Que pena que no quiera generar nada, si cambia de opinion, recargue la pagina")
                    break;
                }

                if (isNaN(X_QUANTITY)) {
                    alert('Inserte un numero valido');
                    continue;
                }
                canvaInitialization(X_QUANTITY);
                generateSquares();
                document.addEventListener('keydown', generateSquares)
                window.addEventListener('resize', () => actualizarCanva(X_QUANTITY));
                break;
            }
        }
            
        function canvaInitialization(X_QUANTITY = 10) {
            document.body.innerHTML = '';
        
            let screenWidth = window.innerWidth, 
                    screenHeight = window.innerHeight,
                    SquareSideSize = Math.floor(screenWidth / X_QUANTITY),
                    Y_QUANTITY = screenHeight / SquareSideSize;
                
            for (let i = 0; i < (X_QUANTITY * Y_QUANTITY); i++) {
                // document.body.innerHTML += `<div
                //     style='width: ${SquareSideSize}px; 
                //     height: ${SquareSideSize}px'> </div>`;
                let node = document.createElement('div');
                node.style.width = SquareSideSize+'px';
                node.style.height = SquareSideSize+'px';

                document.body.appendChild(node)
            }

            alert("Carga completa");
        }

        function actualizarCanva() {
            let timer;
            clearTimeout(timer)
            timer = setTimeout(() => {
                canvaInitialization();
            }, 500)
        }
    
        function generateSquares(event) {
    
            if (!event || event.which === 13) {
                document.querySelectorAll('div')
                    .forEach(elemento => randomBg(elemento))
            }
            
        }
    
        async function randomBg(element) {
            let number = Math.round(Math.random() * parseInt('FFFFFF', 16));
            element.style.backgroundColor = '#' + number.toString(16);
            
        }


        main();

    })
})();