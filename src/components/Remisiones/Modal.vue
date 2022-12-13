<template>
    <div>
        <v-form 
            ref="form"
            v-model="valid"
        >
        <v-dialog
            v-model="dialog"
            scrollable
        >
            
            <!-- <template v-slot:activator="{ on }">
               
            </template> -->

            <v-card>
                <v-card-title>
                    <!-- {{ edit_mode ? 'Editar Remisión ' + boleta.NUM_BOLETA : 'Agregar Remisión' }} -->
                    <v-spacer></v-spacer>
                    <v-progress-circular
                        v-if="loadingDetail"
                        indeterminate
                        color="primary"
                        size="20"
                    ></v-progress-circular>
                </v-card-title>
                <v-card-text>

                    <v-container fluid>

                        <!-- Datos del Vehiculo -->

                        <v-row align="center" >
                            <v-col cols="6">
                                <v-row  class="text-center" justify="center">
                                    <!-- <v-col cols="3">
                                        <v-img
                                            src="https://www.mzaghi.com/wp-content/uploads/2016/09/muniguate-logo.png"
                                            contain
                                            ></v-img>
                                    </v-col>
                                        <v-col cols="6" class="text-center">
                                        <h2>POLICIA MUNICIPAL DE TRÁNSITO</h2>
                                        <h5>MUNICIPALIDAD DE GUATEMALA</h5>
                                    </v-col> -->
                                    <v-col cols="8">
                                        <v-img
                                            src="../../../public/img/emetra.png"
                                            
                                            contain
                                            ></v-img>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-card shaped>
                                    <v-card-title class="text-center">
                                        NO. DE BOLETA
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field hide-details outlined dense label="Serie" v-model="boleta.SERIE_BOLETA" :disabled="edit_mode" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="8">
                                                <v-text-field hide-details outlined dense label="Número" v-model="boleta.NUM_BOLETA" :disabled="edit_mode" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            
                            </v-col>
                            <v-col cols="12">
                                <v-card shaped>
                                    <v-card-title class="text-center">
                                        DATOS DEL VEHÍCULO
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="2">
                                                <!-- <v-text-field clearable hide-details outlined dense label="Tipo Placa" v-model="boleta.TIPO_PLACA" :rules="[v => !!v || 'Item is required']"  required></v-text-field> -->
                                                <v-select
                                                    :items="tipos_placa"
                                                    hide-details outlined dense
                                                    :rules="[v => !!v || 'Item is required']"
                                                    v-model="boleta.TIPO_PLACA"
                                                    label="Tipo Placa"
                                                    required
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-text-field hide-details outlined dense label="Placa" v-model="boleta.NUM_PLACA" :rules="[v => !!v || 'Item is required']"  required></v-text-field>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-text-field hide-details outlined dense label="Tarjeta de Circulación" v-model="boleta.NUM_CIRCULACION" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-text-field hide-details outlined dense label="Tipo Vehículo" v-model="boleta.TIPO_VEHICULO" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-text-field hide-details outlined dense label="Marca" v-model="boleta.MARCA" :rules="[v => !!v || 'Item is required']"  required></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-text-field hide-details outlined dense label="Color" v-model="boleta.COLOR" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12">
                                <v-card shaped>
                                    <v-card-title class="text-center">
                                        DATOS DEL INFRACTOR
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row justify="space-around" align="center">
                                            <v-col cols="6">
                                                <v-text-field outlined dense label="Apellidos" hide-details v-model="boleta.APELLIDOS" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field hide-details outlined dense label="Nombres" v-model="boleta.NOMBRE" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field hide-details outlined dense label="Dirección Domiciliar" v-model="boleta.DIRECCION" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="5">
                                                <v-text-field outlined dense label="Licencia de Conducir No." hide-details  v-model="boleta.NUM_LICENCIA" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="7" justify="space-around">
                                                <v-radio-group
                                                    row
                                                    v-model="boleta.CLASE_LICENCIA" 
                                                    :rules="[v => !!v || '']"
                                                >
                                                    <v-radio label="CLASE A" value="A"></v-radio>
                                                    <v-radio label="CLASE B" value="B"></v-radio>
                                                    <v-radio label="CLASE C" value="C"></v-radio>
                                                    <v-radio label="CLASE B" value="B"></v-radio>
                                                    <v-radio label="CLASE M" value="M"></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12">
                                <v-card shaped>
                                    <v-card-title class="text-center">
                                        DATOS DE LA INFRACCIÓN
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row align="center">
                                            <v-col cols="12">
                                                <v-text-field outlined dense label="Lugar" hide-details v-model="boleta.LUGAR_REMISION" :rules="[v => !!v || 'Item is required']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <!-- <v-text-field clearable hide-details outlined dense label="Hora" v-model="boleta.hora"  required></v-text-field> -->
                                                <v-menu
                                                    ref="dialogH"
                                                    v-model="modalHora"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"                                                    
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            :value="computedTime"
                                                            label="Hora"
                                                            hide-details outlined dense
                                                            :rules="[v => !!v || 'Item is required']"
                                                            v-on="on"
                                                            persistent-hint
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-model="boleta.HORAREMISION"
                                                        
                                                    >
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="modalHora = false">Cancelar</v-btn>
                                                        <v-btn text color="primary" @click="$refs.dialogH.save(boleta.HORAREMISION)">OK</v-btn>
                                                    </v-time-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="6">
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
                                            <v-col cols="6">
                                                <span class="headline">TIPO DE INFRACCIÓN</span>
                                            </v-col>
                                            <v-col cols="5" class="text-right">
                                        
                                                <div>
                                                    <v-autocomplete
                                                        label="Infracciones"
                                                        :items="items_infracciones"
                                                        hide-details 
                                                        outlined 
                                                        dense
                                                        :search-input.sync="buscar_remision"
                                                        item-text="DESCRIPCION"
                                                        item-value="ID_INFRACCION"
                                                        return-object
                                                        v-model="boleta.INFRACCION"
                                                    ></v-autocomplete>
                                                </div>
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn class="mx-2" :disabled="!boleta.INFRACCION" fab dark small color="primary" @click.stop="agregarInfraccion">
                                                    <v-icon dark>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="6" offset-md="3">
                                                <div v-if="INFRACCIONES.length > 0">
                                                    <v-list dense>
                                                        <v-list-item v-for="(INFRACCION, index) in INFRACCIONES" :key="index">
                                                            <v-list-item-icon>
                                                                <v-icon @click="eliminar_infraccion(index)" color="red">mdi-minus-circle</v-icon>
                                                            </v-list-item-icon>

                                                            <v-list-item-content>
                                                                <v-list-item-title v-text="INFRACCION.DESCRIPCION"></v-list-item-title>
                                                            </v-list-item-content>
                                                            <v-list-item-action>
                                                                <strong>Q.{{ INFRACCION.MONTO }}</strong>
                                                            </v-list-item-action>
                                                        </v-list-item>
                                                        <v-divider
                                                           
                                                        ></v-divider>
                                                    </v-list>
                                                    <v-list v-if="INFRACCIONES.length > 0">
                                                        <v-list-item>
                                                            <v-list-item-icon>
                                                                <v-icon color="green">mdi-cash</v-icon>
                                                            </v-list-item-icon>
                                                            <v-list-item-content>
                                                                <v-list-item-title><strong>Subtotal</strong></v-list-item-title>
                                                            </v-list-item-content>
                                                            <v-list-item-action>
                                                                <strong>Q.{{ subtotal }}</strong>
                                                            </v-list-item-action>
                                                        </v-list-item>
                                                    </v-list>
                                                </div>
                                                <div v-if="!INFRACCIONES.length > 0">
                                                    <!-- <h2 class="text-center" color="red">Debe agregar al menos una infracción</h2> -->
                                                    <v-alert type="error" class="text-center" dense>
                                                        Debe agregar al menos una infracción.
                                                    </v-alert>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12">
                                <v-card shaped>
                                    <v-card-title class="text-center">
                                        DEL POLICIA MUNICIPAL DE TRÁNSITO
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row align="center">
                                            <v-col cols="6">
                                                <v-text-field outlined dense label="Número de Identificación" v-model="boleta.COD_CHAPA" :rules="[v => !!v || 'Item is required']" hide-details required></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-autocomplete hide-details outlined dense label="Delegación No." 
                                                v-model="boleta.NUM_DELEGACION" :search-input.sync="buscar_delegacion" :items="items_delegaciones" item-text="DESCRIPCION" item-value="NUM_DELEGACION" :rules="[v => !!v || 'Item is required']" hide-no-data required></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="6">
                                <v-card shaped>
                                    <v-card-title class="text-center">
                                        OBSERVACIONES
                                    </v-card-title>
                                    <v-card-text>
                                        <v-checkbox dense hide-details v-model="boleta.CONDUCTOR_AUSENTE" label="Conductor ausente" value="S"></v-checkbox>
                                        <v-checkbox dense hide-details v-model="boleta.CONDUCTOR_NOFIRMA" label="Se negó a firmar la boleta" value="S"></v-checkbox>
                                        <v-textarea hide-details outlined dense no-resize label="Otros" class="pt-4"
                                                v-model="boleta.OTROS" required></v-textarea>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                        </v-row>
                        
                    </v-container>
                <!-- <small>*indicates required field</small> -->
                </v-card-text>
            
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" dark @click="dialog = false">Cerrar</v-btn>
                    <v-btn color="green darken-1" dark @click.stop="edit_mode ? editarBoleta() : registrarBoleta()">{{ edit_mode ? 'Editar' : 'Guardar' }}</v-btn>
                </v-card-actions>
            </v-card>
           
        </v-dialog>
        </v-form>
    </div>
</template>

<script>

    import axios from 'axios'
    import moment from 'moment'

    export default {
        props: {
            no_boleta: {
                type: String,
                default: null,
                required: false
            },
            edit_mode: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        data(){
            return{
                dialog: false,
                disabled: false,
                readonly: false,
                loading: false,
                flat: false,
                inset: false,
                error: false,
                success: false,
                mandatory: false,
                multiple: false,
                row: false,
                indeterminate: false,
                color: 'accent',
                colors: [
                    'accent',
                    'teal',
                    'blue',
                    'error',
                    'success',
                ],
                items_infracciones: [],
                items_delegaciones: [],
                boleta: {
                    SERIE_BOLETA: null,
                    NUM_BOLETA: null,
                    TIPO_PLACA: null,
                    NUM_PLACA: null,
                    NUM_CIRCULACION: null,
                    TIPO_VEHICULO: null,
                    MARCA: null,
                    COLOR: null,
                    APELLIDOS: null,
                    NOMBRE: null,
                    DIRECCION: null,
                    NUM_LICENCIA: null,
                    CLASE_LICENCIA: null,
                    LUGAR_REMISION: null,
                    HORAREMISION: null,
                    FECHA_REMISION: null,
                    COD_CHAPA: null,
                    CONDUCTOR_AUSENTE: null,
                    CONDUCTOR_NOFIRMA: null,
                    INFRACCION: null,
                    INFRACCIONES: [],
                    OTROS: null
                },
                INFRACCIONES: [],
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                modalFecha: false,
                modalHora: false,
                title_text: '',
                loadingDetail: false,
                valid: true,
                tipos_placa: ['P', 'A', 'C', 'U', 'TRC', 'M', 'TC', 'O', 'CD', 'CC', 'MI'],
                dateFormatted: null,
                date: null,
                buscar_remision: null,
                buscar_delegacion: null
            }
        },
        methods: {
            registrarBoleta(){
                // 
                if ( this.$refs.form.validate() && this.INFRACCIONES.length > 0) {

                    // this.snackbar = true
                    this.boleta.FECHA_REMISION = this.computedDateFormattedMomentjs

                    let data = {
                        name: "registrar_boleta",
                        param: {
                            boleta: this.boleta,
                            infracciones: this.INFRACCIONES
                        }
                    }

                    console.log(data)

                    axios
                    .post(process.env.VUE_APP_API_URL, data)
                    .then(response => {

                        if (response.data.response.status != 200) {
                                
                            Swal.fire({
                                icon: 'error',
                                title: 'Error ' + response.data.response.status,
                                text: response.data.response.message,
                            })

                        }else{

                            Swal.fire(
                                'Excelente!',
                                'La boleta ha sido registrada exitosamente!',
                                'success'
                            ).then(() => {

                                this.$root.$emit('reload-boletas')
                                this.dialog = false

                            })
                        }

                    })

                }else{

                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Existen campos que debe completar!',
                    })

                }

            },
            detalleBoleta(){

                this.loadingDetail = true

                let data = {
                    name: "detalle_boleta",
                    param: {
                        boleta: this.no_boleta
                    }
                }

                axios
                .post(process.env.VUE_APP_API_URL, data)
                .then(response => {

                    this.loadingDetail = false
                    this.boleta = response.data.response.result
                    this.INFRACCIONES = this.boleta.INFRACCIONES
                    this.date = this.boleta.FECHA_REMISION
                    this.items_delegaciones = this.boleta.DELEGACIONES

                })

            },
            reset(){

                this.valid = true

                this.boleta = {
                    SERIE_BOLETA: null,
                    NUM_BOLETA: null,
                    TIPO_PLACA: null,
                    NUM_PLACA: null,
                    NUM_CIRCULACION: null,
                    TIPO_VEHICULO: null,
                    MARCA: null,
                    COLOR: null,
                    APELLIDOS: null,
                    NOMBRE: null,
                    DOMICILIO: null,
                    NUM_LICENCIA: null,
                    CLASE_LICENCIA: null,
                    LUGAR_REMISION: null,
                    HORAREMISION: null,
                    FECHA_REMISION: null,
                    COD_CHAPA: null,
                    CONDUCTOR_AUSENTE: null,
                    CONDUCTOR_NOFIRMA: null,
                    INFRACCION: null,
                    INFRACCIONES: [],
                    OTROS: null
                }

                this.date = null
                this.INFRACCIONES = []
            },
            editarBoleta(){

                if (this.$refs.form.validate() && this.INFRACCIONES.length > 0) {

                    this.boleta.FECHA_REMISION = this.computedDateFormattedMomentjs

                    let data = {
                        name: "editar_boleta",
                        param: {
                            boleta: this.boleta,
                            infracciones: this.INFRACCIONES
                        }
                    }

                    axios
                    .post(process.env.VUE_APP_API_URL, data)
                    .then(response => {

                        console.log(response.data)

                        Swal.fire(
                            'Excelente!',
                            'La boleta ha sido editada exitosamente!',
                            'success'
                        ).then(() => {

                            this.$root.$emit('reload-boletas')
                            this.dialog = false
                            

                        })

                    })

                }else{

                     Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Existen campos que debe completar!',
                    })

                }

            },
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            agregarInfraccion(){

                this.INFRACCIONES.push(this.boleta.INFRACCION)

                console.log(this.INFRACCIONES)

            },
            eliminar_infraccion(index){

                this.INFRACCIONES.splice(index, 1)

            }
        },
        watch: {
            no_boleta: function(val){

                console.log(val)

                if (val) {
                    
                    this.title_text = "Editar Remisión"
                    this.detalleBoleta()

                }else{

                    this.title_text = "Agregar Remisión"
                    this.reset()
                    this.$refs.form.resetValidation()
                    
                }

            },
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            },
            // buscar_remision: function(val){

            //     console.log(val)

            //     let data = {
            //         name: "obtener_infracciones",
            //         param: {

            //         }
            //     }

            //     axios
            //     .post(process.env.VUE_APP_API_URL, data)
            //     .then(response => {

            //         this.items_infracciones = response.data.response.result

            //     })

            // },
            // buscar_delegacion: function(val){

            //     let data = {
            //         name: "obtener_delegaciones",
            //         param: {

            //         }
            //     }

            //     axios
            //     .post(process.env.VUE_APP_API_URL, data)
            //     .then(response => {

            //         this.items_delegaciones = response.data.response.result

            //     })

            // }
        },
        computed: {
            computedDateFormatted () {
                return this.formatDate(this.date)
            },
            computedDateFormattedMomentjs () {
                return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
            },
            computedTime(){

                return this.boleta.HORAREMISION ? this.boleta.HORAREMISION : ''

            },
            subtotal(){

                let subtotal = 0;

                this.INFRACCIONES.forEach(element => {
                    
                    subtotal = subtotal + parseInt(element.MONTO) 

                });

                return subtotal

            }
        },  
        mounted(){

            this.$root.$on('open-modal', () =>{

                if (this.edit_mode) {
                    
                    this.title_text = "Editar Remisión"
                    // this.$refs.form.resetValidation()

                }else{

                    this.title_text = "Agregar Remisión"
                    this.reset()
                    this.$refs.form.resetValidation()

                    // Obtener autocomplete
                    let data = {
                        name: "obtener_delegaciones",
                        param: {
                        }
                    }

                    axios
                    .post(process.env.VUE_APP_API_URL, data)
                    .then(response => {

                        this.items_delegaciones = response.data.response.result

                    })

                    let data1 = {
                        name: "obtener_infracciones",
                        param: {
                        }
                    }

                    axios
                    .post(process.env.VUE_APP_API_URL, data1)
                    .then(response => {

                        this.items_infracciones = response.data.response.result

                    })

                }

                this.dialog = true

                
            })

        }
    }
</script>