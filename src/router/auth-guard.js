
const isAuthenticatedGuard = async(to, from, next) =>{
    // console.log({to, from, next})

    new Promise(() => {
        const random =  Math.random() * 100

        if ( random > 50 ){
            console.log('esta authenticado')
            next()
        } else {
            console.log('bloqueado por el isAuthenticatedGuard', random)
            next({name: 'pokemon-home'})
        }

    })


}

export default isAuthenticatedGuard