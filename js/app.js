let todosProductos = [];
let idn=[];
// funcion para cargar los datos locales 
function carga() {
  const storedIdn = localStorage.getItem('idn');
  if (storedIdn) {
    idn = JSON.parse(storedIdn); // Pasar de json a array
  }
}

// funcion para guardar la variable en los datos locales 
function guardar() {
  localStorage.setItem('idn', JSON.stringify(idn)); // convertir la array en json
}
refrescar();
function refrescar(){
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    // Compile la plantilla de manillares 
    const template = Handlebars.compile(document.getElementById('template-handlebars').innerHTML);
    // Almacenar productos a partir de datos
    todosProductos = data.products;

    // Representar la lista de productos inicial
    
      const productosFiltrados = todosProductos.filter(function(product){
        return idn.includes(product.filterId);
      }); 
       //comprueba que si este vacio la array renderice todos los productos
      if(!productosFiltrados.length){
        render (todosProductos);
      }else{
      //si la array no esta vacia que renderice
      render(productosFiltrados);
      };
    // Función de renderizado
    function render(products) {
      const html = template({ products }); 
      document.getElementById('productos').innerHTML = html;
    };
    console.log('renderizado');
  });
}


// detector de eventos DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

carga();
// Oyente de eventos del botón de filtro 
  const filterButton = document.querySelector('.btnfilter');
  filterButton.addEventListener('click', mostrar);
  //funcion para mostrar el filtro
  function mostrar() {
    const filtro = document.querySelector('.filtro');
    filtro.classList.add('visible'); 
    filtro.classList.remove('invisible');
    document.querySelector('.btnf1').classList.add('opaco');
    resetCheckboxes();
  }
  //funcion para ocultar el filtro
  function ocultar() {
    const filtro = document.querySelector('.filtro');
    filtro.classList.remove('visible');
    filtro.classList.add('invisible'); 
  }
  //oyente de evntetos del boton de cerrar
  const cerrar = document.querySelector('.btnx');
  cerrar.addEventListener('click',ocultar); 
  //definimos los botones de checkbox para las diferentes funciones  
    const checkbox1 = document.getElementById('btncheck1');
    const checkbox2 = document.getElementById('btncheck2');
    const checkbox3 = document.getElementById('btncheck3');
  //funcion para los checkbox 
  function checket() {
    const checkboxes = [checkbox1, checkbox2, checkbox3];
    //una vez seleccionados quedan desactivados 
    for (const checkbox of checkboxes) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          //con este paso solo se desactiva cuando esta visible el filtro
          if (document.querySelector('.filtro').classList.contains('visible')) {
            this.disabled = true;
            document.querySelector('.btnf1').classList.remove('opaco');
          }
        }
      });
    }
    //envento para el boton de limpiar
    const clearButton = document.querySelector('.btnf1');
    clearButton.addEventListener('click', resetCheckboxes);
    }  
  
  // funcion de reseteo de checkbox
  function resetCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); 
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
      checkbox.disabled = false;
      document.querySelector('.btnf1').classList.add('opaco');
    }

  }
  // evento de boton de filtrado 
  const filterButton2 = document.querySelector('.btnf2');
  filterButton2.addEventListener('click', function() { 
    ids=[];
    if (checkbox1.checked) {
      ids.push(checkbox1.value);
    }if (checkbox2.checked) {
      ids.push(checkbox2.value);
    }if (checkbox3.checked) {
      ids.push(checkbox3.value);
    };
    idn = ids.map(function(element) {
       return parseFloat(element)
    }); 
    ocultar(); 
    refrescar();
    guardar();
    
  
  });
  
  // LLamamos la funcion checket despues de  DOMContentLoaded
  checket();
  console.log('CARGADO');
});