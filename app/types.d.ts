declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      src: string;
      alt: string;
      'auto-rotate'?: boolean;
      'camera-controls'?: boolean;
      'shadow-intensity'?: string;
      'camera-orbit'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
      'rotation-per-second'?: string;
    }, HTMLElement>;
  }
} 