import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Import global styles
import './styles/globals.css';
import './styles/colors.css';
import './styles/typography.css';
import './styles/theme.css';
import './styles/utilities.css';

// Error Boundary for the entire app
class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Root Error Boundary caught an error:', error, errorInfo);
    
    // You can also log to an error reporting service like Sentry
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="root-error-boundary">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h1>Oops! Something went wrong</h1>
            <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="error-reload-btn"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);

// Register service worker for PWA capabilities
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('Service Worker registered successfully');
  },
  onUpdate: (registration) => {
    console.log('New content is available; please refresh.');
    
    // Optionally show a toast notification to user
    if (window.confirm('New version available! Refresh to update?')) {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      window.location.reload();
    }
  },
  onError: (error) => {
    console.error('Service Worker registration failed:', error);
  }
});

// Performance monitoring
reportWebVitals((metric) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // Send to analytics in production
  // sendToAnalytics(metric);
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Log to error reporting service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Log to error reporting service
});

// Add styles for root error boundary
const style = document.createElement('style');
style.textContent = `
  .root-error-boundary {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f5f5f5;
    padding: 2rem;
  }

  .error-content {
    text-align: center;
    max-width: 600px;
  }

  .error-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  .error-content h1 {
    margin: 0 0 1rem;
    font-size: 2rem;
    color: #1B5E20;
  }

  .error-content p {
    margin: 0 0 2rem;
    font-size: 1.125rem;
    color: #616161;
  }

  .error-reload-btn {
    padding: 0.75rem 2rem;
    background: #2E7D32;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .error-reload-btn:hover {
    background: #1B5E20;
  }
`;
document.head.appendChild(style);