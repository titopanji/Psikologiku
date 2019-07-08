function getmv() {
/*
	membuat 2 variabel yaitu url dan img
	url menampung link API
	img menampung link IMG
*/
var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=fc8a85389fd8c9fe48f1cfd0a55297e4";
var img = "http://image.tmdb.org/t/p/original/";

/*
	menjalankan ajax untuk request API dengan callback bertipe file json
*/
$.getJSON(url, function (e) {
/*
	membuat variabel movie yang mana movie = e.result(parameter pada fungsi diatas (e), result merupakan array dalam file json)
*/
	let movie = e.results;
/*
	melakukan looping dengan variabel movie dengan 2 parameter 'i' dan 'mv'
*/
	$.each(movie, function(i,mv){
		$('.date').html(`
			<h4 class="text-center mb-3">Movie Sedang Tayang di Bioskop</h4>
			<h6 class="text-secondary">Tanggal Tayang dari `+e.dates.minimum+` sampai `+e.dates.maximum+` </h6>	
		`);
		$('.mv').append(`
			<div class="card mb-3 d-inline-flex" style="width: 18rem;">
			  <img src="`+img+mv.poster_path+`" class="card-img-top" alt="..." width="320px" height="430px">
			  <div class="card-body">
			    <p class="card-text">`+mv.original_title+`</p>
			    <a href="#" class="info" data-toggle="modal" data-target="#exampleModal" data-id="`+mv.id+`">Detail</a>
			  </div>
			</div>
		`); /*pada <a href="#" class="info" data-toggle="modal" data-target="#exampleModal" data-id="`+mv.id+`" <= bertujuan mengambil ID 
			  pada API callback.
			*/

	});
});
}

/*
	menjalankan fungsi
*/
getmv();
getinfo();

function getinfo(){
	var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=fc8a85389fd8c9fe48f1cfd0a55297e4";
	var img = "http://image.tmdb.org/t/p/w342/";
	
/*
	kita mengambil ID dari -> data-id="`+mv.id+`">, yang mana tersebut menampung data ID movie.
	kita memanggil kelas '.mv'
	on('click','.info') <- maksudnya jika di klick pada kelas '.info' lalu menjalankan fungsi
*/
	$('.mv').on('click', '.info', function (){
/*
	membuat variabel baru yang mana $(this) <- maksudnya apa saja yang diklik
	.data('id') -> dari data-id="`mv.id`".
*/
	var x = $(this).data('id');
/*
	menjalankan ajax request API dnegan callback json 
*/
	$.getJSON(url, function (g) {
//penjelasan ada diatas
	let info = g.results;
	//melakukan looping
	$.each(info, function(i,mv){
/*
	membuat logika jika mv.id = x, x -> variabel x diatas yang mana x = $(this).data('id'), yang mana berisi/menampung id dari movie
*/
		if(mv.id == x){
/*
	memanggil kelas .modal-body pada html kemudian kita menimpa semua yang ada di kelas .modal-body dengan menggunakan '.html'
*/
		$('.modal-body').html(`
		<div class="container-fluid">
		<div class="row">
		  <div class="col-md-4">
			<img src="`+img+mv.poster_path+`" style="width:195px; height:300px;" alt="profile1">
		  </div>
		  <div class="col-md-8">
			<ul class="list-group list-group-flush">
			  <li class="list-group-item">Judul : `+mv.original_title+`</li>
			  <li class="list-group-item">IMDb Rating  : `+mv.vote_average+`</li>
			  <li class="list-group-item">Release date : `+mv.release_date+`</li>
			  <li class="list-group-item"><u>Overview</u> <br> `+mv.overview+`</li>
			  <li class="list-group-item"></li>
			</ul>
		  </div>
		</div>
	  </div>
		`);
	}
	});
});

	});
}

