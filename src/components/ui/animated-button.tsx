import { useEffect, useRef, useState } from "react";
import "../../styles/animated-button.css";

interface AnimatedButtonProps {
  buttonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  isIconOnly?: boolean;
}

const AnimatedButton = ({
  buttonText,
  onClick,
  disabled = false,
  className = "",
  type = 'button',
  variant = 'primary',
  icon,
  isIconOnly = false
}: AnimatedButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  // Split text into words first, then handle spaces properly
  const words = buttonText.split(' ');
  const letters = buttonText.split('');

  useEffect(() => {
    if (textRef.current) {
      // Create a temporary element to measure text width
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.style.fontFamily = 'inherit';
      tempElement.style.fontSize = 'inherit';
      tempElement.style.fontWeight = 'inherit';
      tempElement.textContent = buttonText;

      document.body.appendChild(tempElement);
      const width = tempElement.offsetWidth;
      document.body.removeChild(tempElement);

      setTextWidth(width);
    }
  }, [buttonText]);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsPressed(true);
      onClick();
      setTimeout(() => setIsPressed(false), 200);
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!disabled) {
      setIsPressed(false);
    }
  };

  const buttonClasses = [
    'btn h-10',
    disabled ? 'btn-disabled' : '',
    variant === 'secondary' ? 'btn-secondary' : '',
    isPressed ? 'btn-pressed' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="btn-wrapper">
      <button
        className={buttonClasses}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        disabled={disabled}
        type={type}
      >
        {icon && icon}

        <div className="txt-wrapper flex items-center justify-center" ref={textRef} style={{ width: textWidth ? `${textWidth + 40}px` : 'auto' }}>
          <div className="txt-1">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`btn-letter ${letter === ' ' ? 'letter-space' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          <div className="txt-2">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`btn-letter ${letter === ' ' ? 'letter-space' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  )
}

export default AnimatedButton