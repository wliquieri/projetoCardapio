const socket = io();
var  menuCategoria = document.getElementById("menu-categoria")

/* function carregarPagina(pagina){
    var request;
	{
		var url = pagina;
		alert(url)

		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}

		try {
			request.onreadystatechange = getInfo;
			request.open("GET", url, true);
			request.send();
		}
		catch (e) {
			alert("Unable to connect to server");
		}
	}

	function getInfo() {
		if (request.readyState == 4) {
			var val = request.responseText;
			document.getElementById('recebePagina').innerHTML = val;
		}
	}
} 

menuCategoria.addEventListener("click",() => {
	alert("categorias/index.html");
	carregarPagina("categorias/index.html");
	menuCategoria.setAttribute("disabled", "disabled");
}) */