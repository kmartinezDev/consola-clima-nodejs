require('dotenv').config();
const { inquirerMenu, pause, readInput, showPlaces } = require("./helpers/inquirer");
const Searchs = require("./models/searchs");

const main = async () => {
    
    let opt = ''
    const searchs = new Searchs();

    do {

        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const word = await readInput('Ciudad: ')
                
                // Buscar los lugares
                const places = await searchs.city(word)
                
                // Seleccionar el lugar
                const id = await showPlaces(places)
                if(id == 0) continue;
                const placeSelected = places.find( place => place.id === id)
                searchs.saveSearchHistory( placeSelected.name )
                // console.log(placeSelected)
                
                // Clima
                const {lat, long} = placeSelected
                const weather = await searchs.wheatherPlace(lat, long)
                const { desc, min, max, temp } = weather;

                // Mostrar resultados
                console.clear()
                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad: ', placeSelected.name.green)
                console.log('Lat: ', lat)
                console.log('Long: ', long)
                console.log('Temperatura: ', temp)
                console.log('Minima: ', min)
                console.log('Maxima: ', max)
                console.log('Como esta el clima: ', desc.green)

                break;
            case 2:
                    searchs.historyCap.forEach( (place, index) => {
                        
                        let idx = `${index+1}.`.green 
                        console.log(`${idx} ${place}`)
                    })
                break;
        }

        if(opt !== 0) await pause()
        
    } while (opt !== 0);
}

main();