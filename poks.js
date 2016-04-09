var poks = $('#poks'); /*переменная для колонки с покемонами col-xs-8*/
var pok = $('#poks>div'); /*переменная для колонки col-xs-4, для одного покемона, >(в poks взять child по тегу div)*/
var skills = $('#skills'); /*для skills*/

        function writePockemonType(type, index) { /*тип покемона (параметры: тип(а на самом деле это обьект) и номер в массиве)*/
            pok.find('p').append('<a href="#" class="btn btn-xs btn-primary" role="button">' + type.name + '</a>').children().last().addClass(type.name)
        }; /*в поке найти р и добавить а + имя типа покемона*/

        function aboutPokemon (pok){
                console.log($(pok.target).attr('id'));
            $.get('http://pokeapi.co/api/v1/pokemon/' /*по ссылке взять инфу по id */
                  +$(pok.target).attr('id')) /*по клику выполнить*/
            .done( 
                function skillsPokemona (data){
                    console.log(data);
                    
              
       
//                    skills.find('#type').;
                    skills.find('#pokimg').attr('src', 'http://pokeapi.co/media/img/'+data.pkdx_id+'.png');
                    skills.find('#type').empty();
                    data.types.forEach(function(type){
                        skills.find('#type').append('<span> '+type.name+'</span>')
                    });
                    skills.find('h3').text(data.name);
                    skills.find('#attack').text(data.attack);
                    skills.find('#defense').text(data.defense);
                    skills.find('#hp').text(data.hp);
                    skills.find('#spAttack').text(data.sp_atk);
                    skills.find('#spDefense').text(data.sp_def);
                    skills.find('#speed').text(data.speed);
                    skills.find('#weight').text(data.weight);
                    skills.find('#totalMoves').text(data.total);
                    skills.show();
                }
            );
            };


        function addPokemonToPage(pokemon, index) { /*добавить имя, номер в массиве*/
            pok.find('h3').text(pokemon.name); /*в pok найти h3, добавить text имя pokemon*/
            pok.find('p').empty(); /*очистить р, потому что добавляет к предыдущему зараза*/
            pok.find('img').attr('src', 'http://pokeapi.co/media/img/'+pokemon.pkdx_id+'.png').attr('id', pokemon.pkdx_id);
//            pok.on( "click", function (pok){console.log(pok);} );
            pokemon.types.forEach(writePockemonType); /*для каждого покемона прогнать функцию writePockemonType*/
            poks.append(pok.clone().show().on( "click", aboutPokemon )); /*в poks добавить клон pok, show, по клику прогнать фун-цию aboutPokemon*/
        };

        function workWithPokemonsArray(data) { /*что вообще с покемонским обьектом делать*/
            pokemons = data;
            data.objects.forEach( /*в обьекте data есть массив objects, для каждого покемона сделать*/
                addPokemonToPage /*это! название фун-ии*/
            )
        };
        function getPockemons (limit){ /*лимин, то что достали в предыдущем вызове фу-ции*/
            var offset = 0; /*смещение с 0 1 2 3 ....массивы с 0*/
            if (pokemons){ /*если есть эти твари(уже вызвали функцию), тогда*/
                offset = limit+pokemons.meta.offset; /*смещение=limit+ */ 
            }
            $.get('http://pokeapi.co/api/v1/pokemon/', { 
                'limit'/*имя параметра*/: limit,/*значение параметра, //параметры ввиде обьекта*/
                'offset': offset
            }) /*взять список покемонов + лимит 12*/
            .done( /*после получения покемонов - сделать с ними следующие манипуляции(функции)*/
                workWithPokemonsArray /*пошла жара*/
            );
        }
var pokemons; /*пустая переменная*/
getPockemons(12);   


