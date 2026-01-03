"use client";

import { Component, ReactNode } from "react";
import { Button } from "./button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-8">
            <h2 className="mb-4 text-xl font-semibold">Something went wrong</h2>
            <p className="mb-4 text-sm text-gray-400">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button
              onClick={() => this.setState({ hasError: false })}
              variant="primary"
            >
              Try again
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

