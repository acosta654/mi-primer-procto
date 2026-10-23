import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	RESEND_API_KEY: {
		description: 'API key de Resend para enviar los emails del formulario de contacto.',
		schema: (valor) => valor ?? ''
	},
	CONTACT_FORM_TO: {
		description: 'Buzón que recibe las consultas del formulario de contacto.',
		schema: (valor) => valor ?? ''
	},
	CONTACT_FORM_FROM: {
		description: 'Remitente verificado en Resend.',
		schema: (valor) => valor ?? 'Trama Studio <onboarding@resend.dev>'
	}
});
