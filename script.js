(() => {
    document.addEventListener('DOMContentLoaded', () => {

        var mainPalette;
        var id = 0;
        const history = [],
            STORED_PALETTES = [];

        // Map -> for the Function paletteButtonDetecto
        const buttonsFunctions = new Map([
            ['eliminarPaleta', deleteHistoryLog], 
            ['guardarPaleta', savePalette],
            ['noGuardarPaleta', deleteSavedPalettes]
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

            document.querySelector('#limpiarHistorial').addEventListener('click', clearHistoryLogs);
            historySection.addEventListener('click', swapToMain)
            historySection.addEventListener('click', paletteButtonHistoryDetectorByID)
            mainCanva.addEventListener('click', () => {
                if (event.target.id === 'guardarPaleta' && mainPalette) savePaletteFromMain();
            })
            fullScreenButton.addEventListener('click', () => {toggleFullScreen(mainPalette)});
            fullScreenModal.addEventListener('click', () => {toggleFullScreen()});
            fullScreenModal.addEventListener('click', copyColorCode)
            savedPalettesSection.addEventListener('click', e => {
                if (!e.target.parentElement.classList.contains('canva')
                    || e.target.id !== '') return;
                let canva = e.target.parentElement,
                    id = canva.getAttribute('paletteId'),
                    palette = STORED_PALETTES.find(pal => pal.id === Number(id))

                toggleFullScreen(palette);
            });
            savedPalettesSection.addEventListener('click', paletteButtonHistoryDetectorByID)

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

            generateHtmlPalette(destinationElement, options =  {withTags: true, withDelete: false, withSave: true, withUnsave: false}) {
                const {withDelete, withSave, withTags, withUnsave} = options;
                // The destinationElement must has de class 'canva'
                if  (!destinationElement.classList.contains('canva')) return;

                destinationElement.innerHTML = '';
                destinationElement.classList.add('d-flex')


                this.colores.forEach((color, index) => {
                    let colorDiv = document.createElement('div');
                    colorDiv.classList.add('paletteColor')
                    
                    if (this.colores.length === 3) {
                        colorDiv.style.width = "100%";
                        colorDiv.style.height = "33.3%";
                    }else {
                        colorDiv.style.width = this.colores.length % 2 === 1 && index === this.colores.length-1?
                             (100/ Math.ceil(this.colores.length/2))*2 + '%' : 
                             (100/ Math.ceil(this.colores.length/2)) + '%' ;
    
                        colorDiv.style.height = this.colores.length === 1? '100%' : '50%';  
                    }


                    colorDiv.style.backgroundColor = color.getCssColor();
                    
                    // ColorName tag
                    if (withTags) this.addColorTag(color.getCssColor(), colorDiv)

                    
                    destinationElement.appendChild(colorDiv);
                    destinationElement.setAttribute('paletteId', this.id)
                });

                // add buttons to history-Log
                if (withDelete) this.addButton(destinationElement, 'bi-x-lg', {top: '0', right: '0'}, 'eliminarPaleta');
                if (withSave) this.addButton(destinationElement, 'bi-box-arrow-down', {left: '0', top: '0'}, 'guardarPaleta');
                if (withUnsave) this.addButton(destinationElement, 'bi-box-arrow-up', {left: '0', top: '0'}, 'noGuardarPaleta')

            }

            addColorTag(colortag, destinationElement) {
                let colorName = document.createElement('span');
                colorName.classList.add('colorName')

                colorName.innerText = colortag;

                destinationElement.appendChild(colorName)
            }

            addButton(destinationElement, icon, {top = 'unset', left ='unset', right = 'unset', bottom = 'unset'}, idName) {
                let newButton = document.createElement('i')
                newButton.classList.add('bi', icon, 'position-absolute', 'rounded-circle', 'd-flex', 'justify-content-center', 'align-items-center', 'p-1')
                newButton.style.backgroundColor = '#0003';
                newButton.style.color = 'white';
                newButton.style.fontWeight = 'bold';

                // Position
                newButton.style.top = top;
                newButton.style.left = left;
                newButton.style.right = right;
                newButton.style.bottom = bottom;

                newButton.style.width = '30px'
                newButton.style.height = '30px'

                newButton.style.cursor = "pointer";

                // newButton.id = 'eliminarPaleta'
                newButton.id = idName
                

                destinationElement.appendChild(newButton);
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
            

        function generateMainPalette(palette = mainPalette, destinationElement = mainCanva) {
            destinationElement.classList.remove('d-none')
            
            palette.generateHtmlPalette(destinationElement)
        }

        function drawPalettes() {
            let colorsQuantity = Number(quantityInput.value);

            if (colorsQuantity > 10) {alert('Se ha delimitado a 10 colores por paleta'); return;}

            if (colorsQuantity === 0) return
            if (mainPalette && !STORED_PALETTES.includes(mainPalette)) {
                history.push(mainPalette);


                // add to the template
                generateCanvaWithPalette(historySection, mainPalette, 'historyCanva')

            }

            mainPalette = new Palette(Math.abs(colorsQuantity));
            generateMainPalette();

        }

        function generateCanvaWithPalette(destinationElement, palette, canvaClass = '', options = {withDelete: true, withSave: true, withTags: false}) {
            let canva = document.createElement('div');
            canva.classList.add(canvaClass, 'canva');

            palette.generateHtmlPalette(canva, options);

            destinationElement.appendChild(canva);
        }

        function copyColorCode(event) {
            if (!event.target.classList.contains('colorName')) return;

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


        function clearHistoryLogs() {
            history.splice(0, history.length)
            historySection.innerHTML = '';

            // mainCanva.innerHTML = '';
            // mainPalette = undefined;
        }
        
        function swapToMain(event) {
            if (!event.target.parentElement.classList.contains('canva') 
                || event.target.id !== '') return;

            let canva = event.target.parentElement,
                id = Number(canva.getAttribute('paletteId')),
                selectedPalleteIndex = history.indexOf(history.find(palette => palette.id === id));

                let tempPalette = history[selectedPalleteIndex];

                if (mainPalette && !STORED_PALETTES.includes(mainPalette)) history[selectedPalleteIndex] = mainPalette;
                mainPalette = tempPalette;

                if (history[selectedPalleteIndex] == mainPalette) {
                    deleteHistoryLog(canva)
                }else {
                    history[selectedPalleteIndex].generateHtmlPalette(canva, {withTags: false, withSave: true, withDelete: true})
                }

                mainPalette.generateHtmlPalette(mainCanva, {withTags: true, withDelete: false, withSave: true})
        }

        // function to put the stored palette to the main canva
        /* 
            --- Deprecated code ---
            Was used to swap between mainCanva and savedPalettes, and is not used anymore
        */
        function storedToMain(event) {
            if (!event.target.parentElement.classList.contains('canva') 
                || event.target.id !== '') return;

            let canva = event.target.parentElement,
                id = Number(canva.getAttribute('paletteId')),
                selectedPaletteIndex = STORED_PALETTES.indexOf(STORED_PALETTES.find(palette => palette.id === id))

            if (mainPalette && !STORED_PALETTES.includes(mainPalette)) {
                history.push(mainPalette)
                
                generateCanvaWithPalette(historySection, mainPalette, 'historyCanva')
            }

            mainPalette = STORED_PALETTES[selectedPaletteIndex];
            mainPalette.generateHtmlPalette(mainCanva, {withDelete: false, withSave: true, withTags: true})
        }

        function toggleFullScreen(palette) {
            if (palette && palette.constructor.name !== 'Palette') return;


            fullScreenModal.classList.toggle('d-none')
            fullScreenModal.classList.toggle('d-flex')
            if (fullScreenModal.classList.contains('d-flex')) palette.generateHtmlPalette(fullScreenCanva, {withTags: true, withSave: false, withDelete: false})
        }

        function paletteButtonHistoryDetectorByID(event) {
            let functionTrigger = buttonsFunctions.get(event.target.id); 
            if (!functionTrigger) return;
            
            functionTrigger(event.target.parentElement);
        }

        function deleteHistoryLog(paleta) {
            let id = Number(paleta.getAttribute('paletteId')) 

            // Delete from history
            history.splice(history.indexOf(history.find(palette => palette.id === id)), 1)

            paleta.parentElement.removeChild(paleta);
        }

        function deleteSavedPalettes(paleta) {
            let id = Number(paleta.getAttribute('paletteId')),
                selectedPalette = STORED_PALETTES.find(palette => palette.id === id)

            // Delete from history
            STORED_PALETTES.splice(STORED_PALETTES.indexOf(selectedPalette), 1)   
            
            if (!mainPalette) {
                mainPalette = selectedPalette;
                mainPalette.generateHtmlPalette(mainCanva)
            }else {
                history.push(selectedPalette);
                if (mainPalette != selectedPalette) generateCanvaWithPalette(historySection, selectedPalette, 'historyCanva', {withDelete: true, withSave: true, withTags: false})
            }

            paleta.parentElement.removeChild(paleta);

            if (STORED_PALETTES.length === 0) 
                savedPalettesSection.innerHTML += `<h3 class='w-100 text-center' style="font-size: 1em">No hay paletas guardadas permanentemente </h3>`;

            saveOnLocalStorage();
        }

        // Start - Functions to  LocalStorage managment

        function loadSavedPalettes() {
            try {

                let palettes = JSON.parse(localStorage.getItem('palettes'));

                let length = 0;

                for (let jsonPalette of palettes) {
                    length++
                    let palette = Palette.Fromjson(jsonPalette)
                    STORED_PALETTES.push(palette);

                    generateCanvaWithPalette(savedPalettesSection, palette, 'storedCanva', {withUnsave: true, withSave: false, withTags: false})                    
                }

                if (palettes.length === 0) 
                    savedPalettesSection.innerHTML += `<h3 class='w-100 text-center' style="font-size: 1em">No hay paletas guardadas permanentemente </h3>`;



            }catch(err) {
                savedPalettesSection.innerHTML += `<h3 class='w-100 text-center' style="font-size: 1em">No hay paletas guardadas permanentemente </h3>`;
            }

        }
        
        function savePalette(paleta) {
            // If doesn't exists in the historyArray is because the selected palette is the main
            let selectedPallete = history.find(palette => palette.id === Number(paleta.getAttribute("paletteId")))
            
            // Draw visually the selected palette
            if (STORED_PALETTES.length === 0) savedPalettesSection.innerHTML = '';
            // If the palette was added dont do anything
            if (STORED_PALETTES.includes(selectedPallete)) return;
            
            generateCanvaWithPalette(savedPalettesSection, selectedPallete, 'storedCanva', {withUnsave: true, withSave: false, withTags: false})
            
            // save the selectedPalette into the STORED_palettes
            STORED_PALETTES.push(selectedPallete)
            
            saveOnLocalStorage();

            deleteHistoryLog(paleta)
            
        }

        function savePaletteFromMain() {
            // Clear the 'empty' section
            if (STORED_PALETTES.length === 0) savedPalettesSection.innerHTML = '';

            if (STORED_PALETTES.includes(mainPalette)) return;
            
            generateCanvaWithPalette(savedPalettesSection, mainPalette, 'storedCanva', {withUnsave: true, withSave: false, withTags: false})
            
            STORED_PALETTES.push(mainPalette)
            mainPalette = undefined;

            saveOnLocalStorage();
            mainCanva.innerHTML = ''

        }

        function saveOnLocalStorage() {
            const jsonStoredPalettes = []

            for(let palette of STORED_PALETTES) {
                jsonStoredPalettes.push(palette.toJson())
            }
            
            localStorage.setItem('palettes', JSON.stringify(jsonStoredPalettes))
        }
        

        
        // End - LocalStorage managment
        main();

    })
})();