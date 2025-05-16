<script setup>
import { formatearCantidad, formatearFecha } from '../helpers';
    import IconoAhorro from '../assets/img/icono_ahorro.svg'
    import IconoCasa from '../assets/img/icono_casa.svg'
    import IconoComida from '../assets/img/icono_comida.svg'
    import IconoGastos from '../assets/img/icono_gastos.svg'
    import IconoOcio from '../assets/img/icono_ocio.svg'
    import IconoSalud from '../assets/img/icono_salud.svg'
    import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'
    import IconoCombustible from '../assets/img/icono_combustible.png'

    const diccionarioIconos = {
        ahorro : IconoAhorro,
        comida : IconoComida,
        casa : IconoCasa,
        gastos : IconoGastos,
        ocio : IconoOcio,
        salud : IconoSalud,
        suscripciones : IconoSuscripciones,
        combustible : IconoCombustible
    }

    const props = defineProps({
        gasto: {
            type: Object,
            required: true
        }
    })
    defineEmits(['seleccionar-gasto'])
</script>

<template>
    <div class="gasto sombra">
        <div class="contenido">
            <div class="icono-container">
        <img 
            class="icono"
            @click="$emit('seleccionar-gasto', gasto.id)"
            :src="diccionarioIconos[gasto.categoria]"
            alt="Icono Gasto" 
        />
            <span class="hover-text">Editar</span>
            </div>
            <div class="detalles">
                <p class="categoria">{{ gasto.categoria }}</p>
                <p 
                    class="nombre"
                    @click="$emit('seleccionar-gasto', gasto.id)"
                > {{ gasto.nombre }}
                <span class="hover-text">Editar</span>
                </p>
                <p class="fecha">
                    Fecha:
                    <span>{{ formatearFecha (gasto.fecha) }}</span>
                </p>
            </div>
        </div>
        <p class="cantidad">{{ formatearCantidad( gasto.cantidad ) }}</p>
    </div>
</template>


<style scoped>

    .gasto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    .contenido{
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    .icono {
        width: 5rem;
        cursor: pointer;
    }
    .icono-container {
    position: relative;
    display: inline-block;
}

.icono-container .hover-text {
    position: absolute;
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--gris-oscuro);
    color: white;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.icono-container:hover .hover-text {
    opacity: 1;
}
    .detalles p {
        margin: 0 0 1rem 0;
    }
    .categoria{
        color: var(--gris);
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: 900;
    }
    .nombre{
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--gris-oscuro);
        cursor: pointer;
        position: relative;
    }
    .nombre .hover-text {
    position: absolute;
    top: -1.5rem;
    left: 0;
    background-color: var(--gris-oscuro);
    color: white;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.nombre:hover .hover-text {
    opacity: 1;
}
    .fecha{
        font-size: 1.6rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }
    .fecha span{
        font-weight: 400;
    }
    .cantidad{
        font-size: 3rem;
        font-weight: 900;
        margin: 0;
    }
</style>