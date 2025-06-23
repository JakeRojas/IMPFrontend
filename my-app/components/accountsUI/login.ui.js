'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';

export default function LoginUI({
  formData,
  setFormData,
  errorMsg,
  loading,
  handleSubmit,
}) {
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '2rem auto' }}>
      <h2>Login</h2>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((fd) => ({ ...fd, email: e.target.value }))
          }
          required
        />
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((fd) => ({ ...fd, password: e.target.value }))
          }
          required
        />
      </div>

      <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Logging in…' : 'Login'}
      </button>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{' '}
        <Link href="/register">
          Register
        </Link>
      </p>

    </form>
  );
}

LoginUI.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};