<div id="scDiv" class="hidden">
       <h2>Escribe tu código JavaScript:</h2>
    
    <!-- El textarea donde se escribe el código -->
    <textarea id="codigoBus" rows="10" cols="30" >
function saludar(nombre) {
    return "¡Hola, " + nombre + "!";
}

saludar("Mundo");
    </textarea>

    <button onclick="ejecutarCodigo()">Ejecutar Código</button>

    <h3>Resultado:</h3>
    <div id="output">El resultado aparecerá aquí...</div>

    <script>
        function ejecutarCodigo() {
            const codigo = document.getElementById('codigoBus').value;
            const outputDiv = document.getElementById('output');
            
            try {
                // eval() ejecuta el texto del textarea como código JavaScript real
                const resultado = eval(codigo); 
                
                // Mostramos el resultado en el div
                outputDiv.style.color = "black";
                outputDiv.textContent = resultado !== undefined ? resultado : "Código ejecutado con éxito (sin retorno).";
            } catch (error) {
                // Si hay un error de sintaxis o de ejecución, lo capturamos
                outputDiv.style.color = "red";
                outputDiv.textContent = "Error: " + error.message;
            }
        }
        function sumar(a,b) {
             return `¡Hola, " ${a + b} +"!"`;
        }

    </script>
</div>