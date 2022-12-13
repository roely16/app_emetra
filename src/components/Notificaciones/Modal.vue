<template>
    <div>
        
        <v-dialog
            v-model="dialog"
            scrollable
            width="500"
        >
            <v-card>
                <v-card-text>
                    <v-container fluid>
                        <v-row class="text-center">
                            <v-col>
                                <span class="headline">¿La notificación fue exitosa?</span>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center" class="text-center">
                            <v-col>
                                <v-btn
                                    color="green"
                                    dark
                                    class="mr-4"
                                    :outlined="!btn_si"
                                    @click.stop="si"
                                >
                                    SI 
                                    <v-icon dark>mdi-thumb-up</v-icon>
                                </v-btn>
                                <v-btn
                                    color="red"
                                    dark
                                    :outlined="!btn_no"
                                    @click.stop="no"
                                >
                                    NO
                                    <v-icon dark>mdi-thumb-down</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row v-if="btn_no">
                            <v-col>
                                <v-autocomplete label="Motivo del rechazo" hide-details outlined dense :items="items_rechazo" item-text="DESCRIPCION" item-value="COD_MOT_RECHAZO" v-model="motivo_rechazo" hide-no-data></v-autocomplete>
                            </v-col>
                        </v-row>

                        <v-row v-if="btn_si">
                            <v-col>
                                <v-menu
                                    ref="dialog"
                                    v-model="modalFecha"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            label="Fecha"
                                            :value="computedDateFormattedMomentjs"
                                            hide-details outlined dense
                                            v-on="on"
                                            :rules="[v => !!v || 'Item is required']"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" @input="modalFecha = false" locale="es-ES"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" dark @click="dialog = false">Cerrar</v-btn>
                    <v-btn color="green darken-1" dark v-if="enabled_save" @click.stop="guardar">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    
    </div>    
</template>

<script>

    import axios from 'axios'
    import moment from 'moment'

    export default {
        props: {
            boleta: {
                type: String,
                required: true,
                default: null
            }
        },
        data(){
            return{
                dialog: false,
                btn_si: false,
                btn_no: false,
                items_rechazo: [],
                motivo_rechazo: null,
                modalFecha: false,
                date: null
            }
        },
        methods: {
            si(){

                this.btn_si = true
                this.btn_no = false

            },
            no(){

                this.btn_si = false
                this.btn_no = true

            },
            guardar(){

                let data = {
                    name: 'actualizar_notificacion',
                    param: {

                        notificada: this.btn_si,
                        motivo_rechazo: this.motivo_rechazo,
                        boleta: this.boleta,
                        fecha: this.computedDateFormattedMomentjs

                    }
                }

                axios
                .post(process.env.VUE_APP_API_URL, data)
                .then(response => {
                    
                    console.log(response.data)

                    Swal.fire(
                        'Excelente!',
                        'La boleta ha sido actualizada exitosamente!',
                        'success'
                    ).then(()=>{

                        this.dialog = false
                        this.$root.$emit('reload-boletas-notificacion');

                    })

                })

                console.log(data)

            }
        },
        computed: {
            enabled_save(){

                if((this.btn_si && this.date) || ( this.btn_no && this.motivo_rechazo )){

                    return true

                }else{

                    return false

                }

            },
            computedDateFormattedMomentjs () {
                return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
            },
        },
        watch: {
            boleta: function(val){

                if (val) {

                    let data = {
                        name: "obtener_rechazos",
                        param: {}
                    }

                    axios
                    .post(process.env.VUE_APP_API_URL, data)
                    .then(response => {
                        this.items_rechazo = response.data.response.result
                    })

                    this.dialog = true 
                }

            }
        },
        mounted(){

            // this.$root.$on('open-modal-notificacion', () =>{

            //     console.log(this.boleta)

            //     if (this.boleta) {
            //         this.dialog = true    
            //     }
                
            //     // Obtener data

            //     let data = {
            //         name: "obtener_rechazos",
            //         param: {}
            //     }

            //     axios
            //     .post(process.env.VUE_APP_API_URL, data)
            //     .then(response => {
            //         this.items_rechazo = response.data.response.result
            //     })

            // })

        }
    }
</script>