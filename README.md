# marvel_backend_test

# Ejercicio backend developer

_Ejercicio para consultar los editores, coloristas y escritores, asi como los personajes realacionados en los comics de los personajes Iron Man y Capitan America._

### Pre-requisitos 📋

_Tener instaladas las siguientes herramientas_

```
nodejs v12.* o mayor
mongodb v3.*
```

### Instalación 🔧

```
git clone https://github.com/EJNB/marvel_backend_test.git
cd backend_api_test
npm install
node index.js
```

_Luego de ello. Procedemos a registrar los dos comics de interes, los cuales son Iron Man y Capitan America._

```
curl --location --request POST 'localhost:3900/marvel/comics/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Iron Man",
    "nickname": "ironman"
}'

curl --location --request POST 'localhost:3900/marvel/comics/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Capitan America",
    "nickname": "capamerica"
}'
```

_Una vez registrados estos dos comics. Procedemos actualizar nuestra base de datos con la informacion de dichos comics tal como sus colaboradores y characters. 
Para ello es necesario ejecutar dos request con la info q queremos persistir en nuestra base de datos, los cuales son:_

```
curl --location --request PUT 'http://localhost:3900/marvel/colaborators' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nickname" : "capamerica"
}'

curl --location --request PUT 'http://localhost:3900/marvel/characters' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nickname" : "capamerica"
}'
```

## Solicitando la informacion de nuestros dos heroes  ⚙️

_Para solicitar la informacion de nuestros dos heroes es necesario ejecutar dos request, Get colaborators y Get characters_

```
curl --location --request GET 'http://localhost:3900/marvel/colaborators/capamerica'

curl --location --request GET 'http://localhost:3900/marvel/characters/capamerica'
```
_Una vez ejecutados nuestros request obtendremos la informacion de esta manera._

_**Get colaborators by comic**_
```
{
    "last_async": "2020-12-25T17:06:25.081Z",
    "editors": [
        "Jeff Youngquist",
        "George Beliard"
    ],
    "writers": [
        "Ta-Nehisi Coates",
        "Anthony Falcone",
        "Zeb Wells",
        "Mark Waid",
        "Robbie Thompson",
        "Nick Spencer",
        "Rick Remender",
        "Jack Kirby"
    ],
    "colorists": [
        "Matt Milla",
        "Daniel Acuna",
        "Frank Martin",
        "Sunny Gho",
        "Jordie Bellaire",
        "Irma Kniivila",
        "Jesus Aburtov",
        "Rod Reis",
        "Paul Mounts",
        "Rachelle Rosenberg",
        "Dean White",
        "Vc Joe Caramagna",
        "Lee Loughridge"
    ]
}
```

_**Get character by comic**_
```
{
    "last_sync": "2020-12-25T21:24:59.754Z",
    "characters": [
        {
            "character": "Captain America",
            "comics": [
                "A+X (2012) #1",
                "A+X (2012) #4",
                "A+X (2012) #9",
                "A-Next (1998) #2",
                "A-Next (1998) #3",
                ....
            ]
        },
        {
            "character": "Sharon Carter",
            "comics": [
                "Age of Heroes (2010) #1",
                "Age of Heroes (2010) #2",
                "Age of Heroes (2010) #3",
                "Age of Heroes (2010) #4",
                "AGE OF HEROES TPB (Trade Paperback)",
                "Avengers (2010) #10",
                "Avengers (2010) #11",
                "Avengers (2010) #11 (CAPTAIN AMERICA 70TH ANNIVERSARY VARIANT)",
               ...
            ]
        },
        {
            "character": "Captain America",
            "comics": [
                ....
                "Adventures of Captain America (1991) #1",
                "Adventures of Captain America (1991) #2",
                "Adventures of Captain America (1991) #3",
                "Adventures of Captain America (1991) #4",
                "Age of Apocalypse (2011) #2 (Avengers Art Appreciation Variant)",
                "Age of Heroes (2010) #1"
            ]
        },
        {
            "character": "Sharon Carter",
            "comics": [
                "Age of Heroes (2010) #1",
                "Age of Heroes (2010) #2",
                "Age of Heroes (2010) #3",
                "Age of Heroes (2010) #4",
                "AGE OF HEROES TPB (Trade Paperback)",
                "Avengers (2010) #10",
                "Avengers (2010) #11",
                ...
            ]
        },
        {
            "character": "Misty Knight",
            "comics": [
                "Absolute Carnage: Lethal Protectors (2019) #1",
                "Absolute Carnage: Lethal Protectors (2019) #2",
                "Absolute Carnage: Lethal Protectors (2019) #3",
                ...
            ]
        },
        {
            "character": "Sharon Carter",
            "comics": [...]
        },
        {
            "character": "Winter Soldier",
            "comics": [
                "A YEAR OF MARVELS TPB (Trade Paperback)",
                ...]
        },
       ...
    ]
}
```

## Construido con:
* [Expressjs](https://expressjs.com/) - Miniframework para construccion de aplicaciones web
* [Mongodb](https://rometools.github.io/rome/) - Usado para generar RSS
