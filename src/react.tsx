/**
 * CocoAlert - Universal React/Next.js Alert System
 * Works with: React, Next.js (App Router & Pages Router)
 * 
 * Installation:
 * npm install coco-alert
 * 
 * Usage:
 * import { coco_Alert, coco_confirm, useAlerts, AlertContainer } from 'coco-alert/react';
 */

"use client"; // For Next.js App Router

import React, { useState, useEffect, CSSProperties } from "react";

// ==========================================
// TYPES
// ==========================================

export type AlertType = "success" | "error" | "warning" | "info" | "confirm";

export type AlertPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface Alert {
  id: number;
  type: Exclude<AlertType, "confirm">;
  message: string;
  duration: number;
  position?: AlertPosition;
}

export interface ConfirmAlert {
  id: number;
  type: "confirm";
  message: string;
  position?: AlertPosition;
  duration: 0;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface AlertItemProps {
  alert: Alert | ConfirmAlert;
  onClose: (id: number) => void;
  isLightMode: boolean;
}

export interface AlertContainerProps {
  alerts: (Alert | ConfirmAlert)[];
  removeAlert: (id: number) => void;
  isLightMode: boolean;
  position: AlertPosition;
}

// ==========================================
// ICONS (Inline SVG)
// ==========================================

const CheckCircle = ({ color, size = 20 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircle = ({ color, size = 20 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Info = ({ color, size = 20 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const AlertTriangle = ({ color, size = 20 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const X = ({ color, size = 18 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ==========================================
// CONFIG WITH INLINE STYLES
// ==========================================

const ALERT_CONFIG = {
  isLightMode: false,
  defaultPosition: "top-right" as AlertPosition,
};

const alertConfig: Record<
  AlertType,
  {
    bgColor: string;
    borderColor: string;
    textColor: string;
    icon: any;
    iconColor: string;
    progressColor: string;
  }
> = {
  success: {
    bgColor: "rgba(5, 46, 22, 0.95)",
    borderColor: "rgba(34, 197, 94, 0.5)",
    textColor: "#f3f4f6",
    icon: CheckCircle,
    iconColor: "#4ade80",
    progressColor: "#4ade80",
  },
  error: {
    bgColor: "rgba(69, 10, 10, 0.95)",
    borderColor: "rgba(239, 68, 68, 0.5)",
    textColor: "#f3f4f6",
    icon: AlertCircle,
    iconColor: "#f87171",
    progressColor: "#f87171",
  },
  warning: {
    bgColor: "rgba(69, 26, 3, 0.95)",
    borderColor: "rgba(234, 179, 8, 0.5)",
    textColor: "#f3f4f6",
    icon: AlertTriangle,
    iconColor: "#facc15",
    progressColor: "#facc15",
  },
  info: {
    bgColor: "rgba(7, 29, 54, 0.95)",
    borderColor: "rgba(59, 130, 246, 0.5)",
    textColor: "#f3f4f6",
    icon: Info,
    iconColor: "#60a5fa",
    progressColor: "#60a5fa",
  },
  confirm: {
    bgColor: "rgba(69, 26, 3, 0.95)",
    borderColor: "rgba(234, 179, 8, 0.5)",
    textColor: "#f3f4f6",
    icon: AlertTriangle,
    iconColor: "#facc15",
    progressColor: "#facc15",
  },
};

// Light mode colors
const lightModeConfig: Record<
  AlertType,
  {
    bgColor: string;
    borderColor: string;
    textColor: string;
  }
> = {
  success: {
    bgColor: "#dcfce7",
    borderColor: "#86efac",
    textColor: "#166534",
  },
  error: {
    bgColor: "#fee2e2",
    borderColor: "#fca5a5",
    textColor: "#991b1b",
  },
  warning: {
    bgColor: "#fef3c7",
    borderColor: "#fcd34d",
    textColor: "#854d0e",
  },
  info: {
    bgColor: "#dbeafe",
    borderColor: "#93c5fd",
    textColor: "#1e40af",
  },
  confirm: {
    bgColor: "#fef3c7",
    borderColor: "#fcd34d",
    textColor: "#854d0e",
  },
};

// ==========================================
// POSITION STYLES
// ==========================================

const getPositionStyles = (position: AlertPosition): CSSProperties => {
  const positions: Record<AlertPosition, CSSProperties> = {
    "top-left": { top: "24px", left: "24px" },
    "top-right": { top: "24px", right: "24px" },
    "top-center": { top: "24px", left: "50%", transform: "translateX(-50%)" },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    "bottom-left": { bottom: "24px", left: "24px" },
    "bottom-right": { bottom: "24px", right: "24px" },
    "bottom-center": { bottom: "24px", left: "50%", transform: "translateX(-50%)" },
  };
  return positions[position];
};

// ==========================================
// INJECT STYLES
// ==========================================

const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('coco-alert-styles')) return;

  const style = document.createElement('style');
  style.id = 'coco-alert-styles';
  style.textContent = `
    @keyframes cocoSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .coco-alert-animate {
      animation: cocoSlideIn 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
};

// ==========================================
// ALERT ITEM COMPONENT
// ==========================================

const AlertItem: React.FC<AlertItemProps> = ({
  alert,
  onClose,
  isLightMode,
}) => {
  const [progress, setProgress] = useState(100);
  const config = alertConfig[alert.type];
  const lightConfig = lightModeConfig[alert.type];
  const Icon = config.icon;

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (alert.type !== "confirm") {
      const interval = 20;
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / alert.duration) * 100);
        setProgress(remaining);
        if (remaining <= 0) {
          clearInterval(timer);
          onClose(alert.id);
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [alert, onClose]);

  const alertStyle: CSSProperties = {
    position: 'relative',
    width: '320px',
    marginBottom: '12px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: `1px solid ${isLightMode ? lightConfig.borderColor : config.borderColor}`,
    backgroundColor: isLightMode ? lightConfig.bgColor : config.bgColor,
    color: isLightMode ? lightConfig.textColor : config.textColor,
    boxShadow: isLightMode 
      ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
      : '0 4px 12px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
  };

  const progressBarStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
  };

  const progressFillStyle: CSSProperties = {
    height: '100%',
    backgroundColor: config.progressColor,
    width: `${progress}%`,
    transition: 'width 0.02s linear',
  };

  const contentStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
  };

  const iconStyle: CSSProperties = {
    flexShrink: 0,
    marginTop: '2px',
  };

  const messageStyle: CSSProperties = {
    flex: 1,
    fontSize: '14px',
    lineHeight: '1.5',
    fontWeight: 500,
  };

  const closeButtonStyle: CSSProperties = {
    flexShrink: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    padding: 0,
  };

  const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '12px',
  };

  const cancelButtonStyle: CSSProperties = {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: isLightMode ? '#e5e7eb' : '#1e293b',
    color: isLightMode ? '#1f2937' : '#e2e8f0',
    transition: 'background-color 0.2s',
  };

  const confirmButtonStyle: CSSProperties = {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#ef4444',
    color: 'white',
    transition: 'background-color 0.2s',
  };

  // Confirmation Dialog
  if (alert.type === "confirm") {
    const confirmAlert = alert as ConfirmAlert;
    return (
      <div className="coco-alert-animate" style={alertStyle}>
        <div style={contentStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={iconStyle}>
                <Icon color={config.iconColor} size={20} />
              </div>
              <p style={messageStyle}>{alert.message}</p>
            </div>
            <div style={buttonContainerStyle}>
              <button
                onClick={() => {
                  confirmAlert.onCancel();
                  onClose(alert.id);
                }}
                style={cancelButtonStyle}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmAlert.onConfirm();
                  onClose(alert.id);
                }}
                style={confirmButtonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Alert
  return (
    <div className="coco-alert-animate" style={alertStyle}>
      <div style={progressBarStyle}>
        <div style={progressFillStyle} />
      </div>
      <div style={contentStyle}>
        <div style={iconStyle}>
          <Icon color={config.iconColor} size={20} />
        </div>
        <p style={messageStyle}>{alert.message}</p>
        <button
          onClick={() => onClose(alert.id)}
          style={closeButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
          aria-label="Close"
        >
          <X color={isLightMode ? '#6b7280' : '#d1d5db'} size={18} />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// ALERT CONTAINER COMPONENT
// ==========================================

export const AlertContainer: React.FC<AlertContainerProps> = ({
  alerts,
  removeAlert,
  isLightMode,
  position,
}) => {
  const alertsByPosition = alerts.reduce((acc, alert) => {
    const pos = alert.position || position;
    acc[pos] = acc[pos] || [];
    acc[pos].push(alert);
    return acc;
  }, {} as Record<string, typeof alerts>);

  return (
    <>
      {Object.entries(alertsByPosition).map(([pos, posAlerts]) => {
        const containerStyle: CSSProperties = {
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          ...getPositionStyles(pos as AlertPosition),
        };

        return (
          <div key={pos} style={containerStyle}>
            <div style={{ pointerEvents: 'auto' }}>
              {posAlerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  onClose={removeAlert}
                  isLightMode={isLightMode}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

// ==========================================
// MANAGEMENT
// ==========================================

let alertQueue: (Alert | ConfirmAlert)[] = [];
let listeners: ((alerts: (Alert | ConfirmAlert)[]) => void)[] = [];

const notifyListeners = () =>
  listeners.forEach((listener) => listener([...alertQueue]));

export const addAlert = (
  type: Exclude<AlertType, "confirm">,
  message: string,
  duration = 5000,
  position: AlertPosition = ALERT_CONFIG.defaultPosition
) => {
  const alert: Alert = {
    id: Date.now() + Math.random(),
    type,
    message,
    duration,
    position,
  };
  alertQueue.push(alert);
  notifyListeners();
};

export const removeAlert = (id: number) => {
  alertQueue = alertQueue.filter((alert) => alert.id !== id);
  notifyListeners();
};

// ==========================================
// PUBLIC API
// ==========================================

export const coco_Alert = {
  success: (message: string, duration = 4000, position?: AlertPosition) =>
    addAlert("success", message, duration, position),
  error: (message: string, duration = 4000, position?: AlertPosition) =>
    addAlert("error", message, duration, position),
  warning: (message: string, duration = 4000, position?: AlertPosition) =>
    addAlert("warning", message, duration, position),
  info: (message: string, duration = 4000, position?: AlertPosition) =>
    addAlert("info", message, duration, position),
};

export const coco_confirm = (
  message: string,
  position: AlertPosition = ALERT_CONFIG.defaultPosition
): Promise<boolean> => {
  return new Promise((resolve) => {
    const id = Date.now() + Math.random();
    const confirmAlert: ConfirmAlert = {
      id,
      type: "confirm",
      message,
      position,
      duration: 0,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    };
    alertQueue.push(confirmAlert);
    notifyListeners();
  });
};

// ==========================================
// HOOK
// ==========================================

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<(Alert | ConfirmAlert)[]>([]);
  
  useEffect(() => {
    listeners.push(setAlerts);
    setAlerts([...alertQueue]);
    return () => {
      listeners = listeners.filter((l) => l !== setAlerts);
    };
  }, []);
  
  return { alerts, removeAlert };
};

// ==========================================
// DEFAULT EXPORT
// ==========================================

export default coco_Alert;