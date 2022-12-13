<template>

    <div>

        <v-row class="pb-4">
            <v-col>
                
            </v-col>
            <v-col class="text-right">
                 <v-btn
                    color="primary"
                    dark
                    @click.stop="agregar()"
                >
                    Agregar
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
               
        
            </v-col>
        </v-row>

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
                       
                    </v-row>
                                        
                </v-card-title>
			</template>

            <template v-slot:item.ACTIONS="{ item }">
              
                <v-icon
                    color="blue darken-2"
                    class="mr-2"
                    @click.stop="editar(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    color="red darken-2"
                    @click.stop="eliminar(item)"
                >
                    mdi-delete
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

        <Modal :edit_mode="edit_mode" :no_boleta="no_boleta"/>

    </div>

    
</template>

<script>

    import axios from 'axios'
    import Modal from '@/components/Remisiones/Modal.vue'

    export default {
        components: {
            Modal
        },
        data () {
            return {
                page: 1,
                items: [],
                headers: [],
                desserts: [],
                no_boleta: null,
                edit_mode: false
            }
        },
        methods: {
            agregar(){
                this.edit_mode = false
                this.no_boleta = null
                this.$root.$emit('open-modal')
            },
            obtener_boletas(){

                let data = {
                    name: "obtener_boletas",
                    param: {}
                }

                axios
                .post(process.env.VUE_APP_API_URL, data)
                .then(response => {
                    this.items = response.data.response.result.items
                    this.headers = response.data.response.result.headers
                })

            },
            editar(item){

                this.edit_mode = true
                this.no_boleta = item.NUM_BOLETA
                this.$root.$emit('open-modal')

            },
            eliminar(item){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Una vez eliminada no se podrá recuperar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'SI, ELIMINAR',
                    cancelButtonText: 'CANCELAR'
                }).then((result) => {
                    if (result.value) {

                        let data = {
                            name: "eliminar_boleta",
                            param: {
                                boleta: item.NUM_BOLETA
                            }
                        }

                        axios
                        .post(process.env.VUE_APP_API_URL, data)
                        .then(response => {
                            
                            console.log(response.data)

                            if (response.data.response.status != 200) {
                                
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error ' + response.data.response.status,
                                    text: response.data.response.message,
                                })

                            }else{

                                Swal.fire(
                                    'Excelente!',
                                    'La boleta ha sido eliminada exitosamente!',
                                    'success'
                                ).then(() => {

                                    this.obtener_boletas()

                                })

                            }

                        })

                        // Swal.fire(
                        // 'Deleted!',
                        // 'Your file has been deleted.',
                        // 'success'
                        // )
                    }
                })

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
            this.$root.$on('reload-boletas', () =>{
                this.obtener_boletas()
            })
        }
    }
</script>