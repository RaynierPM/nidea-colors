(() => {
    document.addEventListener('DOMContentLoaded', () => {

        // Document body inicialization
        document.body.style.display = 'flex';
        document.body.style.flexWrap = 'wrap';
        document.body.style.margin = '0';
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'hidden'

        var timer;
        
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

                const parpadeante = confirm("¿Desea el efecto de parpadeo?")
                
                canvaInitialization(X_QUANTITY, parpadeante);
                generateSquares();
                document.addEventListener('keydown', e => {if (e.which === 13) generateSquares()})

                window.addEventListener('resize', () => actualizarCanva(X_QUANTITY, parpadeante));
                break;
            }
        }
            
        function canvaInitialization(X_QUANTITY = 10, parpadeante = false) {
            document.body.innerHTML = '';

            let botonFlotante = document.createElement("span");
            botonFlotante.classList.add("floattingButton")
            botonFlotante.innerText = "Generar colores"
        
            document.body.appendChild(botonFlotante);
            botonFlotante.addEventListener('click', generateSquares)


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

                if (parpadeante) setInterval(() => {randomBg(node)}, (100 + Math.floor(Math.random() * 1500)))

                document.body.appendChild(node)
            }

            alert("Carga completa, (Presione ENTER para generar mas colores)");
        }

        function actualizarCanva(X_QUANTITY = 10, parpadeante) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                canvaInitialization(X_QUANTITY, parpadeante);
                generateSquares();
            }, 1000)
        }
    
        function generateSquares(event) {
            document.querySelectorAll('div')
                .forEach(elemento => randomBg(elemento))
        }
    
        async function randomBg(element) {
            let number = Math.round(Math.random() * parseInt('FFFFFF', 16));
            element.style.backgroundColor = '#' + number.toString(16);
            
        }


        main();

    })
})();