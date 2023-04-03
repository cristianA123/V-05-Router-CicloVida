import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./auth-guard";

// import ListPage from "@/modules/pokemon/pages/ListPage"
// import PokemonPage from "@/modules/pokemon/pages/PokemonPage"
// import AboutPage from "@/modules/pokemon/pages/AboutPage"
// import NoPageFound from '@/modules/shared/pages/NoPageFound.vue';

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/*webpackChunkName: "PokemonLayout" */ './../modules/pokemon/layout/PokemonLayout'),
        children: [
            {
                path: 'home',
                name: 'pokemon-home',
                component: () => import('@/modules/pokemon/pages/ListPage')
            },
            {
                path: 'about',
                name: 'pokemon-about',
                component: () => import('@/modules/pokemon/pages/AboutPage')
            },
            {
                path: 'pokemonid/:id',
                name: "pokemon-id",
                component: () => import('@/modules/pokemon/pages/PokemonPage'),
                props: (route) => {
                    const { id } = route.params
                    return isNaN(Number(id))
                        ? { id: 1 }
                        : {
                            id: id,
                            nombre: 'Cristian',
                            apellido: 'Chipana'
                        }
                }
            },
            {
                path: '',
                redirect: { name:  'pokemon-about' }
            },
        ]
    },

    //DBZ LAYOUT
    {
        path: '/dbz',
        name: 'dbz',
        // beforeEnter: [ isAuthenticatedGuard ],
        component: () => import(/* webpackChunkName "DBZLayout" */ './../modules/dbz/layouts/DragonBallLayout'),
        children: [
            {
                path: 'characters',
                name: 'dbz-characters',
                beforeEnter: [ isAuthenticatedGuard ],
                component: () => import(/* webpackChunkName "characters" */ './../modules/dbz/pages/Characters')
            },
            {
                path: 'about',
                name: 'dbz-about',
                beforeEnter: [ isAuthenticatedGuard ],
                component: () => import(/* webpackChunkName "about" */ './../modules/dbz/pages/About')
            },
            {
                path: '',
                beforeEnter: [ isAuthenticatedGuard ],
                redirect: { name: 'dbz-characters'}

            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/modules/shared/pages/NoPageFound')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// //Guard Global -Sincrono

// router.beforeEach((to, from, next) => {
//     console.log({to,from,next})

//     const random = Math.random() * 100
//     if(random > 50) {
//         console.log('authenticado')
//         next()
//     } else {
//         console.log(random, 'bloqueado por el guard')
//         next({name: 'pokemon-home'})
        
//     }
// })

// GUARD GLOBAL - SINCRONO

// const canAccess  = () => {
//     return new Promise(resolve => {

//         const random = Math.random() * 100
//             if(random > 50) {
//                 console.log('authenticado - can Access')
//                 resolve(true)
//             } else {
//                 console.log(random, 'bloqueado por el guard - canAccess')
//                 resolve(false)
//             }
//     })
// }

// router.beforeEach( async(to, from, next)=>{
//     const authorized = await canAccess()
    
//     authorized
//     ? next()
//     : next({name: 'pokemon-home'})
// })

export default router