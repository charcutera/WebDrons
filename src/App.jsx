import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Clock3, Compass, FileText, Layers, LifeBuoy, Menu, MessageCircle, Package, Scale, Settings, ShieldCheck, Sparkles, X } from 'lucide-react'

const products = [
  { number: '01', title: 'Responsabilidad civil', text: 'Vuela con la tranquilidad de saber que estás cubierto ante daños a terceros.', tag: 'Cobertura personalizable' },
  { number: '02', title: 'Daños al dron', text: 'Protección frente a golpes, caídas y accidentes durante tus vuelos.', tag: 'A tu medida' },
  { number: '03', title: 'Robo y pérdida', text: 'Tu equipo también está protegido cuando no está en el aire.', tag: 'Cobertura opcional' },
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

const coverageOptions = [
  { title: 'Responsabilidad frente a terceros', icon: Scale, items: ['Daños personales y materiales', 'Responsabilidad aeronáutica y de producto', 'Privacidad y protección de datos'] },
  { title: 'Dron y equipo', icon: ShieldCheck, items: ['Daño accidental y robo', 'Pérdida del dron (flyaway)', 'Protección durante vuelo, transporte y almacenamiento'] },
  { title: 'Opciones para tu actividad', icon: Settings, items: ['Equipo alquilado y gastos asociados', 'Dron de sustitución', 'Responsabilidad profesional y recuperación de datos'] },
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
  function App() {
  const [activeFaq, setActiveFaq] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  const currentPath = currentHash.startsWith('#/')
    ? currentHash.slice(1).replace(/\/$/, '')
    : '/'

  const isQuotePage = currentPath === '/presupuesto'
  const isProductsPage = currentPath === '/productos'
  const isFaqPage = currentPath === '/faq'
  const isAboutPage = currentPath === '/sobre-nosotros'

  const activeNav = isProductsPage
    ? 'products'
    : isAboutPage
      ? 'about'
      : isFaqPage
        ? 'faq'
        : currentHash === '#nosotros'
          ? 'about'
          : currentHash === '#faq'
            ? 'faq'
            : currentPath === '/'
              ? 'home'
              : ''

  const closeMenu = () => setMenuOpen(false)

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
  <a
    className="brand"
    href={url('/')}
    aria-label="SegurosDron, inicio"
  >
    <span>
      SEGUROS<span className="brand-light">DRON</span>
    </span>
  </a>

  <button
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
  >
    {menuOpen ? <X /> : <Menu />}
  </button>

  <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
    <a
      className={activeNav === 'home' ? 'nav-active' : ''}
      href={url('/')}
      onClick={closeMenu}
    >
      Inicio
    </a>

    <a
      className={activeNav === 'products' ? 'nav-active' : ''}
      href={url('/productos')}
      onClick={closeMenu}
    >
      Nuestros productos
    </a>

    <a
      className={activeNav === 'about' ? 'nav-active' : ''}
      href={url('/sobre-nosotros')}
      onClick={closeMenu}
    >
      Sobre nosotros
    </a>

    <a
      className={activeNav === 'faq' ? 'nav-active' : ''}
      href={url('/faq')}
      onClick={closeMenu}
    >
      FAQ
    </a>
  </nav>

  <span className="header-cta inert-link" aria-disabled="true">
    Solicitar presupuesto <ArrowUpRight size={16} />
  </span>
</header>

      {isQuotePage ? <QuotePage /> : isProductsPage ? <ProductsPage /> : isAboutPage ? <AboutPage /> : isFaqPage ? <FaqPage /> : <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <h1>Hecho para<br />volar <span>tranquilo.</span></h1>
            <p className="hero-subtitle">El seguro que entiende tu forma de volar. Protege tu dron, tu trabajo y cada nueva aventura.</p>
            <div className="hero-actions"><span className="button-primary inert-link" aria-disabled="true">Encuentra tu cobertura <ArrowRight size={17} /></span></div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=1500&q=85" alt="Dron volando sobre un paisaje de montaña" />
            <div className="image-shade" />
            <div className="floating-card"><div className="floating-icon"><ShieldCheck size={20} /></div><div><strong>Siempre a tu lado</strong><span>Protección para cada vuelo</span></div></div>
          </div>
        </section>

        <section className="trust-strip"><div className="trust-lead">PARA LOS QUE MIRAN MÁS ALLÁ</div><div className="trust-item"><ShieldCheck size={19} /><span>Protección especializada</span></div><div className="trust-item"><Clock3 size={19} /><span>Un proceso sencillo</span></div><div className="trust-item"><Sparkles size={18} /><span>Coberturas flexibles</span></div></section>

        <section className="products section-wrap" id="productos">
          <div className="section-top"><div><h2>Tu dron. Tu forma<br />de <span>protegerlo.</span></h2></div></div>
          <div className="product-grid">{products.map((product) => <article className="product-card" key={product.number}><div className="product-card-top"><span>{product.number}</span></div><h3>{product.title}</h3><p>{product.text}</p><div className="product-card-bottom"><span>{product.tag}</span></div></article>)}</div>
          <div className="products-note"><span><Check size={15} /> Contratación sencilla</span><span><Check size={15} /> Opciones para profesionales y aficionados</span><a href={url('/productos')}>Ver todos los productos <ArrowRight size={15} /></a></div>
        </section>

        <section className="about" id="nosotros"><div className="about-image"><img src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1300&q=85" alt="Dron de uso profesional preparado para volar" /></div><div className="about-copy"><h2>Atención cercana,<br />desde <span>Terrassa.</span></h2><p>SegurosDron cuenta con la atención de Verdaguer Assegurances, una oficina de seguros en Terrassa.</p><p>Estamos en c/ Baldrich 69 A. Puedes llamarnos o escribirnos para resolver tus dudas sobre la protección de tu dron.</p><div className="about-stat"><strong>Verdaguer Assegurances</strong><span>Terrassa</span></div></div></section>

        <section className="faq-section section-wrap" id="faq"><div className="faq-heading"><h2>¿Tienes preguntas?<br /><span>Estamos cerca.</span></h2><p>Lo importante es que vueles con confianza. Aquí respondemos a lo que más nos preguntan.</p><span className="text-link inert-link" aria-disabled="true">¿Tienes otra duda? Escríbenos <ArrowRight size={15} /></span></div><div className="faq-list">{faqs.map((faq, index) => <div className={activeFaq === index ? 'faq-item faq-active' : 'faq-item'} key={faq.q}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span className="faq-number">0{index + 1}</span><span>{faq.q}</span><ChevronDown size={18} /></button>{activeFaq === index && <p>{faq.a}</p>}</div>)}</div></section>

        <section className="bottom-cta"><div><h2>¿Listo para despegar?</h2></div><span className="button-light inert-link" aria-disabled="true">Hablemos de tu dron <ArrowRight size={17} /></span></section>
      </main>}

      <footer className="footer">
        <div className="footer-brand-group"><a className="brand footer-brand" href={url('/')}><span>Seguros<span className="brand-light">Dron</span></span></a><p>Seguro para drones, con atención cercana en Terrassa.</p></div>
        <div className="footer-contact"><strong>Verdaguer Assegurances <span>· Terrassa</span></strong><div className="footer-contact-details"><span>c/ Baldrich 69 A, 08221 Terrassa</span><span>93 706 99 52</span><span>administracio@verdaguer-assegurances.com</span><span>www.verdaguer-assegurances.com</span><span>De 9h a 14h y 15h a 19h</span></div></div>
        <nav className="footer-links" aria-label="Enlaces del pie de página"><a href={url('/productos')}>Nuestros productos</a><a href={url('/sobre-nosotros')}>Sobre nosotros</a><a href={url('/faq')}>FAQ</a><span className="inert-link" aria-disabled="true">Presupuesto</span></nav>
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
          <p>Elige una póliza recreativa o comercial, con periodos desde un día hasta un año. Combina opciones para tu responsabilidad civil y tu equipo, propio o alquilado, según tu actividad.</p>
          <span className="button-primary inert-link" aria-disabled="true">Solicitar presupuesto <ArrowRight size={17} /></span>
        </div>
        <div className="products-page-visual"><img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1400&q=85" alt="Piloto preparando un dron para volar" /></div>
      </section>

      <section className="products-details section-wrap">
        <div className="section-top"><div><h2>Protecciones<br /><span>principales.</span></h2></div></div>
        <div className="products-detail-grid">{productGroups.map(({ title, label, text, icon: Icon }, index) => <article className="products-detail-card" key={title}><div className="detail-card-head"><span>0{index + 1}</span><Icon size={21} /></div><div className="detail-label">{label}</div><h3>{title}</h3><p>{text}</p><span className="detail-card-note">Cobertura sujeta a las condiciones de la póliza</span></article>)}</div>
        <p className="coverage-disclaimer">Las coberturas, límites y exclusiones dependen de la póliza contratada. Te facilitaremos todos los detalles en tu propuesta.</p>
      </section>

      <section className="coverage-options-section section-wrap">
        <div className="coverage-options-heading"><h2>¿Qué puede incluir<br /><span>tu póliza?</span></h2></div>
        <div className="coverage-options-grid">{coverageOptions.map(({ title, icon: Icon, items }) => <article className="coverage-options-card" key={title}><span className="coverage-options-icon"><Icon size={22} /></span><h3>{title}</h3><ul>{items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article>)}</div>
        <p className="coverage-disclaimer">Las coberturas indicadas son opciones sujetas a disponibilidad, límites, exclusiones y términos de la póliza. La cobertura territorial también puede estar sujeta a territorios excluidos.</p>
      </section>

      <section className="operation-types-section section-wrap">
        <div className="operation-types-heading"><div><h2>Drones y operaciones<br /><span>que aseguramos.</span></h2></div></div>
        <div className="operation-types-grid">{operationTypes.map(({ title, text, icon: Icon }) => <article className="operation-type-card" key={title}><div className="operation-type-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="operation-conditions">La disponibilidad de cobertura depende de la operación, el territorio, las autorizaciones aplicables y las condiciones de la póliza.</p>
      </section>

      <section className="client-support-section"><div className="client-support-inner"><div className="client-support-heading"><h2>Cómo te acompañamos.</h2><p>Queremos que entiendas tus opciones y sepas dónde acudir cuando tengas una duda.</p></div><div className="client-support-grid">{clientSupport.map(({ title, text, icon: Icon }) => <article className="client-support-card" key={title}><span className="support-icon"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="products-bottom-cta"><div><h2>Cuéntanos qué necesitas.</h2><p>Preparamos una propuesta pensada para tu dron y tu actividad.</p></div><span className="button-light inert-link" aria-disabled="true">Solicitar presupuesto <ArrowRight size={17} /></span></section>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-page-hero">
        <div className="about-page-hero-copy">
          <h1>Seguros para drones,<br /><span>con atención cercana.</span></h1>
          <p>Somos agentes de Coverdrone en Terrassa. Desde Verdaguer Assegurances te orientamos sobre las opciones para proteger tus vuelos recreativos o profesionales.</p>
          <a className="button-primary" href={url('/productos')}">Conoce nuestros productos <ArrowRight size={17} /></a>
        </div>
        <div className="about-page-visual"><img src="/images/sobre-nosotros-handshake.jpg" alt="Dos profesionales dándose la mano durante una reunión" /></div>
      </section>

      <section className="about-agency section-wrap">
        <div className="about-agency-copy">
          <h2>Coverdrone,<br /><span>con apoyo local.</span></h2>
          <p>Coverdrone aporta su especialización en seguros para drones. Verdaguer Assegurances te atiende desde Terrassa y te ayuda a entender las opciones disponibles antes de solicitar tu presupuesto.</p>
        </div>
        <div className="about-agency-points">
          <article><span>01</span><div><h3>Atención cercana</h3><p>Resolvemos tus dudas con un trato directo desde nuestra oficina en Terrassa.</p></div></article>
          <article><span>02</span><div><h3>Opciones para tu actividad</h3><p>Te orientamos tanto si vuelas por afición como si utilizas el dron profesionalmente.</p></div></article>
          <article><span>03</span><div><h3>Información clara</h3><p>Te ayudamos a revisar coberturas, límites y condiciones de la póliza.</p></div></article>
        </div>
      </section>

      <section className="about-contact-banner">
        <div><h2>Estamos en Terrassa.</h2><p>c/ Baldrich 69 A · 08221 Terrassa</p><p><a className="about-contact-phone" href="tel:+34937069952">93 706 99 52</a></p><p>De 9h a 14h y 15h a 19h</p></div>
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

function QuotePage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="quote-page">
      <div className="quote-page-intro">
        <a className="quote-back" href={url('/')}><ArrowLeft size={16} /> Inicio</a>
        <h1>Tu próximo vuelo<br />empieza con un <span>sí.</span></h1>
        <p>Cuéntanos un poco sobre tu dron y lo que necesitas. Te enviaremos una propuesta sin compromiso.</p>
        <div className="quote-promise"><span className="promise-check"><Check size={15} /></span><span>Rápido, sencillo y sin compromiso.</span></div>
        <div className="quote-page-note"><ShieldCheck size={18} /> Un equipo especializado te ayudará a encontrar la cobertura adecuada.</div>
      </div>
      <form className="quote-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
        <div className="form-heading"><span>HABLEMOS DE TU VUELO</span><span>01 — 03</span></div>
        {submitted ? <div className="success-message"><div className="success-icon"><Check size={22} /></div><h3>¡Gracias por confiar en nosotros!</h3><p>Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo muy pronto.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Enviar otra solicitud <ArrowRight size={15} /></button></div> : <><label>Tu nombre<input name="name" placeholder="¿Cómo te llamas?" required /></label><label>Correo electrónico<input name="email" type="email" placeholder="tu@email.com" required /></label><label>¿Para qué utilizas tu dron?<select name="use" defaultValue="" required><option value="" disabled>Selecciona una opción</option><option>Uso recreativo</option><option>Uso profesional</option><option>Ambos</option></select></label><label>Cuéntanos un poco más <span className="optional">OPCIONAL</span><textarea name="message" placeholder="Modelo del dron, tipo de cobertura que buscas…" rows="3" /></label><button className="button-primary form-submit" type="submit">Solicitar mi presupuesto <ArrowRight size={17} /></button><div className="form-privacy">Al enviar este formulario aceptas nuestra política de privacidad.</div></>}
      </form>
    </main>
  )
}

export default App
