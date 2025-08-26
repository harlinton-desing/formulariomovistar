// Datos de Colombia - Departamentos y Municipios
const colombianData = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Turbo", "Rionegro", "Sabaneta"],
    "Arauca": ["Arauca", "Arauquita", "Cravo Norte", "Fortul", "Puerto Rondón", "Saravena", "Tame"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Sabanagrande", "Puerto Colombia", "Galapa"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar", "San Pablo"],
    "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Villa de Leyva", "Nobsa"],
    "Caldas": ["Manizales", "Villamaría", "Chinchiná", "La Dorada", "Riosucio", "Anserma"],
    "Caquetá": ["Florencia", "San Vicente del Caguán", "Puerto Rico", "La Montañita", "El Doncello"],
    "Casanare": ["Yopal", "Aguazul", "Villanueva", "Tauramena", "Monterrey", "Paz de Ariporo"],
    "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Patía", "Corinto", "Guapi"],
    "Cesar": ["Valledupar", "Aguachica", "Codazzi", "Bosconia", "El Copey", "La Jagua de Ibirico"],
    "Chocó": ["Quibdó", "Istmina", "Condoto", "Tadó", "Acandí", "Bahía Solano"],
    "Córdoba": ["Montería", "Cereté", "Sahagún", "Lorica", "Planeta Rica", "Montelíbano"],
    "Cundinamarca": ["Bogotá", "Soacha", "Girardot", "Zipaquirá", "Facatativá", "Chía", "Cajicá", "Fusagasugá"],
    "Guainía": ["Inírida", "Barranco Minas", "Mapiripana", "San Felipe", "Puerto Colombia"],
    "Guaviare": ["San José del Guaviare", "Calamar", "El Retorno", "Miraflores"],
    "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre", "San Agustín"],
    "La Guajira": ["Riohacha", "Maicao", "Uribia", "Manaure", "San Juan del Cesar", "Villanueva"],
    "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "Aracataca", "El Banco", "Plato"],
    "Meta": ["Villavicencio", "Acacías", "Granada", "Puerto López", "Cumaral", "San Martín"],
    "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres", "Samaniego", "La Unión"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario", "Los Patios", "Tibú"],
    "Putumayo": ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez", "San Miguel", "Sibundoy"],
    "Quindío": ["Armenia", "Calarcá", "La Tebaida", "Montenegro", "Quimbaya", "Circasia"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Marsella"],
    "San Andrés y Providencia": ["San Andrés", "Providencia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja", "San Gil"],
    "Sucre": ["Sincelejo", "Corozal", "Sampués", "San Marcos", "Tolú", "Coveñas"],
    "Tolima": ["Ibagué", "Espinal", "Melgar", "Honda", "Líbano", "Chaparral"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Buga", "Jamundí"],
    "Vaupés": ["Mitú", "Carurú", "Pacoa", "Taraira", "Papunaua", "Yavaraté"],
    "Vichada": ["Puerto Carreño", "La Primavera", "Santa Rosalía", "Cumaribo"]
};

// Variable global para almacenar los datos del formulario
let formData = {};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    populateDepartments();
    setupEventListeners();
    showConsentModal();
}

// Poblar el select de departamentos
function populateDepartments() {
    const departmentSelect = document.getElementById('departamento');
    
    Object.keys(colombianData).forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        departmentSelect.appendChild(option);
    });
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Botones del modal de consentimiento
    document.getElementById('btnAceptar').addEventListener('click', acceptConsent);
    document.getElementById('btnNoAceptar').addEventListener('click', rejectConsent);
    
    // Cambios en tipo de vivienda
    document.getElementById('tipoVivienda').addEventListener('change', handleViviendaChange);
    
    // Cambios en departamento
    document.getElementById('departamento').addEventListener('change', handleDepartmentChange);
    
    // Cambios en plan - NUEVO PARA RELÁMPAGO
    document.getElementById('plan').addEventListener('change', handlePlanChangeRelampago);
    
    // Envío del formulario
    document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);
    
    // Botón cancelar
    document.getElementById('btnCancelar').addEventListener('click', showCancelModal);
    
    // Botones del modal de resumen
    document.getElementById('btnConfirmar').addEventListener('click', confirmSubmission);
    document.getElementById('btnCorregir').addEventListener('click', correctData);
    
    // Botones del modal de cancelación
    document.getElementById('btnConfirmarCancelacion').addEventListener('click', confirmCancellation);
    
    // Formateo automático de campos
    setupFieldFormatting();
}

// Configurar formateo automático de campos
function setupFieldFormatting() {
    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }
    
    const documentInput = document.getElementById('numeroDocumento');
    if (documentInput) {
        documentInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 12) {
                value = value.slice(0, 12);
            }
            e.target.value = value;
        });
    }
}

// Mostrar modal de consentimiento
function showConsentModal() {
    const consentModal = new bootstrap.Modal(document.getElementById('consentModal'));
    consentModal.show();
}

// Aceptar consentimiento
function acceptConsent() {
    const consentModal = bootstrap.Modal.getInstance(document.getElementById('consentModal'));
    consentModal.hide();
    document.getElementById('formContainer').style.display = 'block';
}

// Rechazar consentimiento
function rejectConsent() {
    alert('⚠️ INFORMACIÓN IMPORTANTE\n\nSi no acepta el tratamiento de datos no es posible brindarle el servicio.\n\nPara continuar debe aceptar el tratamiento de sus datos personales según el Artículo 5 de la Ley 1581 de 2012.');
}

// Manejar cambio en tipo de vivienda
function handleViviendaChange() {
    const tipoVivienda = document.getElementById('tipoVivienda').value;
    const casaFields = document.getElementById('casaFields');
    const conjuntoFields = document.getElementById('conjuntoFields');
    
    // Ocultar ambos campos condicionales
    casaFields.style.display = 'none';
    conjuntoFields.style.display = 'none';
    
    // Limpiar valores
    clearViviendaFields();
    
    // Mostrar campos apropiados
    if (tipoVivienda === 'casa') {
        casaFields.style.display = 'block';
    } else if (tipoVivienda === 'conjunto') {
        conjuntoFields.style.display = 'block';
    }
}

// Limpiar campos de vivienda
function clearViviendaFields() {
    document.getElementById('piso').value = '';
    document.getElementById('nombreConjunto').value = '';
    document.getElementById('torreBloque').value = '';
    document.getElementById('aptoCasa').value = '';
}

// Manejar cambio en departamento
function handleDepartmentChange() {
    const department = document.getElementById('departamento').value;
    const municipioSelect = document.getElementById('municipio');
    
    // Limpiar municipios anteriores
    municipioSelect.innerHTML = '<option value="">Seleccione municipio</option>';
    
    // Poblar municipios del departamento seleccionado
    if (department && colombianData[department]) {
        colombianData[department].forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality;
            option.textContent = municipality;
            municipioSelect.appendChild(option);
        });
    }
}

// NUEVA FUNCIÓN: Manejar cambio en plan Relámpago
function handlePlanChangeRelampago() {
    const planSelect = document.getElementById('plan');
    const selectedOption = planSelect.options[planSelect.selectedIndex];
    const planFields = document.getElementById('planFields');
    const valorPlanInput = document.getElementById('valorPlan');
    const descripcionPlanInput = document.getElementById('descripcionPlan');
    
    if (selectedOption.value) {
        const price = selectedOption.dataset.price;
        const description = selectedOption.dataset.description;
        
        // Mostrar campos del plan
        planFields.style.display = 'block';
        
        // Establecer precio formateado
        valorPlanInput.value = '' + parseInt(price).toLocaleString('es-CO');
        
        // Establecer descripción del plan (no editable)
        descripcionPlanInput.value = description;
        
    } else {
        // Ocultar campos del plan
        planFields.style.display = 'none';
        valorPlanInput.value = '';
        descripcionPlanInput.value = '';
    }
}

// Manejar envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        collectFormData();
        showSummaryModal();
    }
}

// Validar formulario
function validateForm() {
    const requiredFields = [
        'nombreCompleto', 'tipoDocumento', 'numeroDocumento', 
        'fechaExpedicion', 'fechaNacimiento', 'correo',
        'direccion', 'tipoVivienda', 'departamento', 'municipio',
        'barrio', 'estrato', 'celular', 'plan'
    ];
    
    let isValid = true;
    let firstInvalidField = null;
    
    // Validar campos requeridos
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff0000';
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        } else {
            field.style.borderColor = '#0066ff';
        }
    });
    
    // Validar nombre completo (debe tener al menos 2 palabras)
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    if (nombreCompleto && nombreCompleto.split(' ').length < 2) {
        isValid = false;
        alert('⚠️ El nombre completo debe incluir nombre y apellido');
        document.getElementById('nombreCompleto').focus();
        return false;
    }
    
    // Validar email
    const email = document.getElementById('correo').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        isValid = false;
        alert('⚠️ El correo electrónico no tiene un formato válido');
        document.getElementById('correo').focus();
        return false;
    }
    
    // Validar celular (debe ser de 10 dígitos y empezar con 3)
    const celular = document.getElementById('celular').value.trim();
    const celularRegex = /^3\d{9}$/;
    if (celular && !celularRegex.test(celular)) {
        isValid = false;
        alert('⚠️ El número de celular debe tener 10 dígitos y empezar con 3');
        document.getElementById('celular').focus();
        return false;
    }
    
    if (!isValid && firstInvalidField) {
        firstInvalidField.focus();
        alert('⚠️ Por favor complete todos los campos obligatorios marcados con *');
    }
    
    return isValid;
}

// Recopilar datos del formulario
function collectFormData() {
    const planSelect = document.getElementById('plan');
    const selectedPlanOption = planSelect.options[planSelect.selectedIndex];
    
    formData = {
        nombreCompleto: document.getElementById('nombreCompleto').value,
        tipoDocumento: document.getElementById('tipoDocumento').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
        fechaExpedicion: document.getElementById('fechaExpedicion').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        correo: document.getElementById('correo').value,
        direccion: document.getElementById('direccion').value,
        tipoVivienda: document.getElementById('tipoVivienda').value,
        departamento: document.getElementById('departamento').value,
        municipio: document.getElementById('municipio').value,
        barrio: document.getElementById('barrio').value,
        estrato: document.getElementById('estrato').value,
        celular: document.getElementById('celular').value,
        plan: selectedPlanOption.text,
        valorPlan: document.getElementById('valorPlan').value,
        descripcionPlan: document.getElementById('descripcionPlan').value,
        fechaEnvio: new Date().toLocaleString('es-CO')
    };
    
    // Agregar campos condicionales de vivienda
    const tipoVivienda = document.getElementById('tipoVivienda').value;
    if (tipoVivienda === 'casa') {
        formData.piso = document.getElementById('piso').value;
    } else if (tipoVivienda === 'conjunto') {
        formData.nombreConjunto = document.getElementById('nombreConjunto').value;
        formData.torreBloque = document.getElementById('torreBloque').value;
        formData.aptoCasa = document.getElementById('aptoCasa').value;
    }
}

// Mostrar modal de resumen
function showSummaryModal() {
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = generateSummaryHTML();
    const summaryModal = new bootstrap.Modal(document.getElementById('summaryModal'));
    summaryModal.show();
}

// Generar HTML del resumen
function generateSummaryHTML() {
    let html = '';
    
    const fieldLabels = {
        nombreCompleto: '👤 Nombre Completo',
        tipoDocumento: '📄 Tipo de Documento',
        numeroDocumento: '🔢 Número de Documento',
        fechaExpedicion: '📅 Fecha de Expedición',
        fechaNacimiento: '🎂 Fecha de Nacimiento',
        correo: '📧 Correo Electrónico',
        direccion: '🏠 Dirección',
        tipoVivienda: '🏘️ Tipo de Vivienda',
        piso: '🏢 Piso',
        nombreConjunto: '🏘️ Nombre del Conjunto',
        torreBloque: '🏗️ Torre/Bloque',
        aptoCasa: '🚪 Apto/Casa',
        departamento: '🗺️ Departamento',
        municipio: '🏙️ Municipio',
        barrio: '🏘️ Barrio',
        estrato: '📊 Estrato',
        celular: '📱 Celular',
        plan: '⚡ Plan Relámpago',
        valorPlan: '💰 Valor del Plan',
        descripcionPlan: '📋 Descripción del Plan',
        fechaEnvio: '⏰ Fecha de Envío'
    };
    
    Object.keys(formData).forEach(key => {
        if (formData[key] && formData[key] !== '') {
            const label = fieldLabels[key] || key;
            let value = formData[key];
            
            html += `
                <div class="summary-item">
                    <span class="summary-label">${label}:</span>
                    <span class="summary-value">${value}</span>
                </div>
            `;
        }
    });
    
    return html;
}

// Confirmar envío
async function confirmSubmission() {
    const summaryModal = bootstrap.Modal.getInstance(document.getElementById('summaryModal'));
    summaryModal.hide();
    
    showLoadingModal();
    
    try {
        const result = await sendToGoogleSheets();
        sendToWhatsApp();
        
        if (result && result.clienteId) {
            sendNotificationToAdmin(result.clienteId);
        }
        
        hideLoadingModal();
        showSuccessMessage();
        
        setTimeout(() => {
            resetForm();
        }, 3000);
        
    } catch (error) {
        hideLoadingModal();
        console.error('Error al enviar datos:', error);
        showErrorMessage();
        sendToWhatsApp();
        
        setTimeout(() => {
            resetForm();
        }, 3000);
    }
}

// Corregir datos
function correctData() {
    const summaryModal = bootstrap.Modal.getInstance(document.getElementById('summaryModal'));
    summaryModal.hide();
}

// FUNCIÓN CORREGIDA CON EMOJIS PARA WHATSAPP DEL CLIENTE - VERSIÓN RELÁMPAGO
function sendToWhatsApp() {
    const phoneNumber = '573125198465';
    
    // Crear emojis usando códigos Unicode para garantizar compatibilidad
    const lightningEmoji = String.fromCodePoint(0x26A1);
    const personEmoji = String.fromCodePoint(0x1F464);
    const memoEmoji = String.fromCodePoint(0x1F4DD);
    const documentEmoji = String.fromCodePoint(0x1F4C4);
    const birthdayEmoji = String.fromCodePoint(0x1F382);
    const emailEmoji = String.fromCodePoint(0x1F4E7);
    const phoneEmoji = String.fromCodePoint(0x1F4F1);
    const houseEmoji = String.fromCodePoint(0x1F3E0);
    const buildingEmoji = String.fromCodePoint(0x1F3E2);
    const cityEmoji = String.fromCodePoint(0x1F3D8);
    const numbersEmoji = String.fromCodePoint(0x1F522);
    const constructionEmoji = String.fromCodePoint(0x1F3D7);
    const doorEmoji = String.fromCodePoint(0x1F6AA);
    const mapEmoji = String.fromCodePoint(0x1F5FA);
    const chartEmoji = String.fromCodePoint(0x1F4CA);
    const targetEmoji = String.fromCodePoint(0x1F3AF);
    const moneyEmoji = String.fromCodePoint(0x1F4B0);
    const clipboardEmoji = String.fromCodePoint(0x1F4CB);
    const clockEmoji = String.fromCodePoint(0x23F0);
    const rocketEmoji = String.fromCodePoint(0x1F680);
    const checkEmoji = String.fromCodePoint(0x2705);
    
    let message = `${lightningEmoji} *NUEVO REGISTRO CLIENTE RELAMPAGO* ${lightningEmoji}\n\n`;
    message += `${clockEmoji} Fecha de registro: ${formData.fechaEnvio}\n\n`;
    message += `${personEmoji} *INFORMACION PERSONAL:*\n`;
    message += `${memoEmoji} Nombre: ${formData.nombreCompleto}\n`;
    message += `${documentEmoji} Documento: ${formData.tipoDocumento} ${formData.numeroDocumento}\n`;
    message += `${birthdayEmoji} Fecha Nacimiento: ${formData.fechaNacimiento}\n`;
    message += `${birthdayEmoji} Fecha Ezpedicion: ${formData.fechaExpedicion}\n`;
    message += `${emailEmoji} Email: ${formData.correo}\n`;
    message += `${phoneEmoji} Celular: ${formData.celular}\n\n`;
    
    message += `${houseEmoji} *INFORMACION DE VIVIENDA:*\n`;
    message += `${mapEmoji} Direccion: ${formData.direccion}\n`;
    message += `${buildingEmoji} Tipo: ${formData.tipoVivienda.toUpperCase()}\n`;
    
    if (formData.piso) {
        message += `${numbersEmoji} Piso: ${formData.piso}\n`;
    }
    if (formData.nombreConjunto) {
        message += `${cityEmoji} Conjunto: ${formData.nombreConjunto}\n`;
    }
    if (formData.torreBloque) {
        message += `${constructionEmoji} Torre/Bloque: ${formData.torreBloque}\n`;
    }
    if (formData.aptoCasa) {
        message += `${doorEmoji} Apto/Casa: ${formData.aptoCasa}\n`;
    }
    
    message += `${mapEmoji} Ubicacion: ${formData.departamento} - ${formData.municipio}\n`;
    message += `${cityEmoji} Barrio: ${formData.barrio}\n`;
    message += `${chartEmoji} Estrato: ${formData.estrato}\n\n`;
    
    message += `${lightningEmoji} *PLAN RELAMPAGO SELECCIONADO:*\n`;
    message += `${targetEmoji} Plan: ${formData.plan}\n`;
    message += `${moneyEmoji} Valor: ${formData.valorPlan}\n`;
    message += `${clipboardEmoji} Incluye: ${formData.descripcionPlan}\n\n`;
    
    
    message += `${rocketEmoji} *LISTO PARA ACTIVAR RELAMPAGO!* ${rocketEmoji}\n`;
    message += `${checkEmoji} Datos guardados en sistema\n`;
    message += `${lightningEmoji} Bienvenido a la velocidad Relampago! ${lightningEmoji}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// FUNCIÓN CORREGIDA CON EMOJIS PARA WHATSAPP DEL ADMINISTRADOR - VERSIÓN RELÁMPAGO
function sendNotificationToAdmin(clienteId) {
    const adminPhoneNumber = '573103509843';
    
    // Crear emojis usando códigos Unicode
    const lightningEmoji = String.fromCodePoint(0x26A1);
    const idEmoji = String.fromCodePoint(0x1F194);
    const warningEmoji = String.fromCodePoint(0x26A0);
    const calendarEmoji = String.fromCodePoint(0x1F4C5);
    const personEmoji = String.fromCodePoint(0x1F464);
    const memoEmoji = String.fromCodePoint(0x1F4DD);
    const documentEmoji = String.fromCodePoint(0x1F4C4);
    const phoneEmoji = String.fromCodePoint(0x1F4F1);
    const emailEmoji = String.fromCodePoint(0x1F4E7);
    const houseEmoji = String.fromCodePoint(0x1F3E0);
    const mapEmoji = String.fromCodePoint(0x1F5FA);
    const cityEmoji = String.fromCodePoint(0x1F3D8);
    const chartEmoji = String.fromCodePoint(0x1F4CA);
    const targetEmoji = String.fromCodePoint(0x1F3AF);
    const moneyEmoji = String.fromCodePoint(0x1F4B0);
    const clipboardEmoji = String.fromCodePoint(0x1F4CB);
    const checkEmoji = String.fromCodePoint(0x2705);
    
    let adminMessage = `${lightningEmoji} *NUEVO CLIENTE RELAMPAGO REGISTRADO* ${lightningEmoji}\n\n`;
    
    adminMessage += `${idEmoji} *ID CLIENTE:* ${clienteId}\n`;
    adminMessage += `${warningEmoji} *ESTADO:* PENDIENTE\n`;
    adminMessage += `${calendarEmoji} *FECHA:* ${formData.fechaEnvio}\n\n`;
    
    adminMessage += `${personEmoji} *DATOS DEL CLIENTE:*\n`;
    adminMessage += `${memoEmoji} Nombre: ${formData.nombreCompleto}\n`;
    adminMessage += `${documentEmoji} Documento: ${formData.tipoDocumento} ${formData.numeroDocumento}\n`;
    adminMessage += `${phoneEmoji} Celular: ${formData.celular}\n`;
    adminMessage += `${emailEmoji} Email: ${formData.correo}\n\n`;
    
    adminMessage += `${houseEmoji} *DIRECCION:*\n`;
    adminMessage += `${mapEmoji} ${formData.direccion}\n`;
    adminMessage += `${mapEmoji} ${formData.departamento} - ${formData.municipio}\n`;
    adminMessage += `${cityEmoji} Barrio: ${formData.barrio}\n`;
    adminMessage += `${chartEmoji} Estrato: ${formData.estrato}\n\n`;
    
    adminMessage += `${lightningEmoji} *PLAN RELAMPAGO:*\n`;
    adminMessage += `${targetEmoji} ${formData.plan}\n`;
    adminMessage += `${moneyEmoji} Valor: ${formData.valorPlan}\n`;
    adminMessage += `${clipboardEmoji} Incluye: ${formData.descripcionPlan}\n\n`;
    
    adminMessage += `${warningEmoji} *ESTADO: PENDIENTE* ${warningEmoji}\n`;
    adminMessage += `${checkEmoji} Cliente guardado en Google Sheets con ID ${clienteId}`;
    
    const encodedAdminMessage = encodeURIComponent(adminMessage);
    const adminWhatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedAdminMessage}`;
    
    setTimeout(() => {
        window.open(adminWhatsappUrl, '_blank');
    }, 1000);
}

// Mostrar modal de cancelación
function showCancelModal() {
    const cancelModal = new bootstrap.Modal(document.getElementById('cancellationModal'));
    cancelModal.show();
}

// Confirmar cancelación
function confirmCancellation() {
    const motivo = document.getElementById('motivoCancelacion').value.trim();
    
    if (!motivo) {
        alert('⚠️ Por favor, indique el motivo de la cancelación.');
        return;
    }
    
    alert(`ℹ️ Cancelación registrada.\n\nMotivo: "${motivo}"\n\nGracias por su retroalimentación. Esperamos poder servirle en el futuro.`);
    
    const cancelModal = bootstrap.Modal.getInstance(document.getElementById('cancellationModal'));
    cancelModal.hide();
    resetForm();
}

// Reiniciar formulario
function resetForm() {
    document.getElementById('dataForm').reset();
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('casaFields').style.display = 'none';
    document.getElementById('conjuntoFields').style.display = 'none';
    document.getElementById('planFields').style.display = 'none';
    
    // Limpiar municipios
    document.getElementById('municipio').innerHTML = '<option value="">Seleccione primero el departamento</option>';
    
    // Limpiar estilos de validación
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.style.borderColor = '#333333';
    });
    
    // Limpiar datos del formulario
    formData = {};
    
    // Mostrar modal de consentimiento
    showConsentModal();
}

// Enviar datos a Google Sheets - VERSIÓN RELÁMPAGO
async function sendToGoogleSheets() {
    const SHEET_ID = '1Jok8nOPWsDY5VME5XJ5TEGOoBnYXxCT--Yfxv1GF6mk';
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOMKp7SgMP922l6X8KL7EB7EDQtUl9RjJhA-yYVIcdaGTbSheFCb-ormxJBkk6ET7A/exec';
    
    const dataToSend = {
        action: 'addRow',
        sheetId: SHEET_ID,
        data: {
            nombreCompleto: formData.nombreCompleto || '',
            tipoDocumento: formData.tipoDocumento || '',
            numeroDocumento: formData.numeroDocumento || '',
            fechaExpedicion: formData.fechaExpedicion || '',
            fechaNacimiento: formData.fechaNacimiento || '',
            correo: formData.correo || '',
            direccion: formData.direccion || '',
            tipoVivienda: formData.tipoVivienda || '',
            piso: formData.piso || '',
            nombreConjunto: formData.nombreConjunto || '',
            torreBloque: formData.torreBloque || '',
            aptoCasa: formData.aptoCasa || '',
            departamento: formData.departamento || '',
            municipio: formData.municipio || '',
            barrio: formData.barrio || '',
            estrato: formData.estrato || '',
            celular: formData.celular || '',
            plan: formData.plan || '',
            valorPlan: formData.valorPlan || '',
            descripcionPlan: formData.descripcionPlan || '',
            fechaEnvio: formData.fechaEnvio || new Date().toLocaleString('es-CO')
        }
    };
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(dataToSend),
            redirect: 'follow'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const responseText = await response.text();
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            throw new Error('Respuesta inválida del servidor');
        }
        
        if (result && result.success) {
            return result;
        } else {
            throw new Error(result?.error || 'Error desconocido en Google Sheets');
        }
        
    } catch (error) {
        console.error('Error al enviar a Google Sheets:', error);
        throw error;
    }
}

// Funciones de modales de carga, éxito y error
function showLoadingModal() {
    const loadingModal = document.createElement('div');
    loadingModal.id = 'loadingModalDynamic';
    loadingModal.className = 'modal-overlay';
    loadingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    loadingModal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #1a1a1a, #000);
            border: 2px solid #0066ff;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid #333;
                border-top: 4px solid #0066ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            "></div>
            <h3 style="color: #0066ff; margin-bottom: 1rem;">⚡ Enviando datos Relámpago...</h3>
            <p style="color: #f8f9fa;">Por favor espere mientras procesamos su información</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loadingModal);
}

function hideLoadingModal() {
    const loadingModal = document.getElementById('loadingModalDynamic');
    if (loadingModal) {
        document.body.removeChild(loadingModal);
    }
}

function showSuccessMessage() {
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay';
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    successModal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #1a1a1a, #000);
            border: 2px solid #00ff00;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        ">
            <h2 style="color: #00ff00; margin-bottom: 1rem;">✅ ¡Éxito Relámpago! ⚡</h2>
            <p style="color: #f8f9fa; margin-bottom: 1rem;">Sus datos han sido enviados correctamente.</p>
            <p style="color: #f8f9fa; margin-bottom: 1rem;">📊 Guardado en Google Sheets</p>
            <p style="color: #f8f9fa; margin-bottom: 1rem;">📱 Enviado a WhatsApp</p>
            <p style="color: #f8f9fa;">En breve nos pondremos en contacto para activar su plan Relámpago. ⚡</p>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    setTimeout(() => {
        if (document.body.contains(successModal)) {
            document.body.removeChild(successModal);
        }
    }, 3000);
}

function showErrorMessage() {
    const errorModal = document.createElement('div');
    errorModal.className = 'modal-overlay';
    errorModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    errorModal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #1a1a1a, #000);
            border: 2px solid #ff0000;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
        ">
            <h2 style="color: #ff0000; margin-bottom: 1rem;">⚠️ Advertencia</h2>
            <p style="color: #f8f9fa; margin-bottom: 1rem;">Hubo un problema al guardar en Google Sheets.</p>
            <p style="color: #f8f9fa; margin-bottom: 1rem;">📱 Sus datos se enviaron a WhatsApp correctamente</p>
            <p style="color: #f8f9fa;">Nuestro equipo procesará su solicitud Relámpago manualmente. ⚡</p>
        </div>
    `;
    
    document.body.appendChild(errorModal);
    
    setTimeout(() => {
        if (document.body.contains(errorModal)) {
            document.body.removeChild(errorModal);
        }
    }, 3000);
}
