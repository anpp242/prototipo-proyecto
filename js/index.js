//START FUNCTION TO SPEECH
  function speechIn(volume, rate, pitch, msn){
    msg.volume = volume;
    msg.rate = rate;
    msg.pitch = pitch;
    msg.text = msn;
    msg.lang = 'es-ES';

    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    speechSynthesis.speak(msg);
  }
//END FUNCTION TO SPEECH

//START TOOLTIP BOOTSTRAP
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
//END TOOLTIP BOOTSTRAP

//START COMMANDS VOICES
if (annyang) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  let menu = document.querySelectorAll('.nav-link');

  let titulo = document.querySelectorAll('h1');
  let contenido = document.querySelectorAll('.article p');

  var commands = {
    'Hola': function() {
      speechIn(1, 1, 2, 'Hola');
    },

    'Como estas': function() {
      speechIn(1, 1, 2, 'Hola, como estas');
    },

    'Gracias': function() {
      speechIn(1, 1, 2, 'Gracias a ti!');
    },

    'rojo': function() {
      document.body.style.background = "#AF054B";
    },

    'blanco': function() {
      document.body.style.background = "#ffffff";
    },

    'opciones': function(){
      //console.log(menu);
      menu.forEach((item, i) => {
        speechIn(1, 1, 2, 'Opción ' + (i + 1) + ', ' + item['outerText']);
      });
    },

    'inicio': function(){
      window.location.href = menu[0]['href'];
    },

    'articulo': function(){
      window.location.href = menu[1]['href'];
    },

    'escuchar': function(){
      speechIn(1, 1, 2, titulo[0]['innerText']);
      speechIn(1, 1, 2, contenido[0]['innerText']);
    },

    'mostrar *tag': function(tag){
      let buscador = document.getElementById('box-search');
      buscador.style.display = 'flex';
      if(buscador.style.display === 'flex'){
        consultaApi(tag);
      }
    },

  };

  function consultaApi(tag) {
    let divRespuesta = document.getElementById('respuesta');
    divRespuesta.innerHTML = '';
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (response) {
        if (xhr.readyState === 4) {
            //console.log(response);
            //console.log(xhr);
            //console.log(xhr.response);
            let obj = JSON.parse(xhr.response);
            Object.keys(obj).forEach((e, i) => {
              let divRespuesta = document.getElementById('respuesta');
              let p = document.createElement("p");
              divRespuesta.append(p);
              divRespuesta.append(`${e}: ${obj[e]['confirmed']}`);
            });

            //document.getElementById('respuesta').innerHTML = xhr.response;
        }
    };

    xhr.open('GET', 'https://covid-api.mmediagroup.fr/v1/cases?country=' + tag);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send('action=jnjtest');
  }

  function buscarTexto(){
    let divRespuesta = document.getElementById('respuesta');
    let tag = document.getElementById('s').value;
    divRespuesta.innerHTML = '';
    tag.charAt(0).toUpperCase() + name.slice(1);
    let xhrTxt = new XMLHttpRequest();
    xhrTxt.onreadystatechange = function (response) {
        if (xhrTxt.readyState === 4) {
            //console.log(tag);
            //console.log(xhrTxt);
            //console.log(xhrTxt.response);
            let obj = JSON.parse(xhrTxt.response);
            Object.keys(obj).forEach((e, i) => {
              let divRespuesta = document.getElementById('respuesta');
              let p = document.createElement("p");
              divRespuesta.append(p);
              divRespuesta.append(`${e}: ${obj[e]['confirmed']}`);
            });

            //document.getElementById('respuesta').innerHTML = xhrTxt.response;
        }
    };

    xhrTxt.open('GET', 'https://covid-api.mmediagroup.fr/v1/cases?country=' + tag);
    xhrTxt.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhrTxt.send('action=jnjtest');
  }



  annyang.addCommands(commands);
  annyang.start();
}
//END COMMANDS VOICES


//START AVTIVATOR
function activateSound(){
  speechIn(1, 1, 2, 'Hola, puedes mencionar la palabra instrucciones para poder navegar por los diferentes lugares del sitio para hacer algunas configuracioens');
}
//END ACTIVATOR


let articulos = document.querySelectorAll('.article');
console.log(articulos);
