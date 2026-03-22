'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', orgType: 'Food Processor / Manufacturer', topic: 'NAFDAC Certification', message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        subject: `${formData.orgType} - ${formData.topic}`,
                        message: formData.message
                    }
                })
            });
            if (!res.ok) throw new Error('Failed to submit');
            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', orgType: 'Food Processor / Manufacturer', topic: 'NAFDAC Certification', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            {status === 'success' && <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '4px', marginBottom: '1rem', fontWeight: 600 }}>Message sent successfully! We will get back to you shortly.</div>}
            {status === 'error' && <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '1rem', fontWeight: 600 }}>Failed to send message. Please try again later.</div>}
            
            <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input type="text" className="form-control" placeholder="Jane" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input type="text" className="form-control" placeholder="Doe" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
            </div>

            <div className="form-grid full" style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label className="form-label">Work Email *</label>
                    <input type="email" className="form-control" placeholder="jane@company.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
            </div>

            <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label className="form-label">Organization Type</label>
                    <select className="form-control" value={formData.orgType} onChange={e => setFormData({...formData, orgType: e.target.value})}>
                        <option>Food Processor / Manufacturer</option>
                        <option>Government / Regulatory</option>
                        <option>NGO / Civil Society</option>
                        <option>Research / Academia</option>
                        <option>Media</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Inquiry Topic</label>
                    <select className="form-control" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}>
                        <option>NAFDAC Certification</option>
                        <option>Premix Supply</option>
                        <option>Partnership Inquiry</option>
                        <option>Data & Research</option>
                        <option>General Support</option>
                    </select>
                </div>
            </div>

            <div className="form-grid full" style={{ marginBottom: '2rem' }}>
                <div className="form-group">
                    <label className="form-label">Your Message *</label>
                    <textarea className="form-control" placeholder="Tell us how we can assist you..." required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1 }} disabled={status === 'loading'}>
                 {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
