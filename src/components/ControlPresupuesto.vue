<script setup>
    import { computed } from 'vue'
    import CircleProgress from 'vue3-circle-progress';
    import "vue3-circle-progress/dist/circle-progress.css";
    import { formatearCantidad } from '../helpers';

    defineEmits(['reset-app'])

    const props = defineProps({
        presupuesto: {
            type: Number,
            required: true
        },
        disponible: {
            type: Number,
            required: true
        },
        gastado: {
            type: Number,
            required: true
        }
    })

    const porcentaje = computed(() => {
        return parseInt(((props.presupuesto - props.disponible) / props.presupuesto) * 100)
    })
</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">

            <p class="porcentaje">{{ porcentaje }}%</p>

            <CircleProgress
                :percent="porcentaje"
                :size="250"
                :border-width="30"
                :border-bg-width="25"
                fill-color="#3B82F6"
                empty-color="#E5E7EB"
                />
        </div>
        <div class="contenedor-presupuesto">
            <button 
            class="reset-app"
            type="button"
            @click="$emit('reset-app')"
            >Resetear App
            </button>

            <p>
                <span>Presupuesto:</span>
                {{ formatearCantidad (presupuesto)  }}
            </p>

            <p>
                <span>Disponible:</span>
                {{ formatearCantidad (disponible) }}
            </p>

            <p>
                <span>Gastado:</span>
                {{ formatearCantidad (gastado) }}
            </p>
        </div>
    </div>
</template>

<style scoped>

    .contenedor-grafico{
        position: relative;
    }
    .porcentaje {
        position: absolute;
        margin: auto;
        top: calc(50% - 1.5rem);
        right: 0;
        left: 0;
        text-align: center;
        z-index: 100;
        font-size: 4rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }
    .dos-columnas {
        display: flex;
        flex-direction: column;
    }

    .dos-columnas > :first-child {
        margin-bottom: 3rem;
    }

    @media (min-width: 768px) {
        .dos-columnas {
            flex-direction: row;
            gap: 4rem;
            align-items: center;
        }
        .dos-columnas > :first-child {
        margin-bottom: 3rem;
        }
    }

    .reset-app {
        background-color: #DB2777;
        border: none;
        padding: 1rem;
        width: 100%;
        color: var(--blanco);
        font-weight: 600;
        text-transform: uppercase;
        border-radius: 1rem;
        cursor: pointer;
        transition-property: background-color;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }

    .reset-app:hover {
        background-color: #c11d67;
    }

    .contenedor-presupuesto {
        width: 100%;
    }

    .contenedor-presupuesto p {
        font-size: 2.4rem;
        text-align: center;
        color: var(--gris-oscuro);
    }
    @media (min-width: 768px) {
        .contenedor-presupuesto p {
            text-align: left;
        }
    }

    .contenedor-presupuesto span {
        font-weight: 900;
        color: var(--azul);
    }
</style>