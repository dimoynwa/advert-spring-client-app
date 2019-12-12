import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error);
   // Update state so the next render will show the fallback UI.
   return { hasError: true };
 }

  componentDidCatch(error, info) {
    console.log('ErrorBoundary', error);
    console.log('ErrorBoundary', info);
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
