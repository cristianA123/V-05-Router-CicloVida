<template>
  <h1>Pokemon Page</h1>
  <p>#{{id}}</p>
  <div
    v-if="pokemon"
  >
  <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
  </div>

</template>

<script>
export default {
  props: {
    id:{
      type: Number,
      required: true
    },
    nombre: {
      type: String
    }
  },
  data() {
    return{
      pokemon: null
    }
  },
  created() {
    // console.log(this.$route.params)

    // const {id} = this.$route.params
    // console.log(id)
    // this.id = id

    console.log(this.$attrs)

    this.getPokemon()
  },
  methods: {
    async getPokemon() {
      try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then( r => r.json() )
        console.log(pokemon)
        this.pokemon =  pokemon
      } catch(error) {
        console.log(error)
        this.$router.push('/')
        console.log('No hay nada que hacer aqui')
      }
    }
  },
  watch: {
    id() {
      this.getPokemon()
      console.log('El nuevo id')
    }
  }

}
</script>

<style>

</style>