'use client';

export default function RegisterUI({ 
  formData, 
  setFormData, 
  errorMsg, 
  success, 
  handleSubmit 
}) {

    return (
      <>
        <h2>Register</h2>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        {success ? (
          <p style={{ color: 'green' }}>
            Registration successful! Please check your email to verify your account.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            {['title','firstName','lastName','email','phoneNumber','password','confirmPassword'].map((field) => (
              <div key={field} style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'block', textTransform: 'capitalize' }}>{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                  value={formData[field]}
                  onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />  
              </div>
            ))}
            <button type="submit" style={{ marginTop: '1rem' }}>
              Register
            </button>
          </form>
        )}
      </>
    );
  }