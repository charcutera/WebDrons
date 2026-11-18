const requiredFields = [
  'title',
  'firstName',
  'surname',
  'dateOfBirth',
  'postcode',
  'address1',
  'city',
  'country',
  'purpose',
  'policyStartDate',
  'policyholderName',
  'policyholderPostcode',
  'policyholderAddress1',
  'policyholderCity',
  'policyholderCountry',
  'policyholderTerritory',
  'publicAuthorityWork',
  'militaryWork',
  'recentClaims',
  'droneCount',
  'droneMtow',
  'prototypeDrones',
  'nonPrototypeDrones',
  'ownedAirborneEquipment',
  'ownedGroundEquipment',
  'hiredEquipment',
  'publicLiability',
  'coverDuration',
  'declarationsAgreement',
]

const fieldLabels = {
  title: 'Tratamiento',
  firstName: 'Nombre',
  surname: 'Apellidos',
  dateOfBirth: 'Fecha de nacimiento',
  postcode: 'Código postal',
  address1: 'Dirección',
  address2: 'Dirección adicional',
  address3: 'Dirección adicional',
  city: 'Ciudad',
  county: 'Provincia o región',
  country: 'País',
  purpose: 'Finalidad de operación',
  businessName: 'Nombre de empresa o persona',
  email: 'Correo electrónico',
  workPhone: 'Teléfono del trabajo',
  mobilePhone: 'Teléfono móvil',
  policyStartDate: 'Fecha de inicio de cobertura',
  regulationCompliance: 'Acepta cumplir la normativa',
  policyholderName: 'Titular de la póliza',
  policyholderPostcode: 'Código postal del titular',
  policyholderAddress1: 'Dirección del titular',
  policyholderAddress2: 'Dirección adicional del titular',
  policyholderAddress3: 'Dirección adicional del titular',
  policyholderCity: 'Ciudad del titular',
  policyholderCounty: 'Provincia o región del titular',
  policyholderCountry: 'País del titular',
  policyholderTerritory: 'Territorio de residencia del titular',
  publicAuthorityWork: 'Trabajos para organismos públicos',
  publicAuthorityWorkDetails: 'Detalles de trabajos para organismos públicos',
  militaryWork: 'Trabajos militares con fuego real u operaciones tácticas',
  recentClaims: 'Accidentes o reclamaciones en los últimos 3 años',
  droneCount: 'Número total de drones',
  droneMtow: 'MTOW del dron más pesado',
  prototypeDrones: 'Opera drones prototipo',
  nonPrototypeDrones: 'Opera drones no prototipo',
  ownedAirborneEquipment: 'Cobertura para equipo aéreo propio',
  ownedAirborneValue: 'Valor del equipo aéreo propio',
  ownedGroundEquipment: 'Cobertura para equipo terrestre propio',
  ownedGroundValue: 'Valor del equipo terrestre propio',
  hiredEquipment: 'Cobertura para equipo alquilado',
  equipmentHirerName: 'Nombre del arrendador',
  equipmentHirerEmail: 'Correo del arrendador',
  hiredEquipmentValue: 'Valor del equipo alquilado',
  hireChargesUnderLimit: 'Cargos de alquiler no superan 30.000 €',
  ongoingHireCharges: 'Cargos continuos de alquiler',
  publicLiability: 'Incluye responsabilidad civil',
  liabilityLimit: 'Límite de indemnización',
  coverDuration: 'Duración de cobertura',
  declarationsAgreement: 'Acepta las declaraciones',
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function validateSubmission(body) {
  if (!isObject(body) || !isObject(body.formData) || !Array.isArray(body.drones)) {
    return 'El formato de la solicitud no es válido.'
  }

  if (typeof body.submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) {
    return 'No se ha podido identificar la solicitud.'
  }

  if (JSON.stringify(body).length > 40000 || body.drones.length < 1 || body.drones.length > 100) {
    return 'La solicitud supera el tamaño permitido.'
  }

  const { formData, drones } = body
  if (requiredFields.some((field) => typeof formData[field] !== 'string' || !formData[field].trim())) {
    return 'Completa todos los campos obligatorios antes de enviar.'
  }

  if (formData.declarationsAgreement !== 'Sí') {
    return 'Debes aceptar las declaraciones para enviar la solicitud.'
  }

  if (formData.purpose === 'Commercial' && !formData.businessName?.trim()) {
    return 'Indica el nombre de la empresa o persona.'
  }

  if (formData.publicAuthorityWork === 'Sí' && !formData.publicAuthorityWorkDetails?.trim()) {
    return 'Añade los detalles del trabajo para organismos públicos.'
  }

  if (formData.ownedAirborneEquipment === 'Sí' && !formData.ownedAirborneValue?.trim()) {
    return 'Indica el valor del equipo aéreo propio.'
  }

  if (formData.ownedGroundEquipment === 'Sí' && !formData.ownedGroundValue?.trim()) {
    return 'Indica el valor del equipo terrestre propio.'
  }

  if (formData.hiredEquipment === 'Sí') {
    if (!formData.equipmentHirerName?.trim() || !formData.hiredEquipmentValue?.trim() || !formData.hireChargesUnderLimit) {
      return 'Completa los datos obligatorios del equipo alquilado.'
    }
    if (formData.hireChargesUnderLimit === 'No' && !formData.ongoingHireCharges?.trim()) {
      return 'Indica los cargos continuos de alquiler.'
    }
  }

  if (formData.publicLiability === 'Sí' && !formData.liabilityLimit) {
    return 'Selecciona el límite de indemnización.'
  }

  if (formData.email && (typeof formData.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) {
    return 'El correo electrónico de contacto no es válido.'
  }

  if (drones.some((drone) => !isObject(drone) || typeof drone.make !== 'string' || !drone.make.trim() || typeof drone.model !== 'string' || !drone.model.trim())) {
    return 'Indica la marca y el modelo de cada dron.'
  }

  return null
}

function createEmailText(formData, drones) {
  const clientDetails = Object.entries(formData)
    .map(([key, value]) => `- ${fieldLabels[key] || key}: ${String(value)}`)
    .join('\n')
  const droneDetails = drones.map((drone, index) => [
    `Dron ${index + 1}`,
    `- Marca: ${drone.make}`,
    `- Modelo: ${drone.model}`,
    `- Número de serie o matrícula: ${drone.serial || 'No indicado'}`,
    `- Año de fabricación: ${drone.year || 'No indicado'}`,
  ].join('\n')).join('\n\n')

  return `Nueva solicitud de presupuesto\n\nDATOS DE LA SOLICITUD\n${clientDetails}\n\nDATOS DE LOS DRONES\n${droneDetails}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  const origin = req.headers.origin
  let originHost
  try {
    originHost = new URL(origin).host.toLowerCase()
  } catch {
    return res.status(403).json({ error: 'Origen de la solicitud no permitido.' })
  }
  if (originHost !== String(req.headers.host || '').toLowerCase()) {
    return res.status(403).json({ error: 'Origen de la solicitud no permitido.' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'El contenido de la solicitud no es válido.' })
    }
  }

  const validationError = validateSubmission(body)
  if (validationError) return res.status(400).json({ error: validationError })

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, QUOTE_FROM_EMAIL } = process.env
  const recipient = process.env.QUOTE_RECIPIENT_EMAIL || 'ingridlaragob@gmail.com'
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !RESEND_API_KEY || !QUOTE_FROM_EMAIL) {
    console.error('Falta configurar una o más variables de entorno para enviar presupuestos.')
    return res.status(503).json({ error: 'El envío aún no está configurado. Inténtalo más tarde.' })
  }

  try {
    const databaseResponse = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/quote_submissions?on_conflict=id`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        id: body.submissionId,
        form_data: body.formData,
        drones: body.drones,
        submitted_at: new Date().toISOString(),
      }),
    })

    if (!databaseResponse.ok) {
      console.error('No se pudo guardar una solicitud en la base de datos. Estado:', databaseResponse.status)
      return res.status(502).json({ error: 'No se han podido guardar las respuestas. Inténtalo de nuevo.' })
    }

    const email = {
      from: QUOTE_FROM_EMAIL,
      to: [recipient],
      subject: `Nueva solicitud de presupuesto — ${body.formData.firstName} ${body.formData.surname}`.replace(/[\r\n]/g, ' '),
      text: createEmailText(body.formData, body.drones),
    }
    if (body.formData.email) email.reply_to = body.formData.email

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': body.submissionId,
      },
      body: JSON.stringify(email),
    })

    if (!emailResponse.ok) {
      console.error('La solicitud se guardó, pero Resend no pudo enviar el aviso. Estado:', emailResponse.status)
      return res.status(502).json({ error: 'Las respuestas se han guardado, pero no se pudo enviar el correo. Vuelve a intentarlo.' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Error al procesar una solicitud de presupuesto.', error)
    return res.status(500).json({ error: 'No se ha podido procesar la solicitud. Inténtalo de nuevo.' })
  }
}
