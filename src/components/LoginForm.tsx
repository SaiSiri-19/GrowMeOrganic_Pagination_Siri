
// import React, { useState } from 'react';

// interface LoginFormProps {
//   onLogin: (name: string, email: string) => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (name && email) {
//       onLogin(name, email);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.heading}>Login To View Your Pagination</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.inputGroup}>
//             <label htmlFor="name" style={styles.label}>Name:</label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.inputGroup}>
//             <label htmlFor="email" style={styles.label}>Email:</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f0f0f0',
//   },
//   formContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px',
//   },
//   heading: {
//     fontSize: '1.5rem',
//     marginBottom: '1rem',
//   },
//   form: {
//     width: '100%',
//   },
//   inputGroup: {
//     marginBottom: '1rem',
//     width: '100%',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '0.5rem',
//     fontSize: '1.1rem',
//   },
//   input: {
//     width: '100%',
//     padding: '0.8rem',
//     fontSize: '1rem',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     width: '100%',
//     padding: '0.8rem',
//     fontSize: '1.1rem',
//     borderRadius: '4px',
//     border: 'none',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     cursor: 'pointer',
//   },
// };

// export default LoginForm;



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

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f0f0',
    margin: 0,  // Ensure no margin around the container
    padding: 0, // Ensure no padding around the container
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 35px rgba(0, 0, 0, 0.2)',  // Shadow applied here
    width: '100%',
    maxWidth: '400px',
    transform: 'translateX(0)',  // Center the form horizontally
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

export default LoginForm;

