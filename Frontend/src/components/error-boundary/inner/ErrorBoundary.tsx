import React from 'react';

import ErrorFallbackUi from '../ErrorFallbackUi';
import { ErrorBoundaryProps } from '../types';

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, errorInfo: undefined };

  static getDerivedStateFromError(error: string) {
    return { hasError: true, errorInfo: error.toString() };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackUi error={this.state.errorInfo}></ErrorFallbackUi>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
