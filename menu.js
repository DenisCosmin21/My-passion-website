menuToggle = document.querySelector('.toggle');
menuToggle.addEventListener('click', () => {
	menuToggle.classList.toggle('active');
});
let ok = 0;
function menu()
{
	if(ok == 0){
		document.getElementById("list").style.width= "300px";
		ok = 1;
	}
	else{
		ok = 0;
		document.getElementById("list").style.width = "0px";
	}
	
}