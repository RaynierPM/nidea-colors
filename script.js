(() => {
    document.addEventListener('DOMContentLoaded', () => {

        var mainPalette;
        var id = 0;
        const history = [];
        
        const toast = new bootstrap.Toast(document.querySelector('#copyToast'))

        const historySection = document.querySelector('.historial')
        const mainCanva = document.querySelector('.mainCanva')
        

        function main() {
            document.querySelector('#generator').addEventListener('click', drawPalettes)
            mainCanva.addEventListener('click', copyColorCode)

            document.querySelector('#limpiarHistorial').addEventListener('click', limpiarHistorial);
            historySection.addEventListener('click', swapToMain)

        }

        class Palette {
            constructor (lenght = 4, mode = 'random') {
                for (let i = 0; i < lenght; i++) 
                    this.colores.push(new Color(this.randomColor()));

                this.id = id++;
            }

            colores = [];
            id;

            randomColor = () => (Math.round(Math.random() * parseInt('FFFFFF', 16))).toString(16).padStart(6, 0);

            generateHtmlPalette(destinationElement, withTags = true) {

                // The destinationElement must has de class 'canva'
                if  (!destinationElement.classList.contains('canva')) return;

                destinationElement.innerHTML = '';
                destinationElement.classList.add('d-flex')

                this.colores.forEach(color => {
                    let colorDiv = document.createElement('div');
                    colorDiv.classList.add('paletteColor')
                    
                    if (window.innerWidth <= 768) {
                        colorDiv.style.width = (100/this.colores.length)*2 + '%';
                        colorDiv.style.height = '50%';                    

                    }else {
                        colorDiv.style.width = (100/this.colores.length) + '%';
                        colorDiv.style.height = '100%';                    

                    }

                    colorDiv.style.backgroundColor = color.getCssColor();
                    
                    // ColorName tag
                    if (withTags) this.addColorTag(color.getCssColor(), colorDiv)
                    destinationElement.appendChild(colorDiv);
                    destinationElement.setAttribute('paletteId', this.id)
                });
            }

            addColorTag(colortag, destinationElement) {
                let colorName = document.createElement('span');
                colorName.classList.add('colorName')

                colorName.innerText = colortag;

                destinationElement.appendChild(colorName)
            }

        }

        class Color {
            constructor (color) {
                this.hexColor = color;
            }

            hexColor;

            getCssColor = () => `#${this.hexColor}`;
        }
            

        function generatePalette(palette = mainPalette, destinationElement = mainCanva) {
            destinationElement.classList.remove('d-none')
            
            palette.generateHtmlPalette(destinationElement, destinationElement.classList.contains('mainCanva'))
        }

        function drawPalettes() {
            if (mainPalette) {
                history.push(mainPalette);
                let newHistoryCanva = document.createElement('div');

                newHistoryCanva.classList.add('historyCanva','canva')

                generatePalette(mainPalette, newHistoryCanva)

                // agregar al template
                historySection.appendChild(newHistoryCanva)

            }
            mainPalette = new Palette();
            generatePalette();

        }

        function copyColorCode(event) {
            if (! event.target.classList.contains('colorName')) return;

            let colorTag = event.target,
                range = document.createRange(),
                selection = window.getSelection();

            range.selectNode(colorTag)

            selection.removeAllRanges();
            selection.addRange(range)

            // give color to ToastColorExample
            document.querySelector('#colorcitoExample').style.backgroundColor = colorTag.innerText

            try {
                document.execCommand("copy");
                toast.show()

            }catch(err) {
                console.log(err)

            }

            selection.removeAllRanges();
            
        } 


        function limpiarHistorial() {
            history.slice(0, 0)
            historySection.innerHTML = '';
        }
        
        function swapToMain(event) {
            if (!event.target.parentElement.classList.contains('canva')) return;

            let canva = event.target.parentElement,
                id = Number(canva.getAttribute('paletteId')),
                selectedPalleteIndex = history.indexOf(history.find(palette => palette.id === id));

                let tempPalette = history[selectedPalleteIndex];

                history[selectedPalleteIndex] = mainPalette;
                mainPalette = tempPalette;

                mainPalette.generateHtmlPalette(mainCanva, true)
                history[selectedPalleteIndex].generateHtmlPalette(canva, false)
        }



        main();

    })
})();