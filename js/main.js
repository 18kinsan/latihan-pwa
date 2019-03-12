$(document).ready(function(){
    // API JSON DATA MAHASISWA
    var _url ='http://my-json-server.typicode.com/18kinsan/latihan_pwa_api/mahasiswa';
    // var _url = 'http://localhost/b2/index.php';
    
    //menmapung data yang didapat dari API
    var result = '';

    //menampung gender sbg option
    var gender_opt='';

    //menampung semua gender dr API
    var gender =[];

    // $.get  (_url, function (data){
        function renderPage(data){
        $.each (data, function (key, items){
            //untuk menampung gender sementara pd loop
            _gend=items.gender;
            
            result += '<div>'+'<p><b>'+items.name+'</b></p>'+
            '<p>'+_gend+'</p>'+'</div>';

            //jika gender tidak ada didalam array gender
            //maka masukkan gender option
            if($.inArray(_gend, gender) === -1){
                //data gender di push untu
                //pengecekan literasi berikutnya
                gender.push(_gend);
                //set gender_opt dg <option>
                gender_opt+='<option value="'+_gend+
                '">'+_gend+'</option>'
                }
        });

        //menggunakan selector ID mhs-list
        //kemudian replace html didalam komponen yang
        //ada di id mhs-list menjadi result
        $('#mhs-list').html(result);

        //menggunakan selector ID gender-select
        //kemudian replace html didalam komponen yang
        //ada di id gender-select menjadi gender_opt
        $('#gender-select').html('<option value="semua">semua</option>'+gender_opt);   
    // });
    }

    var networkDataReceive = false;
    // cek di cache, apakah sudah ada belum, ngambil data dr service online
    var networkUpdate = fetch(_url).then(function(response){
        return response.json();
    }).then(function(data){
        networkDataReceive = true;
        renderPage(data)
    });

    // fetch data dari cache
    caches.match(_url).then(function(response){
        if(!response) throw Error("no data o cache");
        return renderPage.json();
    }).then(function(data){
        if(!networkDataReceive){
            renderPage(data);
            console.log('render data from cache');
        }
    }).catch(function(){
        return networkUpdate;
    })


        // saring gender
        $('#gender-select').on('change', function(){
            updateList($(this).val())
        });




        function updateList(opt){
            var _url2=_url;

            if(opt !== 'semua'){
                _url2=_url + '?gender=' +opt;
            }
            var result='';

            $.get  (_url2, function (data){
                $.each (data, function (key, items){
                    //untuk menampung gender sementara pd loop
                    _gend=items.gender;
                    
                    result += '<div>'+'<p><b>'+items.name+'</b></p>'+
                    '<p>'+_gend+'</p>'+'</div>';
    
                   
                });
    
                //menggunakan selector ID mhs-list
                //kemudian replace html didalam komponen yang
                //ada di id mhs-list menjadi result
                $('#mhs-list').html(result);
    
            });
        }
});

if ('serviceWorker' in navigator){
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/serviceworker.js').then(function (reg) {
            console.log('SW regis sukses dgn skop',reg.scope)
        }, function (err) {
            console.log('SW regis failed',err);
        })
    })
} 