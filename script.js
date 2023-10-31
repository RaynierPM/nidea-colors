(() => {
    document.addEventListener('DOMContentLoaded', () => {

        var mainPalette;
        const history = [];
        
        const toast = new bootstrap.Toast(document.querySelector('#copyToast'))

        function main() {
            document.querySelector('#generator').addEventListener('click', generatePalette)
            document.querySelector('.mainCanva').addEventListener('click', copyColorCode)
        }

        class Palette {
            constructor (lenght = 4, mode = 'random') {
                for (let i = 0; i < lenght; i++) 
                    this.colores.push(new Color(this.randomColor()));
            }

            colores = [];

            randomColor = () => (Math.round(Math.random() * parseInt('FFFFFF', 16))).toString(16).padStart(6, 0);

            generateHtmlPalette(destinationElement) {
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
                    let colorName = document.createElement('span');
                    colorName.classList.add('colorName')

                    colorName.innerText = color.getCssColor();

                    colorDiv.appendChild(colorName)

                    destinationElement.appendChild(colorDiv);
                });
            }

        }

        class Color {
            constructor (color) {
                this.hexColor = color;
            }

            hexColor;

            getCssColor = () => `#${this.hexColor}`;
        }
            

        function generatePalette(event) {
            let canva = document.querySelector('.mainCanva');
            canva.classList.remove('d-none')
            mainPalette = new Palette();

            mainPalette.generateHtmlPalette(canva)
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
        



        main();

    })
})();