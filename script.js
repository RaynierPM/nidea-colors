(() => {
    document.addEventListener('DOMContentLoaded', () => {

        var mainPalette;
        const history = [];
        
        function main() {
            document.querySelector('#generator').addEventListener('click', generatePalette)
        }

        class Palette {
            constructor (lenght = 4, mode = 'random') {
                for (let i = 0; i < lenght; i++) 
                    this.colores.push(new Color(this.randomColor()));
            }

            colores = [];

            randomColor = () => (Math.round(Math.random() * parseInt('FFFFFF', 16))).toString(16);

            generateHtmlPalette(destinationElement) {
                destinationElement.innerHTML = '';
                destinationElement.classList.add('d-flex')

                this.colores.forEach(color => {
                    let colorDiv = document.createElement('div');
                    
                    if (window.innerWidth <= 768) {
                        colorDiv.style.width = (100/this.colores.length)*2 + '%';
                        colorDiv.style.height = '50%';                    

                    }else {
                        colorDiv.style.width = (100/this.colores.length) + '%';
                        colorDiv.style.height = '100%';                    

                    }

                    colorDiv.style.backgroundColor = color.getCssColor();

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
        



        main();

    })
})();