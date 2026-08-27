import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

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
  });

  const [submitted, setSubmitted] = useState(false);
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
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="py-16 max-w-container mx-auto px-5 sm:px-10 lg:px-20 scroll-mt-20 sm:scroll-mt-24" id="registration">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-maroon-050 mb-3">
          <span className="type-label text-maroon-900 uppercase">Degree Conferment Portal</span>
        </div>
        <h2 className="type-display-lg text-text-default">Convocation Registration</h2>
        <p className="type-body-lg text-text-muted mt-2">
          Graduating students must register before October 31, 2026 to confirm attendance and regalia sizing.
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
              <p className="type-body-md text-text-muted max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Your convocation registration for Roll No.{' '}
                <strong>{formData.rollNumber}</strong> has been successfully submitted. Confirmation email has been sent to{' '}
                <strong>{formData.email}</strong>.
              </p>
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
                    });
                  }}
                >
                  Register Another Candidate
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name & Roll Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block type-label text-text-default mb-2">
                    Full Name (as per degree) <span className="text-error" aria-hidden="true">*</span>
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
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none focus-visible:border-action-primary text-[15px]"
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
                    Institute Roll Number <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="rollNumber"
                    type="text"
                    required
                    value={formData.rollNumber}
                    onChange={(e) => handleChange('rollNumber', e.target.value)}
                    aria-invalid={Boolean(errors.rollNumber)}
                    aria-describedby={errors.rollNumber ? 'rollNumber-error' : undefined}
                    placeholder="e.g. 220101001"
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none focus-visible:border-action-primary text-[15px]"
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
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none text-[15px]"
                  >
                    <option value="B.Tech">Bachelor of Technology (B.Tech)</option>
                    <option value="M.Tech">Master of Technology (M.Tech)</option>
                    <option value="Ph.D.">Doctor of Philosophy (Ph.D.)</option>
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
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none text-[15px]"
                  >
                    <option value="CSE">Computer Science & Engineering (CSE)</option>
                    <option value="ECE">Electronics & Communication Engineering (ECE)</option>
                    <option value="MEA">Mechatronics & Automation (MEA)</option>
                    <option value="BSH">Basic Sciences & Humanities</option>
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
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none focus-visible:border-action-primary text-[15px]"
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
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none focus-visible:border-action-primary text-[15px]"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="type-body-sm text-error mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Attendance & Regalia */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-border">
                <div>
                  <label htmlFor="attendingInPerson" className="block type-label text-text-default mb-2">
                    Attending in Person?
                  </label>
                  <select
                    id="attendingInPerson"
                    value={formData.attendingInPerson}
                    onChange={(e) => handleChange('attendingInPerson', e.target.value)}
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none text-[15px]"
                  >
                    <option value="yes">Yes, in person (Robes assigned)</option>
                    <option value="no">No, in absentia (Degree via post)</option>
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
                    className="w-full min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default focus-visible:outline-none text-[15px]"
                  >
                    <option value="S">Small (Height: 5'0" – 5'4")</option>
                    <option value="M">Medium (Height: 5'5" – 5'9")</option>
                    <option value="L">Large (Height: 5'10" – 6'1")</option>
                    <option value="XL">Extra Large (Height: 6'2"+)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" fullWidth>
                  Complete Registration & Reserve Robes
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
