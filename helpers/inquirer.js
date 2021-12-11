const inquirer = require('inquirer')
require('colors')

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea realizar?',
        choices: [
            {
                value: 1,
                name: `${'1'.green}. Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2'.green}. Historial`
            },
            {
                value: 0,
                name: `${'0'.green}. Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {
    
    console.clear()
    console.log('================================'.green)
    console.log('Seleccione una opcion'.white)
    console.log('================================ \n'.green)

    const { opcion } = await inquirer.prompt(questions)

    return opcion;
}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n')
    await inquirer.prompt(question)
}

const readInput = async (msg) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: msg,
            validate( value ) {
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)

    return desc
}

const showPlaces = async ( places = [] ) => {
    const choices = places.map( (place, index) => {
        
        let idx = `${index+1}.`.green 

        return {
            value: place.id,
            name:  `${idx} ${place.name}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccion lugar: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions)

    return id;
}

const confirmar = async mensaje => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje,
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}

const mostrarListadoCheck = async ( tareas = [] ) => {
    const choices = tareas.map( (tarea, index) => {
        
        let idx = `${index+1}.`.green 

        return {
            value: tarea.id,
            name:  ` ${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(preguntas)

    return ids;
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    showPlaces,
    
    confirmar,
    mostrarListadoCheck
}