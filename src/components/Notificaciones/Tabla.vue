<template>

    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="25"
            class="elevation-1"
            loading-text="Cargando... Espere un momento"
			no-data-text="No se han encontrado registros que coincida con su criterio de búsqueda."
            hide-default-footer
        >

            <template v-slot:top>
			
                <v-card-title>
                    <v-row align="center">
                        <v-col cols="4">
                            <v-text-field label="Buscar boleta..." single-line hide-details append-outer-icon="mdi-magnify" autocomplete="off" required clearable></v-text-field>
                        </v-col>
                        <!-- <v-col cols="8">
                            <strong><strong>Matrículas</strong></strong>
                        </v-col> -->
                        <v-col align="right">
                            <v-btn
                                color="secondary"
                                dark
                                small
                                outlined 
                                class="mr-4"
                                @click="obtener_boletas"
                            >
                                Pendientes
                                <v-icon dark>mdi-clock</v-icon>
                            </v-btn>
                            <v-btn
                                color="success"
                                dark
                                small
                                outlined 
                                class="mr-4"
                                @click="boletas_notificadas"
                            >
                                NOTIFICADAS
                                <v-icon dark>mdi-check</v-icon>
                            </v-btn>
                            <v-btn
                                color="error"
                                dark
                                small
                                outlined 
                                @click="boletas_rechazadas"
                            >
                                RECHAZADAS
                                <v-icon dark>mdi-alert-circle</v-icon>
                            </v-btn>
                        </v-col>

                        
                       
                    </v-row>
                                        
                </v-card-title>
			</template>

            <template v-slot:item.ACTIONS="{ item }">
              
                <v-icon
                    color="blue darken-2"
                    class="mr-2"
                    @click.stop="cambiar_estado(item)"
                >
                    mdi-pencil
                </v-icon>
               
            </template>
            <template v-slot:item.NUM_BOLETA="{ item }">
               {{ item.SERIE_BOLETA }} - {{ item.NUM_BOLETA }}
            </template>
            <template v-slot:item.CONDUCTOR="{ item }">
               {{ item.NOMBRE }} {{ item.APELLIDOS }}
            </template>
            <template v-slot:item.NUM_PLACA="{ item }">
               {{ item.TIPO_PLACA }} - {{ item.NUM_PLACA }}
            </template>
        </v-data-table>

        <div v-if="no_paginas > 0">
            <v-row align="center">
                <v-col>
                    <h4>Total de Registros: {{ items.length }}</h4>
                </v-col>
                <v-col class="text-center">
                    <v-pagination
                        v-model="page"
                        :length="no_paginas"
                        dark
                    ></v-pagination>
                </v-col>
                <v-col>

                </v-col>
            </v-row>
            
        </div>

        <Modal :boleta="boleta" />

    </div>
</template>

<script>

    import axios from 'axios'
    import Modal from '@/components/Notificaciones/Modal'

    export default {
        components: {
            Modal
        },
        data(){
            return{
                items: [],
                headers: [],
                busqueda: null,
                page: 1,
                boleta: ''
            }
        },  
        methods: {
            obtener_boletas(){

                let data = {
                    name: "boletas_sin_notificar",
                    param: {}
                }

                axios
                .post(process.env.VUE_APP_API_URL, data)
                .then(response => {

                    console.log(response.data)

                    this.items = response.data.response.result.items
                    this.headers = response.data.response.result.headers
                })

            },
            boletas_notificadas(){

                let data = {
                    name: "boletas_notificadas",
                    param: {}
                }

                axios
                .post(process.env.VUE_APP_API_URL, data)
                .then(response => {

                    console.log(response.data)

                    this.items = response.data.response.result.items
                    this.headers = response.data.response.result.headers
                })

            },
            boletas_rechazadas(){

                let data = {
                    name: "boletas_rechazadas",
                    param: {}
                }

                axios
                .post(process.env.VUE_APP_API_URL, data)
                .then(response => {

                    console.log(response.data)

                    this.items = response.data.response.result.items
                    this.headers = response.data.response.result.headers
                })

            },
            cambiar_estado(item){

                this.boleta = item.NUM_BOLETA
                // this.$root.$emit('open-modal-notificacion');

            }
        },
        computed: {
            no_paginas: function(){

                let result = this.items.length / 25

                if (Number.isInteger(result)) {
                    
                    return result

                }else{

                    return parseInt(result) + 1

                }

            }
        },
        mounted(){

            this.obtener_boletas()

            // Actualizar la tabla
            this.$root.$on('reload-boletas-notificacion', () =>{
                this.obtener_boletas()
            })

        }
    }
</script>