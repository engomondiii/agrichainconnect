import React from 'react';
import Button from '../Button/Button';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Too many errors - suggest reload
      if (this.state.errorCount > 3) {
        return (
          <div className="error-boundary">
            <div className="error-content">
              <div className="error-icon">⚠️</div>
              <h1>Multiple Errors Detected</h1>
              <p>
                We've detected multiple errors. Please reload the page to continue.
              </p>
              <div className="error-actions">
                <Button variant="primary" onClick={this.handleReload}>
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        );
      }

      // Render fallback UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">😕</div>
            <h1>Oops! Something went wrong</h1>
            <p>
              We're sorry for the inconvenience. An unexpected error has occurred.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="error-actions">
              <Button variant="primary" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button variant="secondary" onClick={this.handleReload}>
                Reload Page
              </Button>
            </div>

            <p className="error-help">
              If this problem persists, please{' '}
              <a href="/contact" className="error-link">contact support</a>.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;