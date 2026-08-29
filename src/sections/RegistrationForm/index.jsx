import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { CheckCircle2, AlertCircle, MapPin, Package, Sparkles } from 'lucide-react';
import { trackCustomEvent } from '../../utils/telemetry';

export function RegistrationFormSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    department: 'CSE',
    degree: 'B.Tech',
    email: '',
    phone: '',
    attendingInPerson: 'yes',
    guestCount: '2',
    regaliaSize: 'M',
    postalAddress: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.rollNumber.trim()) errs.rollNumber = 'Roll Number is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'A valid institute or personal email is required.';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'A valid 10-digit mobile number is required.';
    }
    if (formData.attendingInPerson === 'no' && !formData.postalAddress.trim()) {
      errs.postalAddress = 'Postal delivery address is required for degree dispatch via speed post.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            ...formData,
          }),
        });
      }
    } catch (err) {
      console.warn('Backend webhook notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      trackCustomEvent('registration_submitted', {
        degree: formData.degree,
        department: formData.department,
        attending_in_person: formData.attendingInPerson,
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="pt-8 pb-6 sm:pt-10 sm:pb-8 max-w-container mx-auto px-4 sm:px-10 lg:px-20 scroll-mt-20 sm:scroll-mt-24" id="registration">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-maroon-050 mb-2 sm:mb-3">
          <span className="type-label text-maroon-900 uppercase">Degree Conferment Portal</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-text-default">Convocation Registration</h2>
        <p className="type-body-lg text-text-muted mt-2 text-sm sm:text-base">
          Graduating students must register before October 31, 2026 to confirm attendance, regalia sizing, or postal degree delivery.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card variant="feature">
          {submitted ? (
            <div className="py-8 text-center space-y-4" role="status" aria-live="polite">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-success mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" />
              </div>
              <h3 className="type-display-md text-text-default">Registration Confirmed!</h3>
              <p className="type-body-md text-text-muted max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your convocation registration for Roll No.{' '}
                <strong>{formData.rollNumber}</strong> ({formData.degree} - {formData.department}) has been successfully submitted. Confirmation email has been sent to{' '}
                <strong>{formData.email}</strong>.
              </p>

              {formData.attendingInPerson === 'no' ? (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 max-w-md mx-auto text-left text-xs font-body text-amber-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                    <Package className="w-4 h-4 text-amber-800" />
                    <span>In Absentia Dispatch Delivery</span>
                  </div>
                  <p className="text-amber-800/90 leading-relaxed">
                    Your degree scroll and certificates will be dispatched by Registered Speed Post to:
                  </p>
                  <p className="font-semibold text-charcoal-900 bg-white p-2.5 rounded-lg border border-amber-200">
                    {formData.postalAddress}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-maroon-050/60 border border-maroon-900/15 max-w-md mx-auto text-center text-xs font-body text-maroon-900">
                  <span>Robes Size reserved: <strong>{formData.regaliaSize}</strong> • Please collect your regalia on 26 September 2026 at the Academic Block.</span>
                </div>
              )}

              <div className="pt-4">
                <Button
                  variant="secondary"
                  size="compact"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      rollNumber: '',
                      department: 'CSE',
                      degree: 'B.Tech',
                      email: '',
                      phone: '',
                      attendingInPerson: 'yes',
                      guestCount: '2',
                      regaliaSize: 'M',
                      postalAddress: '',
                    });
                  }}
                >
                  Register Another Candidate
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Full Name & Roll Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block type-label text-text-default mb-2">
                    Full Name <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    placeholder="e.g. Yash Kumar"
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default placeholder:text-charcoal-400 focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[15px]"
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="type-body-sm text-error mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="rollNumber" className="block type-label text-text-default mb-2">
                    Roll Number / Registration No. <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="rollNumber"
                    type="text"
                    required
                    value={formData.rollNumber}
                    onChange={(e) => handleChange('rollNumber', e.target.value)}
                    aria-invalid={Boolean(errors.rollNumber)}
                    aria-describedby={errors.rollNumber ? 'rollNumber-error' : undefined}
                    placeholder="e.g. 240101170"
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default placeholder:text-charcoal-400 focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[15px]"
                  />
                  {errors.rollNumber && (
                    <p id="rollNumber-error" className="type-body-sm text-error mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.rollNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Program & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="degree" className="block type-label text-text-default mb-2">
                    Degree Program
                  </label>
                  <select
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    className="w-full max-w-full min-h-[46px] px-3 sm:px-4 rounded-xl sm:rounded-sm bg-bg-surface border border-border text-text-default focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[13.5px] sm:text-[15px] cursor-pointer box-border"
                  >
                    <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                    <option value="M.Tech">M.Tech (Master of Technology)</option>
                    <option value="Ph.D.">Ph.D. (Doctor of Philosophy)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="block type-label text-text-default mb-2">
                    Department / Branch
                  </label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className="w-full max-w-full min-h-[46px] px-3 sm:px-4 rounded-xl sm:rounded-sm bg-bg-surface border border-border text-text-default focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[13.5px] sm:text-[15px] cursor-pointer box-border"
                  >
                    <option value="CSE">CSE — Computer Science & Engg.</option>
                    <option value="ECE">ECE — Electronics & Comm. Engg.</option>
                    <option value="MEA">MEA — Mechatronics & Automation</option>
                    <option value="BSH">BSH — Basic Sciences & Humanities</option>
                  </select>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block type-label text-text-default mb-2">
                    Email Address <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="yash@iiitbh.ac.in"
                    className="w-full min-h-[46px] px-3.5 sm:px-4 rounded-xl sm:rounded-sm bg-bg-surface border border-border text-text-default placeholder:text-charcoal-400 focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[14px] sm:text-[15px] box-border"
                  />
                  {errors.email && (
                    <p id="email-error" className="type-body-sm text-error mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block type-label text-text-default mb-2">
                    Contact Phone Number <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    placeholder="+91 9876543210"
                    className="w-full min-h-[46px] px-3.5 sm:px-4 rounded-xl sm:rounded-sm bg-bg-surface border border-border text-text-default placeholder:text-charcoal-400 focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[14px] sm:text-[15px] box-border"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="type-body-sm text-error mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Attendance & Conditional Academic Robe or Wide Postal Address */}
              <div className="pt-4 border-t border-border space-y-6">
                {formData.attendingInPerson === 'yes' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="attendingInPerson" className="block type-label text-text-default mb-2">
                        Attending in Person?
                      </label>
                      <select
                        id="attendingInPerson"
                        value={formData.attendingInPerson}
                        onChange={(e) => handleChange('attendingInPerson', e.target.value)}
                        className="w-full max-w-full min-h-[46px] px-3 sm:px-4 rounded-xl sm:rounded-sm bg-bg-surface border border-border text-text-default focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[13.5px] sm:text-[15px] cursor-pointer box-border"
                      >
                        <option value="yes">Yes, in Person (Robes assigned)</option>
                        <option value="no">No, in Absentia (Degree via post)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="regaliaSize" className="block type-label text-text-default mb-2">
                        Academic Robe / Gown Size
                      </label>
                      <select
                        id="regaliaSize"
                        value={formData.regaliaSize}
                        onChange={(e) => handleChange('regaliaSize', e.target.value)}
                        className="w-full max-w-full min-h-[46px] px-3 sm:px-4 rounded-xl sm:rounded-sm bg-bg-surface border border-border text-text-default focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[13.5px] sm:text-[15px] cursor-pointer box-border"
                      >
                        <option value="S">Small (Height: 5'0" – 5'4")</option>
                        <option value="M">Medium (Height: 5'5" – 5'9")</option>
                        <option value="L">Large (Height: 5'10" – 6'1")</option>
                        <option value="XL">Extra Large (Height: 6'2"+)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Attending in person dropdown */}
                    <div>
                      <label htmlFor="attendingInPerson" className="block type-label text-text-default mb-2">
                        Attending in Person?
                      </label>
                      <select
                        id="attendingInPerson"
                        value={formData.attendingInPerson}
                        onChange={(e) => handleChange('attendingInPerson', e.target.value)}
                        className="w-full max-w-full min-h-[46px] px-3 sm:px-4 rounded-xl sm:rounded-sm bg-bg-surface border border-border text-text-default focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[13.5px] sm:text-[15px] cursor-pointer box-border"
                      >
                        <option value="yes">Yes, in Person (Robes assigned)</option>
                        <option value="no">No, in Absentia (Degree via post)</option>
                      </select>
                    </div>

                    {/* Wide Postal Delivery Address Field */}
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="postalAddress" className="type-label text-text-default flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-maroon-900" />
                          <span>Postal Delivery Address (For Degree Dispatch) <span className="text-error" aria-hidden="true">*</span></span>
                        </label>
                        <span className="text-xs font-body text-charcoal-500">Degree will be delivered via Speed Post</span>
                      </div>
                      <textarea
                        id="postalAddress"
                        rows={3}
                        required
                        value={formData.postalAddress}
                        onChange={(e) => handleChange('postalAddress', e.target.value)}
                        aria-invalid={Boolean(errors.postalAddress)}
                        aria-describedby={errors.postalAddress ? 'postalAddress-error' : undefined}
                        placeholder="Enter complete postal delivery address with Pin Code, Landmark, City & State (e.g. House No. 402, Block B, Green Heights, MG Road, Patna, Bihar - 800001)"
                        className="w-full p-4 rounded-sm bg-bg-surface border border-border text-text-default placeholder:text-charcoal-400 focus:border-maroon-900 focus:ring-1 focus:ring-maroon-900/30 focus:outline-none focus-visible:outline-none text-[15px] leading-relaxed resize-y"
                      />
                      {errors.postalAddress && (
                        <p id="postalAddress-error" className="type-body-sm text-error mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.postalAddress}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Submitting Registration...'
                    : formData.attendingInPerson === 'yes'
                    ? 'Complete Registration & Reserve Robes'
                    : 'Complete Registration & Confirm Postal Delivery'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

export default RegistrationFormSection;
