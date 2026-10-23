import { fail } from '@sveltejs/kit';
import { RESEND_API_KEY, CONTACT_FORM_TO, CONTACT_FORM_FROM } from '$app/env/private';
import { Resend } from 'resend';
import type { Actions } from './$types';

const TIPOS_VALIDOS = [
	'Pedido de tejidos',
	'Solicitud de muestras',
	'Proyecto a medida',
	'Colaboración',
	'Otro'
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_REGEX = /^[+\d\s().-]{6,20}$/;

const limpiar = (valor: FormDataEntryValue | null) =>
	typeof valor === 'string' ? valor.trim() : '';

const escapar = (valor: string) =>
	valor.replace(
		/[&<>"']/g,
		(caracter) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;'
			})[caracter] ?? caracter
	);

export const actions = {
	default: async ({ request }) => {
		const datos = await request.formData();

		const nombre = limpiar(datos.get('nombre'));
		const email = limpiar(datos.get('email'));
		const telefono = limpiar(datos.get('telefono'));
		const tipo = limpiar(datos.get('tipo'));
		const mensaje = limpiar(datos.get('mensaje'));
		const privacidad = datos.get('privacidad') === 'on';

		// Honeypot: los bots suelen rellenar campos ocultos.
		if (limpiar(datos.get('sitio_web')) !== '') {
			return {
				success: true,
				mensaje: 'Gracias por escribirnos. Te responderemos en 24 – 48 h laborables.'
			};
		}

		const valores = { nombre, email, telefono, tipo, mensaje };
		const errores: Record<string, string> = {};

		if (nombre.length < 2) {
			errores.nombre = 'Indica tu nombre (mínimo 2 caracteres).';
		} else if (nombre.length > 100) {
			errores.nombre = 'El nombre no puede superar los 100 caracteres.';
		}

		if (!EMAIL_REGEX.test(email)) {
			errores.email = 'Introduce un email válido.';
		}

		if (telefono !== '' && !TELEFONO_REGEX.test(telefono)) {
			errores.telefono = 'Introduce un teléfono válido.';
		}

		if (!TIPOS_VALIDOS.includes(tipo)) {
			errores.tipo = 'Selecciona un tipo de consulta.';
		}

		if (mensaje.length < 10) {
			errores.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
		} else if (mensaje.length > 5000) {
			errores.mensaje = 'El mensaje no puede superar los 5000 caracteres.';
		}

		if (!privacidad) {
			errores.privacidad = 'Debes aceptar la política de privacidad.';
		}

		if (Object.keys(errores).length > 0) {
			return fail(400, { success: false, errores, valores });
		}

		const apiKey = RESEND_API_KEY;
		const destinatario = CONTACT_FORM_TO;
		const remitente = CONTACT_FORM_FROM;

		if (!apiKey || !destinatario) {
			console.error(
				'[contacto] Faltan las variables de entorno RESEND_API_KEY y/o CONTACT_FORM_TO.'
			);

			return fail(500, {
				success: false,
				errores: {},
				valores,
				mensaje: 'El formulario no está configurado. Inténtalo de nuevo más tarde.'
			});
		}

		const resend = new Resend(apiKey);

		const html = `
			<div style="font-family: Georgia, 'Times New Roman', serif; color: #1c1917; line-height: 1.6;">
				<h1 style="font-size: 20px; margin: 0 0 16px;">Nueva consulta desde la web</h1>
				<table style="border-collapse: collapse; font-size: 14px;">
					<tr>
						<td style="padding: 4px 16px 4px 0; color: #78716c;">Nombre</td>
						<td style="padding: 4px 0;">${escapar(nombre)}</td>
					</tr>
					<tr>
						<td style="padding: 4px 16px 4px 0; color: #78716c;">Email</td>
						<td style="padding: 4px 0;">${escapar(email)}</td>
					</tr>
					<tr>
						<td style="padding: 4px 16px 4px 0; color: #78716c;">Teléfono</td>
						<td style="padding: 4px 0;">${escapar(telefono) || 'No indicado'}</td>
					</tr>
					<tr>
						<td style="padding: 4px 16px 4px 0; color: #78716c;">Tipo de consulta</td>
						<td style="padding: 4px 0;">${escapar(tipo)}</td>
					</tr>
				</table>
				<h2 style="font-size: 16px; margin: 24px 0 8px;">Mensaje</h2>
				<p style="font-size: 14px; margin: 0; white-space: pre-line;">${escapar(mensaje)}</p>
			</div>
		`;

		const texto = [
			'Nueva consulta desde la web',
			'',
			`Nombre: ${nombre}`,
			`Email: ${email}`,
			`Teléfono: ${telefono || 'No indicado'}`,
			`Tipo de consulta: ${tipo}`,
			'',
			'Mensaje:',
			mensaje
		].join('\n');

		try {
			const { error } = await resend.emails.send({
				from: remitente,
				to: [destinatario],
				replyTo: email,
				subject: `Nueva consulta · ${tipo} · ${nombre}`,
				html,
				text: texto
			});

			if (error) {
				console.error('[contacto] Resend devolvió un error:', error);

				return fail(502, {
					success: false,
					errores: {},
					valores,
					mensaje: 'No hemos podido enviar tu consulta. Inténtalo de nuevo en unos minutos.'
				});
			}
		} catch (error) {
			console.error('[contacto] Error inesperado al enviar el email:', error);

			return fail(500, {
				success: false,
				errores: {},
				valores,
				mensaje: 'No hemos podido enviar tu consulta. Inténtalo de nuevo en unos minutos.'
			});
		}

		return {
			success: true,
			mensaje: 'Gracias por escribirnos. Te responderemos en 24 – 48 h laborables.'
		};
	}
} satisfies Actions;
