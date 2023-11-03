(() => {
    document.addEventListener('DOMContentLoaded', () => {

        var mainPalette;
        var id = 0;
        const history = [];
        const STORED_PALETTES = [];

        // Map -> for the Function paletteButtonDetecto
        const buttonsFunctions = new Map([
            ['eliminarPaleta', deleteHistoryLog], 
            ['guardarPaleta', savePalette]
        ]);
        
        const toast = new bootstrap.Toast(document.querySelector('#copyToast')),
            historySection = document.querySelector('.historial'),
            mainCanva = document.querySelector('.mainCanva'),
            fullScreenButton = document.querySelector('#expandirCanva'),
            fullScreenModal = document.querySelector('.fullScreen'),
            fullScreenCanva = document.querySelector('.fullScreen > .canva'),
            quantityInput = document.querySelector('#cantidad'),
            savedPalettesSection = document.querySelector('#paletasGuardadas')
        

        function main() {
            document.querySelector('#generator').addEventListener('click', drawPalettes)
            mainCanva.addEventListener('click', copyColorCode)

            document.querySelector('#limpiarHistorial').addEventListener('click', limpiarHistorial);
            historySection.addEventListener('click', swapToMain)
            historySection.addEventListener('click', paletteButtonHistoryDetectorByID)
            fullScreenButton.addEventListener('click', toggleFullScreen);
            fullScreenModal.addEventListener('click', toggleFullScreen);
            savedPalettesSection.addEventListener('click', storedToMain);

            loadSavedPalettes();
            

        }

        class Palette {
            constructor (lenght = 4, defaultColors = [], mode = 'random') {
                for (let i = 0; i < lenght; i++) 
                    this.colores.push(new Color(this.randomColor()));

                for(let color of defaultColors) this.colores.push(new Color(color));

                this.id = id++;
            }

            colores = [];
            id;

            randomColor = () => (Math.round(Math.random() * parseInt('FFFFFF', 16))).toString(16).padStart(6, 0);

            generateHtmlPalette(destinationElement, {withTags = true, withButtons = false}) {

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

                // add buttons to history-Log
                if (withButtons) this.addButton(destinationElement, 'bi-x-lg', {top: '0', right: '0'}, 'eliminarPaleta');
                if (withButtons) this.addButton(destinationElement, 'bi-box-arrow-down', {left: '0', top: '0'}, 'guardarPaleta');

            }

            addColorTag(colortag, destinationElement) {
                let colorName = document.createElement('span');
                colorName.classList.add('colorName')

                colorName.innerText = colortag;

                destinationElement.appendChild(colorName)
            }

            addButton(destinationElement, icon, {top = 'unset', left ='unset', right = 'unset', bottom = 'unset'}, idName) {
                let deleteButton = document.createElement('i')
                deleteButton.classList.add('bi', icon, 'position-absolute', 'rounded-circle', 'd-flex', 'justify-content-center', 'align-items-center', 'p-1')
                deleteButton.style.backgroundColor = '#0003';
                deleteButton.style.color = 'white';
                deleteButton.style.fontWeight = 'bold';

                // Position
                deleteButton.style.top = top;
                deleteButton.style.left = left;
                deleteButton.style.right = right;
                deleteButton.style.bottom = bottom;

                deleteButton.style.width = '30px'
                deleteButton.style.height = '30px'


                // deleteButton.id = 'eliminarPaleta'
                deleteButton.id = idName
                

                destinationElement.appendChild(deleteButton);
            }

            static Fromjson(json = {}) {
                const {colores} = json;

                return new Palette(0, colores);
            }

            toJson() {
                const colores = [];
                for (let color of this.colores) colores.push(color.hexColor);

                return ({colores})
            }
        }   

        class Color {
            constructor (color) {
                this.hexColor = color;
            }

            hexColor;

            getCssColor = () => `#${this.hexColor}`;
        }
            

        function generatePalette(palette = mainPalette, destinationElement = mainCanva, options = {withButtons: false, withTags: true}) {
            destinationElement.classList.remove('d-none')
            
            palette.generateHtmlPalette(destinationElement, options)
        }

        function drawPalettes() {
            if (mainPalette && !STORED_PALETTES.includes(mainPalette)) {
                history.push(mainPalette);


                // add to the template
                generateCanvaWithPalette(historySection, mainPalette, 'historyCanva')

            }

            mainPalette = new Palette(Number(quantityInput.value));
            generatePalette();

        }

        function generateCanvaWithPalette(destinationElement, palette, canvaClass = '', options = {withButtons: true, withTags: false}) {
            let canva = document.createElement('div');
            canva.classList.add(canvaClass, 'canva');

            palette.generateHtmlPalette(canva, options);

            destinationElement.appendChild(canva);
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
            if (!event.target.parentElement.classList.contains('canva') 
                || event.target.id !== '') return;

            let canva = event.target.parentElement,
                id = Number(canva.getAttribute('paletteId')),
                selectedPalleteIndex = history.indexOf(history.find(palette => palette.id === id));

                let tempPalette = history[selectedPalleteIndex];

                if (!STORED_PALETTES.includes(mainPalette)) history[selectedPalleteIndex] = mainPalette;
                mainPalette = tempPalette;

                if (history[selectedPalleteIndex] == mainPalette) deleteHistoryLog(canva)

                mainPalette.generateHtmlPalette(mainCanva, {withTags: true, withButtons: false})
                history[selectedPalleteIndex].generateHtmlPalette(canva, {withTags: false, withButtons: true})
        }

        // function to put the stored palette to the main canva
        function storedToMain(event) {
            if (!event.target.parentElement.classList.contains('canva') 
                || event.target.id !== '') return;

            let canva = event.target.parentElement,
                id = Number(canva.getAttribute('paletteId')),
                selectedPaletteIndex = STORED_PALETTES.indexOf(STORED_PALETTES.find(palette => palette.id === id))

            if (mainPalette && !history.includes(mainPalette) && !STORED_PALETTES.includes(mainPalette)) {
                history.push(mainPalette)
                
                generateCanvaWithPalette(historySection, mainPalette, 'historyCanva')
            }

            mainPalette = STORED_PALETTES[selectedPaletteIndex];
            mainPalette.generateHtmlPalette(mainCanva, {withButtons: false, withTags: true})
        }

        function toggleFullScreen() {
            if (!mainPalette) return;

            fullScreenModal.classList.toggle('d-none')
            fullScreenModal.classList.toggle('d-flex')
            if (fullScreenModal.classList.contains('d-flex')) mainPalette.generateHtmlPalette(fullScreenCanva, {withTags: false, withButtons: false})
        }

        function paletteButtonHistoryDetectorByID(event) {
            if (!buttonsFunctions.get(event.target.id)) return;
            
            buttonsFunctions.get(event.target.id)(event.target.parentElement);
        }

        function deleteHistoryLog(paleta) {
            let id = Number(paleta.getAttribute('paletteId')) 

            // Delete from history
            history.slice(history.indexOf(history.find(palette => palette.id === id)))

            paleta.parentElement.removeChild(paleta);
        }

        // Start - Functions to  LocalStorage managment

        function loadSavedPalettes() {
            try {

                let palettes = JSON.parse(localStorage.getItem('palettes'));

                for (let jsonPalette of palettes) {
                    let palette = Palette.Fromjson(jsonPalette)
                    STORED_PALETTES.push(palette);

                    generateCanvaWithPalette(savedPalettesSection, palette, 'storedCanva', {withButtons: false, withTags: false})                    
                }

                if (palettes.lenght < 1) {
                    savedPalettesSection.innerHTML += `<h3 class='w-100 text-center'>No hay paletas guardadas permanentemente </h3>`;
                }



            }catch(err) {
                savedPalettesSection.innerHTML += `<h3 class='w-100 text-center' style="font-size: 1em">No hay paletas guardadas permanentemente </h3>`;
            }

        }
        // End - LocalStorage managment

        function savePalette(paleta) {
            let selectedPallete = history.find(palette => palette.id === Number(paleta.getAttribute("paletteId")))       
            
            // Draw visually the selected palette
            if (STORED_PALETTES.length === 0) savedPalettesSection.innerHTML = '';
            // If the palette was added dont do anything
            if (STORED_PALETTES.includes(selectedPallete)) return;
            generateCanvaWithPalette(savedPalettesSection, selectedPallete, 'storedCanva', {withButtons: false, withTags: false})

            const jsonStoredPalettes = []

            // save the selectedPalette
            STORED_PALETTES.push(selectedPallete)
            
            for(let palette of STORED_PALETTES) {
                jsonStoredPalettes.push(palette.toJson())
            }

            
            localStorage.setItem('palettes', JSON.stringify(jsonStoredPalettes))

        }


        main();

    })
})();