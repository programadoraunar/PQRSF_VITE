/**
 * Genera las propiedades de animación para un efecto de desvanecimiento (fadeIn).
 *
 * @function
 * @param {('up'|'down'|'left'|'right')} direction - La dirección desde la cual el elemento se desvanece al aparecer.
 * @param {number} delay - El tiempo de retraso antes de que comience la animación, en segundos.
 * @returns {Object} - Un objeto con las propiedades de animación para usar con una biblioteca de animación, como Framer Motion.
 * 
 * @example
 * const animationProps = fadeIn('up', 0.5);
 * 
 * @property {Object} hidden - Propiedades de estilo para el estado oculto antes de la animación.
 * @property {number} hidden.y - La posición vertical inicial basada en la dirección.
 * @property {number} hidden.opacity - La opacidad inicial.
 * @property {number} hidden.x - La posición horizontal inicial basada en la dirección.
 * @property {Object} hidden.transition - Propiedades de transición para la animación.
 * @property {string} hidden.transition.type - El tipo de transición.
 * @property {number} hidden.transition.duration - La duración de la transición.
 * @property {number} hidden.transition.delay - El retraso antes de que comience la transición.
 * @property {Array<number>} hidden.transition.ease - La curva de facilidad para la transición.
 * 
 * @property {Object} show - Propiedades de estilo para el estado visible después de la animación.
 * @property {number} show.y - La posición vertical final.
 * @property {number} show.x - La posición horizontal final.
 * @property {number} show.opacity - La opacidad final.
 * @property {Object} show.transition - Propiedades de transición para la animación.
 * @property {string} show.transition.type - El tipo de transición.
 * @property {number} show.transition.duration - La duración de la transición.
 * @property {number} show.transition.delay - El retraso antes de que comience la transición.
 * @property {Array<number>} show.transition.ease - La curva de facilidad para la transición.
 */
export const fadeIn = (direction, delay) => {
	return {
		hidden: {
			y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
			opacity: 0,
			x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
			transition: {
				type: 'tween',
				duration: 1.5,
				delay: delay,
				ease: [0.25, 0.6, 0.3, 0.8],
			},
		},
		show: {
			y: 0,
			x: 0,
			opacity: 1,
			transition: {
				type: 'tween',
				duration: 1.4,
				delay: delay,
				ease: [0.25, 0.25, 0.25, 0.75],
			},
		},
	};
};
