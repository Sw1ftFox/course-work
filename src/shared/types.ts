export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  className?: string;
  onClick?: (...args: any[]) => void;
  args?: any[];
}
