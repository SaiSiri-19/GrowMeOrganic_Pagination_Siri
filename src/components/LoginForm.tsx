
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (name: string, email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onLogin(name, email);
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f0f0f0',
      margin: 0,
      padding: 0,
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 35px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      transform: 'translateX(0)',
    },
    heading: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    form: {
      width: '100%',
    },
    inputGroup: {
      marginBottom: '1rem',
      width: '100%',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '1.1rem',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      fontSize: '1.1rem',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login To View Your Pagination</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
