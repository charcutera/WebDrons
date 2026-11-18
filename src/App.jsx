import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Compass, FileText, Layers, LifeBuoy, Menu, MessageCircle, Network, Package, PackageCheck, Plane, Plus, Satellite, Scale, Settings, ShieldCheck, Sparkles, X } from 'lucide-react'

const products = [
  { number: '01', title: 'Responsabilidad civil', text: 'Opciones para proteger tu empresa ante reclamaciones por daños a terceros durante una operación.', tag: 'Cobertura para actividad profesional' },
  { number: '02', title: 'Drones y equipos', text: 'Protege los equipos que utilizas en tus servicios, incluidos accesorios y material asegurado.', tag: 'Equipos propios o alquilados' },
  { number: '03', title: 'Actividad profesional', text: 'Valora opciones de cobertura según tus servicios, proyectos y forma de operar.', tag: 'Soluciones para empresas' },
]

const faqs = [
  { q: '¿Qué drones puedo asegurar?', a: 'Aseguramos drones recreativos y profesionales, desde modelos compactos hasta equipos de trabajo especializados. Calculamos la cobertura según el valor y el uso de tu equipo.' },
  { q: '¿Necesito una licencia para contratar el seguro?', a: 'No necesitas una licencia para solicitar presupuesto. Para operar, debes cumplir siempre con la normativa aeronáutica aplicable a tu tipo de vuelo.' },
  { q: '¿Cuándo empieza la cobertura?', a: 'Una vez aceptada la propuesta y confirmado el pago, recibirás la documentación de tu póliza con la fecha de inicio de cobertura.' },
  { q: '¿Puedo asegurar varios drones?', a: 'Sí. Puedes incluir varios equipos en una misma póliza. Cuéntanos qué drones tienes en el formulario y prepararemos una propuesta adecuada.' },
]

const productGroups = [
  { title: 'Responsabilidad civil', label: 'TODAS LAS PÓLIZAS', text: 'Opciones de protección frente a reclamaciones por daños personales o materiales causados a terceros.', icon: ShieldCheck },
  { title: 'Cobertura del equipo', label: 'TODAS LAS PÓLIZAS', text: 'Protección para el dron y los accesorios asegurados ante daños accidentales y otros riesgos incluidos.', icon: Package },
  { title: 'Equipo alquilado o no propio', label: 'TODAS LAS PÓLIZAS', text: 'Opciones para asegurar equipos que utilizas mediante alquiler o que pertenecen a otra persona.', icon: Layers },
  { title: 'Responsabilidad aeronáutica y de producto', label: 'OPCIÓN COMERCIAL', text: 'Coberturas para determinadas responsabilidades derivadas de operaciones aéreas o productos defectuosos.', icon: Compass },
  { title: 'Dron de sustitución', label: 'OPCIÓN COMERCIAL', text: 'Una opción para mantener tus compromisos profesionales si el dron asegurado no está disponible.', icon: Package },
  { title: 'Responsabilidad profesional', label: 'OPCIÓN COMERCIAL', text: 'Protección ante reclamaciones relacionadas con errores u omisiones negligentes en tu actividad.', icon: FileText },
]

const quoteClientFields = [
  { name: 'title', label: 'Tratamiento', type: 'select', required: true, options: ['Sr.', 'Sra.', 'Mx.'] },
  { name: 'firstName', label: 'Nombre', required: true },
  { name: 'surname', label: 'Apellidos', required: true },
  { name: 'dateOfBirth', label: 'Fecha de nacimiento', type: 'date', required: true, help: 'Indica la fecha de nacimiento del contacto principal.' },
  { name: 'postcode', label: 'Código postal de correspondencia', required: true, help: 'Código postal de la dirección de correspondencia.' },
  { name: 'address1', label: 'Dirección, línea 1', required: true },
  { name: 'address2', label: 'Dirección, línea 2' },
  { name: 'address3', label: 'Dirección, línea 3' },
  { name: 'city', label: 'Ciudad / localidad', required: true },
  { name: 'county', label: 'Provincia / región' },
  { name: 'country', label: 'País', type: 'select', required: true, options: ['España', 'Portugal', 'Francia', 'Reino Unido', 'Otro'] },
  { name: 'purpose', label: '¿Con qué finalidad operas?', type: 'select', required: true, options: ['Commercial', 'Recreational', 'Free Flight Examination Cover'], help: 'Selecciona la actividad para la que solicitas cobertura.' },
  { name: 'email', label: 'Correo electrónico de contacto', type: 'email' },
  { name: 'workPhone', label: 'Teléfono del trabajo (fijo)', type: 'tel' },
  { name: 'mobilePhone', label: 'Teléfono móvil', type: 'tel' },
]

const coverageComparison = [
  {
    category: 'Responsabilidad frente a terceros',
    rows: [
      { label: 'Daños a la propiedad de terceros', recreational: true, commercial: true },
      { label: 'Lesiones personales a terceros', recreational: true, commercial: true },
      { label: 'Responsabilidad en tierra del fotógrafo', commercial: true },
      { label: 'Responsabilidad de producto: daños materiales', commercial: true },
      { label: 'Responsabilidad de producto: lesiones corporales', commercial: true },
      { label: 'Responsabilidad civil de aviación (riesgos de guerra)', commercial: true },
      { label: 'Invasión de la intimidad', commercial: true },
      { label: 'Incidentes de responsabilidad sobre datos', commercial: true },
      { label: 'Uso civil de aeródromos del Ministerio de Defensa', commercial: true },
      { label: 'Responsabilidad por deriva de productos químicos', commercial: true },
      { label: 'Responsabilidad civil sobre la carga', commercial: true },
    ],
  },
  {
    category: 'Pérdida o daño accidental del equipo',
    rows: [
      { label: 'Daños accidentales', recreational: true, commercial: true },
      { label: 'Robo', recreational: true, commercial: true },
      { label: 'Pérdida del dron (flyaway)', recreational: true, commercial: true },
      { label: 'Error del piloto', recreational: true, commercial: true },
      { label: 'Pérdida en el agua', recreational: true, commercial: true },
      { label: 'Pérdida de potencia', recreational: true, commercial: true },
      { label: 'Pérdida de enlace de datos', recreational: true, commercial: true },
      { label: 'Impacto con aves', recreational: true, commercial: true },
      { label: 'Fallo mecánico durante el vuelo', recreational: true, commercial: true },
      { label: 'Cobertura durante almacenamiento, transporte y vuelo', recreational: true, commercial: true },
      { label: 'Retirada de restos', recreational: true, commercial: true },
      { label: 'Costes por invasión de propiedad ajena', recreational: true, commercial: true },
      { label: 'Equipo no propio: cargos de alquiler continuados', recreational: true, commercial: true },
    ],
  },
  {
    category: 'Dron de sustitución y continuidad',
    rows: [
      { label: 'Alquiler de un dron de sustitución', commercial: true },
      { label: 'Restablecimiento de datos', commercial: true },
      { label: 'Incompatibilidad de software', recreational: true, commercial: true },
    ],
  },
  {
    category: 'Responsabilidad profesional',
    rows: [
      { label: 'Actos, errores u omisiones negligentes en la actividad empresarial', commercial: true },
    ],
  },
]

const beyondVisualOperations = [
  { text: 'Drones grandes de 500 kilogramos o más', image: true },
  { text: 'Vuelos BVLO, incluidos vuelos subterráneos o en espacios confinados', icon: Satellite },
  { text: 'Múltiples drones a la vez, incluidas formaciones de enjambre de más de 1.000 drones', icon: Network },
  { text: 'Servicios de entrega con drones', icon: PackageCheck },
  { text: 'Espectáculos de luces con drones', icon: Sparkles },
]

const operationTypes = [
  { title: 'Vuelos BVLOS', text: 'Operaciones más allá del alcance visual, incluidas algunas en espacios confinados o de larga distancia.', icon: Compass },
  { title: 'Drones de gran tamaño', text: 'Equipos de gran peso o configuración especial que requieren revisar sus condiciones de operación.', icon: Scale },
  { title: 'Flotas y enjambres', text: 'Operaciones con varios drones, varios pilotos o vuelos coordinados.', icon: Layers },
  { title: 'Entrega con drones', text: 'Servicios de transporte y entrega en entornos urbanos, rurales o mixtos.', icon: Package },
  { title: 'Espectáculos de drones', text: 'Vuelos coordinados para eventos, festivales, producciones y campañas.', icon: Sparkles },
]

const clientSupport = [
  { title: 'Atención humana', text: 'Contacta con el equipo de atención o siniestros y habla directamente con personas.', icon: MessageCircle },
  { title: 'Documentación rápida', text: 'Al contratar, recibes la documentación de tu póliza sin esperar al siguiente día hábil.', icon: FileText },
  { title: 'Apoyo en siniestros', text: 'Coverdrone resolvió el 96% de los siniestros comerciales de drones en 2025. El equipo puede orientarte si lo necesitas.', icon: LifeBuoy },
  { title: 'Tu póliza, bajo control', text: 'Gestiona tu póliza en línea y contacta con el equipo cuando necesites ayuda.', icon: Settings },
]

const heroSlides = [
  {
    src: `${import.meta.env.BASE_URL}images/pexels-magda-ehlers-pexels-34182311.jpg`,
    alt: 'Espectáculo de drones de luz en el cielo nocturno',
  },
  {
    src: `${import.meta.env.BASE_URL}images/pexels-lin-2156561570-35439843.jpg`,
    alt: 'Espectáculo nocturno de drones luminosos sobre edificios',
  },
  {
    src: 'https://images.unsplash.com/photo-1505717927613-21e196737419?auto=format&fit=crop&fm=jpg&q=85&w=1800',
    alt: 'Dron gris claramente visible entre los árboles de un bosque',
  },
  {
    src: 'https://images.unsplash.com/photo-1547044283-81919b74c110?auto=format&fit=crop&fm=jpg&q=85&w=1800',
    alt: 'Profesional pilotando un dron y controlando su cámara',
  },
  {
    src: `${import.meta.env.BASE_URL}images/dron-incendios.jpg`,
    alt: 'Dron apoyando a los equipos de emergencia durante un incendio forestal',
  },
]

const appPath = (path = '') => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const faqCategories = [
  { id: 'recreativo', title: 'Póliza recreativa', text: 'Cobertura, equipo y cambios para vuelos de ocio.', icon: Sparkles },
  { id: 'profesional', title: 'Póliza profesional', text: 'Responsabilidad, actividad y flotas de drones.', icon: Compass },
  { id: 'gestion', title: 'Tu póliza', text: 'Documentación, datos y modificaciones.', icon: Settings },
  { id: 'siniestros', title: 'Siniestros', text: 'Qué hacer y qué información preparar.', icon: LifeBuoy },
  { id: 'vuelos', title: 'Vuelos y normativa', text: 'Territorios, permisos y planificación.', icon: FileText },
  { id: 'otras', title: 'Otras consultas', text: 'Respuestas generales y ayuda personalizada.', icon: CircleHelp },
]

const faqAnswers = {
  recreativo: [
    { q: '¿Qué incluye una póliza recreativa?', a: 'Depende de las opciones contratadas. Puedes consultar coberturas de responsabilidad civil y protección del equipo; la propuesta indica límites, exclusiones y condiciones.' },
    { q: '¿Puedo asegurar el dron y sus accesorios?', a: 'Hay opciones para incluir el equipo utilizado en tus vuelos. Indica los modelos y accesorios que quieres proteger al solicitar presupuesto.' },
    { q: '¿La póliza sirve para viajar?', a: 'La zona geográfica cubierta aparece en las condiciones de la póliza. Compruébala antes de volar fuera de tu territorio habitual.' },
  ],
  profesional: [
    { q: '¿Puedo asegurar varios drones en una póliza?', a: 'Puedes solicitar una propuesta para varios equipos. Incluye los drones y la forma en que se utilizan para que podamos revisar las opciones.' },
    { q: '¿Qué actividades profesionales puedo incluir?', a: 'Cuéntanos si haces fotografía, inspección, producción audiovisual, entregas u otro tipo de operación. La aceptación y las condiciones dependen de la evaluación del riesgo.' },
    { q: '¿Existe cobertura para responsabilidad profesional?', a: 'Puede haber opciones adicionales según la actividad y las condiciones aplicables. Indica el servicio que prestas en tu solicitud.' },
  ],
  gestion: [
    { q: '¿Dónde encuentro los datos y documentos de mi póliza?', a: 'La documentación que recibas al contratar incluye los datos de la póliza y las vías de contacto para resolver dudas o solicitar cambios.' },
    { q: '¿Puedo pedir cambios en una póliza activa?', a: 'Sí, puedes solicitar una modificación. El cambio quedará sujeto a confirmación y a las condiciones de la póliza.' },
    { q: '¿Qué información necesito para pedir un presupuesto?', a: 'Ten a mano tus datos de contacto, el uso del dron, el modelo del equipo y las coberturas que te interesan. Te preguntaremos lo necesario para preparar la propuesta.' },
  ],
  siniestros: [
    { q: '¿Qué hago si ocurre un accidente?', a: 'Prioriza la seguridad de las personas y sigue las indicaciones de las autoridades si procede. Después, consulta tu póliza y contacta con el equipo indicado en la documentación.' },
    { q: '¿Qué datos conviene preparar?', a: 'Prepara la fecha y el lugar, una descripción de lo ocurrido, los datos de las personas implicadas y fotos o documentos disponibles. No compartas más datos personales de los necesarios.' },
    { q: '¿Cuánto tarda la gestión?', a: 'El plazo depende de las circunstancias y de la documentación necesaria. El equipo que gestione el expediente podrá indicarte los siguientes pasos.' },
  ],
  vuelos: [
    { q: '¿Puedo volar en cualquier lugar?', a: 'No. Debes respetar las restricciones del espacio aéreo y las normas aplicables al lugar y tipo de vuelo. El seguro no sustituye permisos ni autorizaciones.' },
    { q: '¿Qué territorios cubre mi póliza?', a: 'La cobertura territorial y sus exclusiones se indican en las condiciones de cada póliza. Revísalas antes de planificar un vuelo en otro país.' },
    { q: '¿Necesito permisos especiales para una operación avanzada?', a: 'Algunas operaciones requieren permisos o requisitos adicionales. Comprueba la normativa aplicable y comunícanos los detalles para valorar si hay una opción de cobertura.' },
  ],
  otras: [
    { q: '¿Cómo sé qué cobertura se adapta a mí?', a: 'Cuéntanos cómo utilizas el dron, dónde vuelas y qué equipo quieres proteger. Te orientaremos sobre las opciones disponibles.' },
    { q: '¿Puedo pedir ayuda antes de contratar?', a: 'Sí. Puedes enviarnos tus dudas junto con la solicitud de presupuesto y el equipo podrá tenerlas en cuenta al preparar la propuesta.' },
    { q: '¿Dónde puedo plantear una consulta que no aparece aquí?', a: 'Escríbenos desde el formulario de presupuesto y selecciona la opción que más se acerque a tu consulta. Añade los detalles en el campo de comentarios.' },
  ],
}

function App() {
  const [activeFaq, setActiveFaq] = useState(0)
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState(window.location.hash)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const routePath = basePath && currentPath.startsWith(basePath) ? currentPath.slice(basePath.length) || '/' : currentPath
  const isHomePage = routePath === '/'
  const isQuotePage = routePath === '/presupuesto'
  const isProductsPage = routePath === '/productos'
  const isFaqPage = routePath === '/faq'
  const isAboutPage = routePath === '/sobre-nosotros'
  const activeNav = isProductsPage ? 'products' : isAboutPage ? 'about' : isFaqPage ? 'faq' : currentHash === '#nosotros' ? 'about' : currentHash === '#faq' ? 'faq' : isHomePage ? 'home' : ''
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!isHomePage) return undefined
    heroSlides.forEach(({ src }) => {
      const image = new Image()
      image.src = src
    })
  }, [isHomePage])

  useEffect(() => {
    if (!isHomePage) return undefined
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length)
    }, 3000)
    return () => window.clearInterval(interval)
  }, [isHomePage])

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', updateHash)
    const transitionNavigation = (event) => {
      const link = event.target.closest('a[href]')
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return
      event.preventDefault()
      document.documentElement.classList.add('is-leaving')
      window.setTimeout(() => window.location.assign(destination.href), 280)
    }
    document.addEventListener('click', transitionNavigation)
    return () => {
      window.removeEventListener('hashchange', updateHash)
      document.removeEventListener('click', transitionNavigation)
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <a className="brand" href={appPath()} aria-label="SegurosDron, inicio"><span>SEGUROS<span className="brand-light">DRON</span></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a className={activeNav === 'home' ? 'nav-active' : ''} href={appPath()} onClick={closeMenu} aria-current={activeNav === 'home' ? 'page' : undefined}>Inicio</a><a className={activeNav === 'products' ? 'nav-active' : ''} href={appPath('productos')} onClick={closeMenu} aria-current={activeNav === 'products' ? 'page' : undefined}>Nuestros productos</a><a className={activeNav === 'about' ? 'nav-active' : ''} href={appPath('sobre-nosotros')} onClick={closeMenu} aria-current={activeNav === 'about' ? 'page' : undefined}>Sobre nosotros</a><a className={activeNav === 'faq' ? 'nav-active' : ''} href={appPath('faq')} onClick={closeMenu} aria-current={activeNav === 'faq' ? 'page' : undefined}>FAQ</a>
        </nav>
        <a className="header-cta" href={appPath('presupuesto')}>Cotizar precio <ArrowUpRight size={16} /></a>
      </header>

      {isQuotePage ? <QuotePage /> : isProductsPage ? <ProductsPage /> : isAboutPage ? <AboutPage /> : isFaqPage ? <FaqPage /> : <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <h1>El seguro que tu<br /><span>dron necesita.</span></h1>
            <p className="hero-subtitle">Seguro especializado para drones de uso profesional y recreativo. Protege tus vuelos, tus equipos y tu actividad con soluciones del broker de Coverdrone en España.</p>
            <div className="hero-actions"><a className="button-primary" href={appPath('presupuesto')}>Cotizar precio <ArrowRight size={17} /></a></div>
            <div className="about-partner hero-partner"><span>Broker de</span><img src={appPath('images/cropped-coverdrone_logo.png')} alt="Coverdrone" /></div>
          </div>
          <div className="hero-visual">
            <div className="hero-slide-track" style={{ transform: `translateX(-${activeHeroSlide * 100}%)` }}>
              {heroSlides.map((slide, index) => <img key={slide.src} src={slide.src} alt={slide.alt} aria-hidden={activeHeroSlide !== index} />)}
            </div>
            <div className="image-shade" />
            <div className="floating-card"><div className="floating-icon"><ShieldCheck size={20} /></div><div><strong>Especialistas en drones</strong><span>Apoyo para operaciones profesionales</span></div></div>
            <div className="hero-slide-dots" role="group" aria-label="Seleccionar imagen del banner">
              {heroSlides.map((slide, index) => <button key={slide.src} type="button" className={activeHeroSlide === index ? 'hero-slide-dot hero-slide-dot-active' : 'hero-slide-dot'} onClick={() => setActiveHeroSlide(index)} aria-label={`Mostrar imagen ${index + 1}`} aria-pressed={activeHeroSlide === index} />)}
            </div>
          </div>
        </section>

        <section className="beyond-visual section-wrap">
          <div className="beyond-visual-heading"><h2>Podemos asegurar</h2></div>
          <ul>{beyondVisualOperations.map(({ text, icon: Icon, image }) => <li key={text}><span className="beyond-visual-icon">{image ? <img src={appPath('images/drone-icon.png')} alt="" /> : <Icon size={36} />}</span><p>{text}</p></li>)}</ul>
        </section>

        <section className="products section-wrap" id="productos">
          <div className="section-top"><div><h2>Tu operación aérea.<br /><span>Bien protegida.</span></h2></div></div>
          <div className="product-grid">{products.map((product) => <article className="product-card" key={product.number}><div className="product-card-top"><span>{product.number}</span></div><h3>{product.title}</h3><p>{product.text}</p><div className="product-card-bottom"><span>{product.tag}</span></div></article>)}</div>
          <div className="products-note"><span><Check size={15} /> Opciones para actividad profesional</span><span><Check size={15} /> Equipos, flotas y responsabilidad</span><a href={appPath('productos')}>Ver todos los productos <ArrowRight size={15} /></a></div>
        </section>

        <section className="about" id="nosotros"><div className="about-image"><img src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1300&q=85" alt="Dron profesional preparado para una operación aérea" /></div><div className="about-copy"><h2>Tu actividad,<br /><span>nuestro enfoque.</span></h2><p>Somos broker de Coverdrone y nos especializamos en seguros para empresas y profesionales que trabajan con drones.</p><p>Te ayudamos a revisar opciones de responsabilidad civil, protección de equipos y coberturas relacionadas con tu operación.</p><div className="about-stat"><strong>Broker de Coverdrone</strong><span>Seguros para operaciones profesionales</span></div></div></section>

        <section className="faq-section section-wrap" id="faq"><div className="faq-heading"><h2>¿Tienes preguntas?<br /><span>Estamos cerca.</span></h2><p>Lo importante es que vueles con confianza. Aquí respondemos a lo que más nos preguntan.</p><span className="text-link inert-link" aria-disabled="true">¿Tienes otra duda? Escríbenos <ArrowRight size={15} /></span></div><div className="faq-list">{faqs.map((faq, index) => <div className={activeFaq === index ? 'faq-item faq-active' : 'faq-item'} key={faq.q}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span className="faq-number">0{index + 1}</span><span>{faq.q}</span><ChevronDown size={18} /></button>{activeFaq === index && <p>{faq.a}</p>}</div>)}</div></section>

        <section className="bottom-cta"><div><h2>¿Listo para despegar?</h2></div><span className="button-light inert-link" aria-disabled="true">Hablemos de tu dron <ArrowRight size={17} /></span></section>
      </main>}

      <footer className="footer">
        <div className="footer-brand-group"><a className="brand footer-brand" href={appPath()}><span>Seguros<span className="brand-light">Dron</span></span></a><p>Broker de Coverdrone y especialistas en seguros para drones.</p></div>
        <div className="footer-contact"><strong>Broker de seguros especialista en seguros de drones</strong><div className="footer-contact-details"><span>Número de registro DGPFAT F215</span><span>Dirección General de Seguros</span><a href="tel:+34900732322">900732322</a></div></div>
        <nav className="footer-links" aria-label="Enlaces del pie de página"><a href={appPath('productos')}>Nuestros productos</a><a href={appPath('sobre-nosotros')}>Sobre nosotros</a><a href={appPath('faq')}>FAQ</a><a href={appPath('presupuesto')}>Cotizar precio</a></nav>
        <span className="copyright">© 2026 SegurosDron. Todos los derechos reservados.</span>
      </footer>
    </>
  )
}

function ProductsPage() {
  return (
    <main className="products-page">
      <section className="products-page-hero">
        <div className="products-page-hero-copy">
          <h1>Más libertad.<br /><span>Mejor protegido.</span></h1>
          <p>Protección para operaciones comerciales con drones. Revisa las opciones de responsabilidad civil, equipo y cobertura profesional según la actividad de tu empresa.</p>
          <a className="button-primary" href={appPath('presupuesto')}>Cotizar precio <ArrowRight size={17} /></a>
        </div>
        <div className="products-page-visual"><img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1400&q=85" alt="Piloto preparando un dron para volar" /></div>
      </section>

      <section className="products-details section-wrap">
        <div className="section-top"><div><h2>Protecciones<br /><span>principales.</span></h2></div></div>
        <div className="products-detail-grid">{productGroups.map(({ title, label, text, icon: Icon }, index) => <article className="products-detail-card" key={title}><div className="detail-card-head"><span>0{index + 1}</span><Icon size={21} /></div><div className="detail-label">{label}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="coverage-disclaimer">Las coberturas, límites y exclusiones dependen de la póliza contratada. Te facilitaremos todos los detalles en tu propuesta.</p>
      </section>

      <section className="coverage-comparison-section">
        <div className="coverage-comparison-inner">
          <div className="coverage-comparison-heading"><span>COMPARATIVA DE COBERTURAS</span><h2>Recreativo y comercial,<br /><strong>de un vistazo.</strong></h2><p>Consulta las opciones disponibles en cada modalidad.</p></div>
          <div className="coverage-table-scroll">
            <table className="coverage-table">
              <thead><tr><th scope="col">Cobertura</th><th scope="col">Recreativo</th><th scope="col">Comercial</th></tr></thead>
              <tbody>{coverageComparison.map((group) => <Fragment key={group.category}><tr className="coverage-category"><th colSpan="3" scope="colgroup">{group.category}</th></tr>{group.rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.recreational ? <span className="coverage-table-check" aria-label="Disponible"><Check size={14} /></span> : <span className="coverage-table-dash" aria-label="No indicado">—</span>}</td><td>{row.commercial ? <span className="coverage-table-check" aria-label="Disponible"><Check size={14} /></span> : <span className="coverage-table-dash" aria-label="No indicado">—</span>}</td></tr>)}</Fragment>)}</tbody>
            </table>
          </div>
          <p className="coverage-table-note">Resumen orientativo. La disponibilidad de cada cobertura, sus límites, exclusiones y condiciones dependen de la póliza contratada y de la operación asegurada.</p>
        </div>
      </section>

      <section className="operation-types-section section-wrap">
        <div className="operation-types-heading"><div><h2>Drones y operaciones<br /><span>que aseguramos.</span></h2></div></div>
        <div className="operation-types-grid">{operationTypes.map(({ title, text, icon: Icon }) => <article className="operation-type-card" key={title}><div className="operation-type-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="operation-conditions">La disponibilidad de cobertura depende de la operación, el territorio, las autorizaciones aplicables y las condiciones de la póliza.</p>
      </section>

      <section className="client-support-section"><div className="client-support-inner"><div className="client-support-heading"><h2>Cómo te acompañamos.</h2><p>Queremos que entiendas tus opciones y sepas dónde acudir cuando tengas una duda.</p></div><div className="client-support-grid">{clientSupport.map(({ title, text, icon: Icon }) => <article className="client-support-card" key={title}><span className="support-icon"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="products-bottom-cta"><div><h2>Cuéntanos sobre tu operación.</h2><p>Preparamos una propuesta según los drones y servicios de tu empresa.</p></div><a className="button-light" href={appPath('presupuesto')}>Cotizar precio <ArrowRight size={17} /></a></section>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-page-hero">
        <div className="about-page-hero-copy">
          <h1>Seguros para drones,<br /><span>con atención cercana.</span></h1>
          <p>Somos un broker de Coverdrone especializado en seguros para empresas y profesionales que trabajan con drones. Te orientamos sobre opciones para proteger tus operaciones.</p>
          <a className="button-primary" href={appPath('productos')}>Conoce nuestros productos <ArrowRight size={17} /></a>
        </div>
        <div className="about-page-visual"><img src={appPath('images/sobre-nosotros-handshake.jpg')} alt="Dos profesionales dándose la mano durante una reunión" /></div>
      </section>

      <section className="about-agency section-wrap">
        <div className="about-agency-copy">
          <h2>Especialistas en drones,<br /><span>con el respaldo de Coverdrone.</span></h2>
          <p>Somos un broker de Coverdrone centrado en seguros para drones. Conocemos las necesidades de las empresas y los profesionales que operan flotas, prestan servicios aéreos o realizan trabajos especializados.</p>
          <div className="about-partner"><span>Broker de</span><img src={appPath('images/cropped-coverdrone_logo.png')} alt="Coverdrone" /></div>
        </div>
        <div className="about-agency-points">
          <article><span>01</span><div><h3>Enfoque especializado</h3><p>Nos centramos en seguros para drones y en las particularidades de cada operación.</p></div></article>
          <article><span>02</span><div><h3>Para cada tipo de piloto</h3><p>Te orientamos tanto si vuelas por afición como si utilizas el dron profesionalmente.</p></div></article>
          <article><span>03</span><div><h3>Claridad en cada opción</h3><p>Te ayudamos a revisar coberturas, límites y condiciones de la póliza.</p></div></article>
        </div>
      </section>

      <section className="about-contact-banner">
        <div><h2>Hablemos de tu próximo vuelo.</h2><p>Broker de seguros especialista en seguros de drones</p><p>Número de registro DGPFAT F215 · Dirección General de Seguros</p><p><a className="about-contact-phone" href="tel:+34900732322">900732322</a></p></div>
        <span className="button-light inert-link" aria-disabled="true">Habla con nosotros <ArrowRight size={17} /></span>
      </section>
    </main>
  )
}

function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState('recreativo')
  const [activeQuestion, setActiveQuestion] = useState(0)
  const category = faqCategories.find((item) => item.id === selectedCategory)
  const questions = faqAnswers[selectedCategory]

  return (
    <main className="faq-page">
      <section className="faq-page-hero">
        <div className="faq-page-hero-copy">
          <h1>¿Cómo podemos<br /><span>ayudarte?</span></h1>
          <p>Encuentra respuestas sobre tu póliza, las coberturas y tus vuelos con dron.</p>
        </div>
        <div className="faq-help-card faq-help-photo"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="Equipo de atención conversando en un espacio de trabajo" /></div>
      </section>

      <section className="faq-categories-section section-wrap">
        <div className="faq-categories-heading"><h2>Elige una categoría de ayuda</h2></div>
        <div className="faq-category-grid">{faqCategories.map(({ id, title, text, icon: Icon }) => <button className={selectedCategory === id ? 'faq-category-card faq-category-active' : 'faq-category-card'} type="button" key={id} onClick={() => { setSelectedCategory(id); setActiveQuestion(0) }} aria-pressed={selectedCategory === id}><span className="faq-category-icon"><Icon size={22} /></span><span className="faq-category-title">{title}</span><span className="faq-category-text">{text}</span></button>)}</div>
      </section>

      <section className="faq-answers-section section-wrap" aria-live="polite">
        <div className="faq-answers-heading"><div><h2>Preguntas sobre<br /><span>{category.title.toLowerCase()}.</span></h2></div><span className="faq-count">{questions.length} PREGUNTAS</span></div>
        <div className="faq-page-list">{questions.map((item, index) => <article className={activeQuestion === index ? 'faq-page-item faq-page-item-active' : 'faq-page-item'} key={item.q}><button type="button" onClick={() => setActiveQuestion(activeQuestion === index ? -1 : index)} aria-expanded={activeQuestion === index}><span className="faq-page-number">0{index + 1}</span><span>{item.q}</span><ChevronDown size={19} /></button>{activeQuestion === index && <p>{item.a}</p>}</article>)}</div>
      </section>

      <section className="faq-contact-cta"><div><h2>Estamos a un mensaje de distancia.</h2><p>Cuéntanos tu duda y te orientaremos sobre las opciones disponibles.</p></div><span className="button-light inert-link" aria-disabled="true">Contactar con SegurosDron <ArrowRight size={17} /></span></section>
    </main>
  )
}

const quoteDraftStorageKey = 'segurosdron-quote-draft-v1'

function readQuoteDraft() {
  try {
    const storedDraft = localStorage.getItem(quoteDraftStorageKey)
    if (!storedDraft) return null

    const draft = JSON.parse(storedDraft)
    if (!draft || typeof draft !== 'object' || Array.isArray(draft)) return null

    const step = Number.isInteger(draft.step) && draft.step >= 1 && draft.step <= 7 ? draft.step : 1
    const formData = draft.formData && typeof draft.formData === 'object' && !Array.isArray(draft.formData) ? draft.formData : {}
    const drones = Array.isArray(draft.drones)
      ? draft.drones.filter((drone) => drone && Number.isInteger(drone.id) && drone.id > 0)
      : []
    const submissionId = typeof draft.submissionId === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(draft.submissionId)
      ? draft.submissionId
      : crypto.randomUUID()

    return { step, formData, drones: drones.length ? drones : [{ id: 1 }], submissionId }
  } catch (error) {
    console.error('No se pudo recuperar el borrador del presupuesto.', error)
    return null
  }
}

function QuotePage() {
  const [initialDraft] = useState(readQuoteDraft)
  const [step, setStep] = useState(initialDraft?.step ?? 1)
  const [formData, setFormData] = useState(initialDraft?.formData ?? {})
  const [confirmed, setConfirmed] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const [drones, setDrones] = useState(initialDraft?.drones ?? [{ id: 1 }])
  const [submissionId] = useState(initialDraft?.submissionId ?? crypto.randomUUID())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const formRef = useRef(null)
  const nextDroneId = useRef(Math.max(0, ...(initialDraft?.drones ?? [{ id: 1 }]).map((drone) => drone.id)) + 1)
  const progressStep = step > 2 ? step - 1 : step

  useEffect(() => {
    try {
      localStorage.setItem(quoteDraftStorageKey, JSON.stringify({ step, formData, drones, submissionId }))
    } catch (error) {
      console.error('No se pudo guardar el borrador del presupuesto en este navegador.', error)
    }
  }, [step, formData, drones, submissionId])

  const updateFormData = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === 'purpose' && value !== 'Commercial' ? { businessName: '' } : {}),
    }))
    setConfirmed(false)
    setValidationError(false)
  }

  const updateDrone = (id, name, value) => {
    setDrones((current) => current.map((drone) => drone.id === id ? { ...drone, [name]: value } : drone))
    setConfirmed(false)
    setValidationError(false)
  }

  const today = new Date()
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const renderClientFields = () => (
    <div className="quote-fields">
      {quoteClientFields.map(({ name, label, type = 'text', required = false, options, help }) => (
        <Fragment key={name}>
          <label className="quote-field">
            <span className="quote-field-label">{label}{required && <span className="quote-required" aria-hidden="true">*</span>}{help && <span className="quote-help" title={help} aria-label={help} tabIndex={0}>i</span>}</span>
            {type === 'select' ? (
              <select name={name} value={formData[name] || ''} onChange={updateFormData} required={required}>
                <option value="" disabled>Selecciona una opción</option>
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input name={name} type={type} value={formData[name] || ''} onChange={updateFormData} required={required} />
            )}
          </label>
          {name === 'purpose' && formData.purpose === 'Commercial' && (
            <label className="quote-field">
              <span className="quote-field-label">Nombre de la empresa (si operas como empresa) o nombre completo (si solicitas como particular)<span className="quote-required" aria-hidden="true">*</span></span>
              <input name="businessName" type="text" value={formData.businessName || ''} onChange={updateFormData} required />
            </label>
          )}
        </Fragment>
      ))}
    </div>
  )

  return (
    <main className="quote-page">
      <div className="quote-form-shell">
        <div className="quote-form-intro">
          <span className="quote-eyebrow">SOLICITUD DE PRESUPUESTO</span>
          <h1>Cuéntanos sobre <span>tu actividad.</span></h1>
          <p>Completa tus datos para que podamos preparar una propuesta adecuada.</p>
        </div>
        <form ref={formRef} noValidate className={`quote-form quote-multistep-form${validationError ? ' quote-validation-failed' : ''}`} onChange={() => { setValidationError(false); setSubmissionError('') }} onSubmit={async (event) => {
          event.preventDefault()
          if (isSubmitting) return
          const invalidField = Array.from(formRef.current.elements).find((field) => field.willValidate && !field.validity.valid)
          if (invalidField) {
            setValidationError(true)
            invalidField.focus()
            return
          }
          setValidationError(false)
          if (step === 1) {
            setFormData((current) => ({ ...current, policyStartDate: current.policyStartDate || localToday }))
            setStep(2)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else if (step === 2) {
            setStep(3)
            setConfirmed(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else if (step === 3) {
            setStep(4)
            setConfirmed(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else if (step === 4) {
            setStep(5)
            setConfirmed(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else if (step === 5) {
            setStep(6)
            setConfirmed(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else if (step === 6) {
            setStep(7)
            setConfirmed(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else if (formData.declarationsAgreement !== 'Sí') {
            setConfirmed(false)
            setValidationError(true)
          } else {
            setIsSubmitting(true)
            setSubmissionError('')
            try {
              const submissionData = {
                ...formData,
                policyholderName: formData.policyholderName ?? (formData.purpose === 'Commercial' ? formData.businessName || '' : `${formData.firstName || ''} ${formData.surname || ''}`.trim()),
                policyholderPostcode: formData.policyholderPostcode ?? formData.postcode ?? '',
                policyholderAddress1: formData.policyholderAddress1 ?? formData.address1 ?? '',
                policyholderAddress2: formData.policyholderAddress2 ?? formData.address2 ?? '',
                policyholderAddress3: formData.policyholderAddress3 ?? formData.address3 ?? '',
                policyholderCity: formData.policyholderCity ?? formData.city ?? '',
                policyholderCounty: formData.policyholderCounty ?? formData.county ?? '',
                policyholderCountry: formData.policyholderCountry ?? formData.country ?? '',
              }
              const response = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId, formData: submissionData, drones }),
              })
              const result = await response.json()
              if (!response.ok) throw new Error(result.error || 'No se ha podido enviar la solicitud. Inténtalo de nuevo.')
              setConfirmed(true)
            } catch (error) {
              setConfirmed(false)
              setSubmissionError(error instanceof Error ? error.message : 'No se ha podido enviar la solicitud. Inténtalo de nuevo.')
            } finally {
              setIsSubmitting(false)
            }
          }
        }}>
          <nav className="quote-progress" aria-label="Progreso del formulario">
            {['Datos del cliente', 'Datos generales', 'Detalles del dron', 'Equipamiento', 'Responsabilidad', 'Presupuesto'].map((label, index) => (
              <span className={progressStep === index + 1 ? 'quote-progress-step quote-progress-current' : progressStep > index + 1 ? 'quote-progress-step quote-progress-complete' : 'quote-progress-step'} key={label}>
                <span>{index + 1}. {label}</span>
              </span>
            ))}
          </nav>
          <p className="quote-required-note"><span className="quote-required" aria-hidden="true">*</span> Campo obligatorio · Tus datos se guardan automáticamente en este navegador</p>
          {validationError && <p className="quote-validation-message" role="alert">{step === 7 && formData.declarationsAgreement === 'No' ? 'Para solicitar el presupuesto, debes aceptar las declaraciones.' : 'Por favor, completa los campos obligatorios que faltan y revisa los datos marcados.'}</p>}
          <div className="form-heading"><span>{step === 1 ? 'DATOS DEL CLIENTE' : step === 2 ? 'DATOS GENERALES Y CONFIRMACIÓN' : step === 3 ? 'DATOS GENERALES DEL TITULAR' : step === 4 ? 'DETALLES DEL DRON' : step === 5 ? 'EQUIPAMIENTO' : step === 6 ? 'RESPONSABILIDAD' : 'PRESUPUESTO'}</span><span>PASO 0{progressStep} — 06</span></div>
          {step === 1 ? (
            <section className="quote-step" aria-labelledby="client-details-heading">
              <h2 id="client-details-heading">Datos del cliente</h2>
              {renderClientFields()}
              <button className="button-primary form-submit" type="submit">Continuar <ArrowRight size={17} /></button>
            </section>
          ) : step === 2 ? (
            <section className="quote-step quote-general-step" aria-labelledby="general-details-heading">
              <div className="quote-panel">
                <h2 id="general-details-heading">Fecha de inicio de la póliza</h2>
                <label className="quote-field">
                  <span className="quote-field-label">Fecha de inicio de cobertura<span className="quote-required" aria-hidden="true">*</span></span>
                  <input name="policyStartDate" type="date" min={localToday} value={formData.policyStartDate || localToday} onChange={updateFormData} required />
                </label>
              </div>
              <div className="quote-panel">
                <h2>Confirmar datos del cliente</h2>
                <p className="quote-panel-intro">Revisa y modifica los datos si hace falta antes de confirmar.</p>
                {renderClientFields()}
              </div>
              <div className="quote-panel">
                <h2>Normativa</h2>
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Aceptas cumplir la normativa de navegación aérea, aeronavegabilidad y del país?</legend>
                  <span className="quote-help" title="Nuestra póliza exige que operes legalmente en todo momento y que conozcas los requisitos de formación aplicables." aria-label="Nuestra póliza exige que operes legalmente en todo momento y que conozcas los requisitos de formación aplicables." tabIndex={0}>i</span>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="regulationCompliance" value={option} checked={formData.regulationCompliance === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.regulationCompliance === 'No' && <p className="quote-warning" role="alert">Nuestra póliza exige que operes legalmente en todo momento y que conozcas los requisitos de formación aplicables.</p>}
                </fieldset>
              </div>
              <div className="quote-step-actions">
                <button className="quote-previous-step" type="button" onClick={() => setStep(1)}><ArrowLeft size={16} /> Anterior</button>
                <button className="button-primary form-submit" type="submit">Siguiente <ArrowRight size={17} /></button>
              </div>
            </section>
          ) : step === 3 ? (
            <section className="quote-step quote-general-step" aria-labelledby="policyholder-details-heading">
              <div className="quote-panel">
                <h2 id="policyholder-details-heading">Datos generales</h2>
                <div className="quote-fields">
                  <label className="quote-field">
                    <span className="quote-field-label">Nombre completo del titular de la póliza<span className="quote-required" aria-hidden="true">*</span></span>
                    <input name="policyholderName" value={formData.policyholderName ?? (formData.purpose === 'Commercial' ? formData.businessName || '' : `${formData.firstName || ''} ${formData.surname || ''}`.trim())} onChange={updateFormData} required />
                  </label>
                  {[
                    { name: 'policyholderPostcode', label: 'Código postal de correspondencia', required: true, source: 'postcode' },
                    { name: 'policyholderAddress1', label: 'Dirección, línea 1', required: true, source: 'address1' },
                    { name: 'policyholderAddress2', label: 'Dirección, línea 2', source: 'address2' },
                    { name: 'policyholderAddress3', label: 'Dirección, línea 3', source: 'address3' },
                    { name: 'policyholderCity', label: 'Ciudad / localidad', required: true, source: 'city' },
                    { name: 'policyholderCounty', label: 'Provincia / región', source: 'county' },
                  ].map(({ name, label, required = false, source }) => (
                    <label className="quote-field" key={name}>
                      <span className="quote-field-label">{label}{required && <span className="quote-required" aria-hidden="true">*</span>}</span>
                      <input name={name} value={formData[name] ?? formData[source] ?? ''} onChange={updateFormData} required={required} />
                    </label>
                  ))}
                  <label className="quote-field">
                    <span className="quote-field-label">País<span className="quote-required" aria-hidden="true">*</span></span>
                    <select name="policyholderCountry" value={formData.policyholderCountry ?? formData.country ?? ''} onChange={updateFormData} required>
                      <option value="" disabled>Selecciona una opción</option>
                      {['España', 'Portugal', 'Francia', 'Reino Unido', 'Otro'].map((country) => <option key={country} value={country}>{country}</option>)}
                    </select>
                  </label>
                  <label className="quote-field">
                    <span className="quote-field-label">¿En qué territorio está domiciliado el titular de la póliza?<span className="quote-required" aria-hidden="true">*</span><span className="quote-help" title="Esta es la residencia permanente del titular de la póliza." aria-label="Esta es la residencia permanente del titular de la póliza." tabIndex={0}>i</span></span>
                    <select name="policyholderTerritory" value={formData.policyholderTerritory || ''} onChange={updateFormData} required>
                      <option value="" disabled>Selecciona una opción</option>
                      {['España', 'Reino Unido', 'Unión Europea (excepto Reino Unido)', 'Otro territorio'].map((territory) => <option key={territory} value={territory}>{territory}</option>)}
                    </select>
                  </label>
                </div>
              </div>
              <div className="quote-panel">
                <h2>Actividad y antecedentes</h2>
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Prevés realizar trabajos para organismos públicos (por ejemplo, servicios de emergencia)?</legend>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="publicAuthorityWork" value={option} checked={formData.publicAuthorityWork === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {formData.publicAuthorityWork === 'Sí' && (
                  <label className="quote-field quote-textarea-field">
                    <span className="quote-field-label">Más detalles sobre el trabajo para organismos públicos<span className="quote-required" aria-hidden="true">*</span></span>
                    <textarea name="publicAuthorityWorkDetails" value={formData.publicAuthorityWorkDetails || ''} onChange={updateFormData} required rows="5" />
                  </label>
                )}
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Prevés realizar trabajos militares con fuego real u operaciones tácticas? (Se aceptan demostraciones o trabajos en instalaciones militares)</legend>
                  <span className="quote-help" title="Solo necesitamos que nos informes si vas a operar en situaciones de fuego real u operaciones tácticas." aria-label="Solo necesitamos que nos informes si vas a operar en situaciones de fuego real u operaciones tácticas." tabIndex={0}>i</span>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="militaryWork" value={option} checked={formData.militaryWork === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.militaryWork === 'Sí' && <p className="quote-warning" role="alert">No podemos ofrecer cobertura para trabajos militares con fuego real u operaciones tácticas.</p>}
                </fieldset>
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Has sufrido accidentes o presentado reclamaciones en los últimos 3 años?</legend>
                  <span className="quote-help" title="Relacionado con aeronaves no tripuladas pequeñas, equipos portátiles fuera de las instalaciones o responsabilidad civil." aria-label="Relacionado con aeronaves no tripuladas pequeñas, equipos portátiles fuera de las instalaciones o responsabilidad civil." tabIndex={0}>i</span>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="recentClaims" value={option} checked={formData.recentClaims === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="quote-step-actions">
                <button className="quote-previous-step" type="button" onClick={() => setStep(2)}><ArrowLeft size={16} /> Anterior</button>
                <button className="button-primary form-submit" type="submit">Siguiente <ArrowRight size={17} /></button>
              </div>
            </section>
          ) : step === 4 ? (
            <section className="quote-step quote-general-step" aria-labelledby="drone-details-heading">
              <div className="quote-panel">
                <h2 id="drone-details-heading">Datos del dron</h2>
                <div className="quote-fields">
                  <label className="quote-field">
                    <span className="quote-field-label">¿Cuántos drones tienes, utilizas u operas en total?<span className="quote-required" aria-hidden="true">*</span></span>
                    <select name="droneCount" value={formData.droneCount || ''} onChange={updateFormData} required>
                      <option value="" disabled>Selecciona una opción</option>
                      {['1 - 25', '26 - 50', '51 - 100', 'Más de 100'].map((count) => <option key={count} value={count}>{count}</option>)}
                    </select>
                  </label>
                  <label className="quote-field">
                    <span className="quote-field-label">¿Cuál es el MTOW (peso máximo al despegue) del dron más pesado?<span className="quote-required" aria-hidden="true">*</span><span className="quote-help" title="Todos los pesos están expresados en kilogramos. Por ejemplo, un dron de 249 gramos aparecerá como 0,249 kg." aria-label="Todos los pesos están expresados en kilogramos. Por ejemplo, un dron de 249 gramos aparecerá como 0,249 kg." tabIndex={0}>i</span></span>
                    <select name="droneMtow" value={formData.droneMtow || ''} onChange={updateFormData} required>
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="0-0.249">0 - 0,249 kilogramos</option>
                      <option value="0.250-40">0,250 - 40 kilogramos</option>
                    </select>
                  </label>
                  <fieldset className="quote-choice-row">
                    <legend><span className="quote-required" aria-hidden="true">*</span> ¿Operas drones prototipo?</legend>
                    <span className="quote-help" title="Un prototipo es una muestra, modelo o versión inicial de un producto que se crea para probar un concepto o proceso. Solo ofrecemos cobertura de responsabilidad civil para estos drones." aria-label="Un prototipo es una muestra, modelo o versión inicial de un producto que se crea para probar un concepto o proceso. Solo ofrecemos cobertura de responsabilidad civil para estos drones." tabIndex={0}>i</span>
                    <div className="quote-radio-options">
                      {['Sí', 'No'].map((option) => (
                        <label className="quote-radio-option" key={option}>
                          <input type="radio" name="prototypeDrones" value={option} checked={formData.prototypeDrones === option} onChange={updateFormData} required />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {formData.prototypeDrones && (
                    <fieldset className="quote-choice-row">
                      <legend><span className="quote-required" aria-hidden="true">*</span> ¿Operas drones que no sean prototipos?</legend>
                      <span className="quote-help" title="Son drones fabricados como un producto terminado." aria-label="Son drones fabricados como un producto terminado." tabIndex={0}>i</span>
                      <div className="quote-radio-options">
                        {['Sí', 'No'].map((option) => (
                          <label className="quote-radio-option" key={option}>
                            <input type="radio" name="nonPrototypeDrones" value={option} checked={formData.nonPrototypeDrones === option} onChange={updateFormData} required />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                </div>
              </div>
              {drones.map((drone, index) => (
                <div className="quote-panel quote-drone-card" key={drone.id}>
                  <h3><Plane size={17} /> Dron {index + 1}</h3>
                  <div className="quote-fields">
                    <label className="quote-field">
                      <span className="quote-field-label">¿Cuál es la marca de este dron?<span className="quote-required" aria-hidden="true">*</span></span>
                      <input name={`drone-${drone.id}-make`} value={drone.make || ''} onChange={(event) => updateDrone(drone.id, 'make', event.target.value)} required />
                    </label>
                    <label className="quote-field">
                      <span className="quote-field-label">¿Cuál es el modelo de este dron?<span className="quote-required" aria-hidden="true">*</span></span>
                      <input name={`drone-${drone.id}-model`} value={drone.model || ''} onChange={(event) => updateDrone(drone.id, 'model', event.target.value)} required />
                    </label>
                    <label className="quote-field">
                      <span className="quote-field-label">Número de serie o matrícula</span>
                      <input name={`drone-${drone.id}-serial`} value={drone.serial || ''} onChange={(event) => updateDrone(drone.id, 'serial', event.target.value)} />
                    </label>
                    <label className="quote-field">
                      <span className="quote-field-label">Año de fabricación</span>
                      <input name={`drone-${drone.id}-year`} type="number" min="1900" max={new Date().getFullYear()} placeholder="AAAA" value={drone.year || ''} onChange={(event) => updateDrone(drone.id, 'year', event.target.value)} />
                    </label>
                  </div>
                </div>
              ))}
              <div className="quote-drone-actions">
                <button className="quote-add-drone" type="button" onClick={() => {
                  const newDrone = { id: nextDroneId.current }
                  nextDroneId.current += 1
                  setDrones((current) => [...current, newDrone])
                  setConfirmed(false)
                  setValidationError(false)
                }}><Plus size={16} /> Añadir otro dron</button>
                {drones.length > 1 && (
                  <button className="quote-remove-drone" type="button" onClick={() => {
                    setDrones((current) => current.slice(0, -1))
                    setConfirmed(false)
                    setValidationError(false)
                  }}><X size={16} /> Quitar dron</button>
                )}
              </div>
              <div className="quote-step-actions">
                <button className="quote-previous-step" type="button" onClick={() => setStep(3)}><ArrowLeft size={16} /> Anterior</button>
                <button className="button-primary form-submit" type="submit">Siguiente <ArrowRight size={17} /></button>
              </div>
              {confirmed && <p className="quote-confirmed" role="status"><Check size={17} /> Datos del dron guardados.</p>}
            </section>
          ) : step === 5 ? (
            <section className="quote-step quote-general-step" aria-labelledby="equipment-heading">
              <div className="quote-panel">
                <h2 id="equipment-heading">Equipamiento propio</h2>
                <p className="quote-equipment-category">Equipamiento aéreo</p>
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Necesitas cobertura para algún equipo aéreo que sea de tu propiedad?</legend>
                  <span className="quote-help" title="Incluye drones, cámaras, gimbals y otros equipos utilizados durante tus operaciones." aria-label="Incluye drones, cámaras, gimbals y otros equipos utilizados durante tus operaciones." tabIndex={0}>i</span>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="ownedAirborneEquipment" value={option} checked={formData.ownedAirborneEquipment === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {formData.ownedAirborneEquipment === 'Sí' && (
                  <>
                    <p className="quote-equipment-notice" role="note">Solo podemos ofrecer cobertura de equipos aéreos para tus drones que no sean prototipo.</p>
                    <label className="quote-field quote-equipment-value">
                      <span className="quote-field-label">Valor total de los equipos aéreos, incluidos drones, cámaras y gimbals, etc.<span className="quote-required" aria-hidden="true">*</span></span>
                      <span className="quote-currency-input"><span aria-hidden="true">€</span><input name="ownedAirborneValue" type="number" min="0" step="0.01" value={formData.ownedAirborneValue || ''} onChange={updateFormData} required /></span>
                    </label>
                  </>
                )}
                <p className="quote-equipment-category">Equipamiento terrestre</p>
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Necesitas cobertura para algún equipo terrestre que sea de tu propiedad?</legend>
                  <span className="quote-help" title="Por ejemplo, ordenadores, tabletas u otros equipos terrestres utilizados para tu actividad." aria-label="Por ejemplo, ordenadores, tabletas u otros equipos terrestres utilizados para tu actividad." tabIndex={0}>i</span>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="ownedGroundEquipment" value={option} checked={formData.ownedGroundEquipment === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {formData.ownedGroundEquipment === 'Sí' && (
                  <>
                    <p className="quote-equipment-notice" role="note">Solo podemos ofrecer cobertura de equipos terrestres para tus drones que no sean prototipo.</p>
                    <label className="quote-field quote-equipment-value">
                      <span className="quote-field-label">¿Cuál es el valor total de todo el equipamiento terrestre?<span className="quote-required" aria-hidden="true">*</span></span>
                      <span className="quote-currency-input"><span aria-hidden="true">€</span><input name="ownedGroundValue" type="number" min="0" step="0.01" value={formData.ownedGroundValue || ''} onChange={updateFormData} required /></span>
                    </label>
                  </>
                )}
              </div>
              <div className="quote-panel">
                <h2>Equipamiento alquilado (no propio)</h2>
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Necesitas cobertura para algún equipo alquilado?</legend>
                  <span className="quote-help" title="Si alquilas equipo que pertenece a otra persona para utilizarlo en tu actividad, puedes incluirlo en tu póliza." aria-label="Si alquilas equipo que pertenece a otra persona para utilizarlo en tu actividad, puedes incluirlo en tu póliza." tabIndex={0}>i</span>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="hiredEquipment" value={option} checked={formData.hiredEquipment === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {formData.hiredEquipment === 'Sí' && (
                  <>
                    <p className="quote-equipment-notice" role="note">Solo podemos ofrecer cobertura de equipos alquilados para tus drones que no sean prototipo.</p>
                    <div className="quote-fields quote-equipment-details">
                      <label className="quote-field">
                        <span className="quote-field-label">Nombre del arrendador<span className="quote-required" aria-hidden="true">*</span></span>
                        <input name="equipmentHirerName" value={formData.equipmentHirerName || ''} onChange={updateFormData} required />
                      </label>
                      <label className="quote-field">
                        <span className="quote-field-label">Correo electrónico del arrendador<span className="quote-help" title="Indica un correo electrónico de contacto del arrendador, si lo tienes." aria-label="Indica un correo electrónico de contacto del arrendador, si lo tienes." tabIndex={0}>i</span></span>
                        <input name="equipmentHirerEmail" type="email" value={formData.equipmentHirerEmail || ''} onChange={updateFormData} />
                      </label>
                      <label className="quote-field">
                        <span className="quote-field-label">¿Cuál es el valor total de todos los equipos alquilados?<span className="quote-required" aria-hidden="true">*</span></span>
                        <span className="quote-currency-input"><span aria-hidden="true">€</span><input name="hiredEquipmentValue" type="number" min="0" step="0.01" value={formData.hiredEquipmentValue || ''} onChange={updateFormData} required /></span>
                      </label>
                      <fieldset className="quote-choice-row">
                        <legend><span className="quote-required" aria-hidden="true">*</span> ¿Puedes confirmar que los cargos continuos de alquiler no superarán los 30.000 €?</legend>
                        <div className="quote-radio-options">
                          {['Sí', 'No'].map((option) => (
                            <label className="quote-radio-option" key={option}>
                              <input type="radio" name="hireChargesUnderLimit" value={option} checked={formData.hireChargesUnderLimit === option} onChange={updateFormData} required />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      {formData.hireChargesUnderLimit === 'No' && (
                        <label className="quote-field">
                          <span className="quote-field-label">Cargos continuos de alquiler<span className="quote-required" aria-hidden="true">*</span></span>
                          <span className="quote-currency-input"><span aria-hidden="true">€</span><input name="ongoingHireCharges" type="number" min="0" step="0.01" value={formData.ongoingHireCharges || ''} onChange={updateFormData} required /></span>
                        </label>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="quote-step-actions">
                <button className="quote-previous-step" type="button" onClick={() => setStep(4)}><ArrowLeft size={16} /> Anterior</button>
                <button className="button-primary form-submit" type="submit">Siguiente <ArrowRight size={17} /></button>
              </div>
              {confirmed && <p className="quote-confirmed" role="status"><Check size={17} /> Datos del equipamiento guardados.</p>}
            </section>
          ) : step === 6 ? (
            <section className="quote-step quote-general-step" aria-labelledby="liability-heading">
              <div className="quote-panel">
                <h2 id="liability-heading">Responsabilidad civil</h2>
                <fieldset className="quote-choice-row">
                  <legend><span className="quote-required" aria-hidden="true">*</span> ¿Quieres incluir cobertura de responsabilidad civil?</legend>
                  <span className="quote-help" title="Cubre la responsabilidad por daños personales o materiales causados a terceros. En algunos países es obligatorio contar con un seguro de responsabilidad civil para operar un dron. Si eliges No, la póliza no incluirá esta cobertura." aria-label="Cubre la responsabilidad por daños personales o materiales causados a terceros. En algunos países es obligatorio contar con un seguro de responsabilidad civil para operar un dron. Si eliges No, la póliza no incluirá esta cobertura." tabIndex={0}>i</span>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="publicLiability" value={option} checked={formData.publicLiability === option} onChange={updateFormData} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {formData.publicLiability === 'Sí' && (
                  <label className="quote-field quote-liability-limit">
                    <span className="quote-field-label">Límite de indemnización<span className="quote-required" aria-hidden="true">*</span></span>
                    <select name="liabilityLimit" value={formData.liabilityLimit || ''} onChange={updateFormData} required>
                      <option value="" disabled>Selecciona una opción</option>
                      {[
                        { value: '1300000', label: '1.300.000 €' },
                        { value: '2600000', label: '2.600.000 €' },
                        { value: '6500000', label: '6.500.000 €' },
                      ].map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                )}
              </div>
              <div className="quote-step-actions">
                <button className="quote-previous-step" type="button" onClick={() => setStep(5)}><ArrowLeft size={16} /> Anterior</button>
                <button className="button-primary form-submit" type="submit">Siguiente <ArrowRight size={17} /></button>
              </div>
              {confirmed && <p className="quote-confirmed" role="status"><Check size={17} /> Datos de responsabilidad civil guardados.</p>}
            </section>
          ) : step === 7 ? (
            <section className="quote-step quote-general-step" aria-labelledby="client-quote-heading">
              <div className="quote-panel">
                <h2 id="client-quote-heading">Fechas de cobertura</h2>
                <label className="quote-field">
                  <span className="quote-field-label">¿Durante cuánto tiempo necesitas cobertura?<span className="quote-required" aria-hidden="true">*</span></span>
                  <select name="coverDuration" value={formData.coverDuration || ''} onChange={updateFormData} required>
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="1-year">Un año</option>
                  </select>
                </label>
              </div>
              <div className="quote-panel">
                <h2>Declaraciones</h2>
                <p className="quote-declarations-intro">Este presupuesto se facilitará bajo los siguientes supuestos:</p>
                <ul className="quote-declarations-list">
                  <li>Nunca te han rechazado un seguro, aplicado condiciones más restrictivas, denegado una renovación ni cancelado una póliza.</li>
                  <li>Ningún director, administrador o socio ha sido condenado ni acusado (sin haber sido juzgado todavía) de incendio provocado o de delitos relacionados con la deshonestidad, como fraude, robo o receptación de bienes robados.</li>
                  <li>La cobertura será para propietarios y operadores de sistemas de aeronaves no tripuladas (UAS).</li>
                </ul>
                <fieldset className="quote-choice-row quote-declarations-choice">
                  <legend><span className="quote-required" aria-hidden="true">*</span> Confirma que estás de acuerdo con lo anterior.</legend>
                  <div className="quote-radio-options">
                    {['Sí', 'No'].map((option) => (
                      <label className="quote-radio-option" key={option}>
                        <input type="radio" name="declarationsAgreement" value={option} checked={formData.declarationsAgreement === option} onChange={updateFormData} required />
                        <span>{option === 'Sí' ? 'De acuerdo' : 'No estoy de acuerdo'}</span>
                      </label>
                    ))}
                  </div>
                  {formData.declarationsAgreement === 'No' && <p className="quote-warning" role="alert">Para continuar con la solicitud de presupuesto, es necesario aceptar estas declaraciones.</p>}
                </fieldset>
              </div>
              <div className="quote-step-actions quote-final-actions">
                <button className="quote-previous-step" type="button" onClick={() => { setStep(6); setConfirmed(false) }}><ArrowLeft size={16} /> Modificar</button>
                <button className="button-primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando…' : 'Cotizar'} <ArrowRight size={17} /></button>
              </div>
              {submissionError && <p className="quote-submit-error" role="alert">{submissionError}</p>}
              {confirmed && <p className="quote-confirmed" role="status"><Check size={17} /> Solicitud enviada correctamente. Nos pondremos en contacto contigo.</p>}
            </section>
          ) : null}
        </form>
      </div>
    </main>
  )
}

export default App
