// src/pages/Contact/Contact.jsx

import { useState } from 'react';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

const Contact = () => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      showError('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    showSuccess('Mensaje enviado exitosamente. Te contactaremos pronto.');
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-display-lg mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Contáctanos
            </h1>
            <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            ¿Tienes preguntas? Estamos aquí para ayudarte. 
            Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              {/* Nombre */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider"
                >
                  Nombre completo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-gray-900 font-medium"
                  placeholder="Juan Pérez"
                />
              </div>

              {/* Email y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider"
                  >
                    Correo electrónico <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-gray-900 font-medium"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-gray-900 font-medium"
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>

              {/* Asunto */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label
                  htmlFor="subject"
                  className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider"
                >
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-gray-900 font-medium"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="producto">Consulta sobre producto</option>
                  <option value="pedido">Estado de pedido</option>
                  <option value="devolucion">Cambios y devoluciones</option>
                  <option value="sugerencia">Sugerencias</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider"
                >
                  Mensaje <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 resize-none text-gray-900 font-medium"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              {/* Botón submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth={false}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Enviar Mensaje
                </Button>
              </div>

              <p className="text-sm text-gray-500 font-medium">
                <span className="text-red-600">*</span> Campos obligatorios
              </p>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-6">
            {/* Card de info */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display uppercase mb-8 tracking-wider border-b-2 border-primary pb-4">
                Información de Contacto
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Email</p>
                    <a
                      href="mailto:info@aura.com"
                      className="text-gray-600 hover:text-accent transition-colors font-medium"
                    >
                      info@aura.com
                    </a>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Teléfono</p>
                    <a
                      href="tel:+573001234567"
                      className="text-gray-600 hover:text-accent transition-colors font-medium"
                    >
                      +57 300 123 4567
                    </a>
                  </div>
                </div>

                {/* Dirección */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Dirección</p>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      Calle 5 #4-45<br />
                      Popayán, Cauca<br />
                      Colombia
                    </p>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Horario</p>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      Lun - Vie: 9:00 AM - 6:00 PM<br />
                      Sábados: 10:00 AM - 2:00 PM<br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <h3 className="text-xl font-display uppercase mb-4 tracking-wider border-b-2 border-white/30 pb-4">
                Síguenos
              </h3>
              <p className="text-gray-100 text-sm mb-6 font-medium">
                Mantente al día con nuestras novedades y promociones
              </p>
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', url: 'https://facebook.com' },
                  { name: 'Instagram', url: 'https://instagram.com' },
                  { name: 'Twitter', url: 'https://twitter.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-110 shadow-lg"
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;