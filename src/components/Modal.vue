<script setup>
    import { ref, computed } from 'vue'
    import Alerta from './Alerta.vue'
    import cerrarModal from '../assets/img/cerrar.svg'

    const error = ref('')

    const emit = defineEmits(['ocultar-modal', 'guardar-gasto', 'update:nombre', 'update:cantidad', 'update:categoria', 'eliminar-gasto'])
    const props = defineProps({
        modal: {
            type: Object,
            default: true
        },
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: [String, Number],
            required: true
        },
        categoria: {
            type: String,
            required: true
        },
        disponible: {
            type: Number,
            required: true
        },
        id: {
            type: [String, null],
            required: true
        }
    })

    const old = props.cantidad

    const agregarGasto = () => {
        // Validar que no haya campos vacíos
        const { nombre, cantidad, categoria, disponible, id } = props
        if ([nombre, cantidad, categoria].includes('')) {
            error.value = 'Todos los campos son obligatorios'

            setTimeout(() => {
                error.value = ''
            }, 3000)
            return
        }
        // Validar que la cantidad sea un número positivo
        if (cantidad <= 0) {
            error.value = 'Cantidad no válida'

            setTimeout(() => {
                error.value = ''
            }, 3000)
            return
        }

        // Validar que la cantidad no exceda el presupuesto
        if(id) {
            // Tomar en cuenta el gasto existente
            if(cantidad > old + disponible) {
                error.value = 'Cantidad no válida, excede el presupuesto'
                setTimeout(() => {
                    error.value = ''
                }, 3000)
                return
            }
        } else {
            if(cantidad > disponible) {
                error.value = 'Cantidad no válida, excede el presupuesto'
                setTimeout(() => {
                    error.value = ''
                }, 3000)
                return
            }
        }
        
        // Validar que el nombre no sea un número
        if (!isNaN(nombre)) {
            error.value = 'Nombre no válido'

            setTimeout(() => {
                error.value = ''
            }, 3000)
            return
        }

        emit('guardar-gasto')
    }

    const isEditing = computed(() => {
        return props.id !== null
    })
</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img 
                :src="cerrarModal"
                alt="Cerrar Modal"
                @click="emit('ocultar-modal')"
            />
        </div>

        <div class="contenedor contenedor-formulario"
            :class="[modal.animar ? 'animar' : 'cerrar']"
        >
            <form 
                class="nuevo-gasto"
                @submit.prevent="agregarGasto"
            >
                <legend>{{ isEditing ? 'Editar Gasto' : 'Añadir Gasto' }}</legend>

                <Alerta v-if="error">{{ error }}</Alerta>

                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="Añade el Nombre del Gasto"
                        :value="nombre"
                        @input="$emit('update:nombre', $event.target.value)"
                        />
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad en DOP:</label>
                    <input 
                        type="number"
                        id="cantidad"
                        placeholder="Añade la Cantidad del Gasto, ej: 300"
                        :value="cantidad"
                        @input="$emit('update:cantidad', +$event.target.value)"
                        />
                </div>

                <div class="campo">
                    <label for="categoria">Categoría:</label>
                    <select id="categoria"
                        :value="categoria"
                        @input="$emit('update:categoria', $event.target.value)"
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="combustible">Combustible</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit"
                    :value="[ isEditing ? 'Guardar Cambios' : 'Añadir Gasto']">
            </form>

            <button
                tyoe="button"
                class="btn-eliminar"
                v-if="isEditing"
                @click="emit('eliminar-gasto')"
            >
                Eliminar Gasto
            </button>
        </div>

    </div>
</template>


<style scoped>
    .modal {
        position: absolute;
        background-color: rgb( 0 0 0 / 0.9);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .cerrar-modal {
        position: absolute;
        top: 3rem;
        right: 3rem;
    }
    .cerrar-modal img {
        width: 3rem;
        cursor: pointer;
    }

    .contenedor-formulario {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;
    }
    .contenedor-formulario.animar {
        opacity: 1;
    }

    .contenedor-formulario.cerrar {
        opacity: 0;
    }

    .nuevo-gasto {
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
    }
    .nuevo-gasto legend {
        color: var(--blanco);
        font-size: 3rem;
        text-align: center;
        font-weight: 700;
    }
    .campo {
        display: grid;
        gap: 2rem;    
    }
    .nuevo-gasto input,
    .nuevo-gasto select {
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
    }
    .nuevo-gasto label {
        color: var(--blanco);
        font-size: 3rem;
    }
    .nuevo-gasto input[type="submit"] {
        background-color: var(--azul);
        color: var(--blanco);
        font-weight: 700;
        cursor: pointer;
        border: none;
    }
    .nuevo-gasto input[type="submit"]:hover {
        background-color: var(--azul-oscuro);
        transition: background-color 0.3s ease;
    }
    .btn-eliminar {
        background-color: #ef4444;
        color: var(--blanco);
        font-weight: 700;
        font-size: 2.1rem;
        cursor: pointer;
        border: none;
        margin-top: 3rem;
        padding: 1rem;
        width: 100%;
        border-radius: 1rem;
    }
</style>