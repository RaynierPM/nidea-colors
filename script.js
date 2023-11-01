(() => {
    document.addEventListener('DOMContentLoaded', () => {

        var mainPalette;
        var id = 0;
        const history = [];
        
        const toast = new bootstrap.Toast(document.querySelector('#copyToast')),
            historySection = document.querySelector('.historial'),
            mainCanva = document.querySelector('.mainCanva'),
            fullScreenButton = document.querySelector('#expandirCanva'),
            fullScreenModal = document.querySelector('.fullScreen'),
            fullScreenCanva = document.querySelector('.fullScreen > .canva'),
            quantityInput = document.querySelector('#cantidad')
        

        function main() {
            document.querySelector('#generator').addEventListener('click', drawPalettes)
            mainCanva.addEventListener('click', copyColorCode)

            document.querySelector('#limpiarHistorial').addEventListener('click', limpiarHistorial);
            historySection.addEventListener('click', swapToMain)
            historySection.addEventListener('click', deleteHistoryLog)
            fullScreenButton.addEventListener('click', toggleFullScreen);
            fullScreenModal.addEventListener('click', toggleFullScreen);

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
                    

                    colorDiv.style.width = (100/ Math.ceil(this.colores.length/2)) + '%';
                    colorDiv.style.height = '50%';  

                    colorDiv.style.backgroundColor = color.getCssColor();
                    
                    // ColorName tag
                    if (withTags) this.addColorTag(color.getCssColor(), colorDiv)

                    
                    destinationElement.appendChild(colorDiv);
                    destinationElement.setAttribute('paletteId', this.id)
                });

                // add deleteButton to history-Log
                if (!withTags) this.addDeleteButton(destinationElement);
            }

            addColorTag(colortag, destinationElement) {
                let colorName = document.createElement('span');
                colorName.classList.add('colorName')

                colorName.innerText = colortag;

                destinationElement.appendChild(colorName)
            }

            addDeleteButton(destinationElement) {
                let deleteButton = document.createElement('i')
                deleteButton.classList.add('bi', 'bi-x-lg', 'position-absolute', 'top-0', 'end-0', 'rounded-circle', 'd-flex', 'justify-content-center', 'align-items-center', 'p-1')
                deleteButton.style.backgroundColor = '#0003';
                deleteButton.style.color = 'white';
                deleteButton.style.fontWeight = 'bold';

                deleteButton.style.width = '30px'
                deleteButton.style.height = '30px'


                deleteButton.id = 'eliminarPaleta'

                destinationElement.appendChild(deleteButton);
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

            mainPalette = new Palette(Number(quantityInput.value));
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
            console.log(event.target.id === "eliminarPaleta")
            console.log(!event.target.parentElement.classList.contains('canva'))
            if (!event.target.parentElement.classList.contains('canva') 
                || event.target.id === 'eliminarPaleta') return;

            let canva = event.target.parentElement,
                id = Number(canva.getAttribute('paletteId')),
                selectedPalleteIndex = history.indexOf(history.find(palette => palette.id === id));

                let tempPalette = history[selectedPalleteIndex];

                history[selectedPalleteIndex] = mainPalette;
                mainPalette = tempPalette;

                mainPalette.generateHtmlPalette(mainCanva, true)
                history[selectedPalleteIndex].generateHtmlPalette(canva, false)
        }

        function toggleFullScreen() {
            if (!mainPalette) return;

            fullScreenModal.classList.toggle('d-none')
            fullScreenModal.classList.toggle('d-flex')
            if (fullScreenModal.classList.contains('d-flex')) mainPalette.generateHtmlPalette(fullScreenCanva, false)
        }

        function deleteHistoryLog(event = document.querySelector()) {
            if (event.target.id !== 'eliminarPaleta') return;
            let paleta = event.target.parentElement,
                id = Number(paleta.getAttribute('paletteId'))

            // Delete from history
            history.slice(history.indexOf(history.find(palette => palette.id === id)))

            paleta.parentElement.removeChild(paleta);
        }


        main();

    })
})();