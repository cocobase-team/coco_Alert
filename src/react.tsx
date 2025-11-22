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

import React, { useState, useEffect } from "react";

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
// ICONS (Inline SVG - No External Dependencies)
// ==========================================

const CheckCircle = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircle = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Info = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const AlertTriangle = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const X = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ==========================================
// CONFIG
// ==========================================

const ALERT_CONFIG = {
  isLightMode: false,
  defaultPosition: "top-right" as AlertPosition,
};

const alertConfig: Record<
  AlertType,
  {
    borderColor: string;
    bgColor: string;
    textColor: string;
    icon: any;
    iconColor: string;
    progressColor: string;
  }
> = {
  success: {
    borderColor: "border-green-500/50",
    bgColor: "bg-green-900/70",
    textColor: "text-gray-100",
    icon: CheckCircle,
    iconColor: "text-green-400",
    progressColor: "bg-green-400",
  },
  error: {
    borderColor: "border-red-500/50",
    bgColor: "bg-red-900/70",
    textColor: "text-gray-100",
    icon: AlertCircle,
    iconColor: "text-red-400",
    progressColor: "bg-red-400",
  },
  warning: {
    borderColor: "border-yellow-500/50",
    bgColor: "bg-yellow-900/70",
    textColor: "text-gray-100",
    icon: AlertTriangle,
    iconColor: "text-yellow-400",
    progressColor: "bg-yellow-400",
  },
  info: {
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-900/70",
    textColor: "text-gray-100",
    icon: Info,
    iconColor: "text-blue-400",
    progressColor: "bg-blue-400",
  },
  confirm: {
    borderColor: "border-yellow-500/50",
    bgColor: "bg-yellow-900/70",
    textColor: "text-gray-100",
    icon: AlertTriangle,
    iconColor: "text-yellow-400",
    progressColor: "bg-yellow-400",
  },
};

// ==========================================
// INLINE STYLES (For when Tailwind is not available)
// ==========================================

const injectStyles = () => {
  if (typeof document === 'undefined') return; // SSR safety
  if (document.getElementById('coco-alert-styles')) return;

  const style = document.createElement('style');
  style.id = 'coco-alert-styles';
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-slideDown {
      animation: slideDown 0.3s ease-out;
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

  // Confirmation Dialog
  if (alert.type === "confirm") {
    const confirmAlert = alert as ConfirmAlert;
    return (
      <div
        className={`relative w-80 rounded-lg shadow-lg mb-3 overflow-hidden border animate-slideDown ${
          isLightMode
            ? "bg-white border-gray-200 shadow-gray-200"
            : `${config.bgColor} ${config.borderColor} backdrop-blur-md border-opacity-50 shadow-lg shadow-black/20`
        }`}
      >
        <div className={`flex flex-col gap-3 p-4 ${isLightMode ? "text-gray-800" : "text-gray-100"}`}>
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <Icon className={config.iconColor} size={20} />
            </div>
            <p className={`flex-1 text-sm leading-relaxed ${isLightMode ? "text-gray-800 font-medium" : "text-gray-100 font-medium"}`}>
              {alert.message}
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                confirmAlert.onCancel();
                onClose(alert.id);
              }}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                isLightMode
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                confirmAlert.onConfirm();
                onClose(alert.id);
              }}
              className="px-3 py-1 text-xs rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Alert
  return (
    <div
      className={`relative w-80 rounded-lg shadow-lg mb-3 overflow-hidden border animate-slideDown ${
        isLightMode
          ? "bg-white border-gray-200 shadow-gray-200"
          : `${config.bgColor} ${config.borderColor} backdrop-blur-md border-opacity-50 shadow-lg shadow-black/20`
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5">
        <div
          className={`${config.progressColor} h-full`}
          style={{ width: `${progress}%`, transition: "width 0.02s linear" }}
        />
      </div>
      <div className={`flex items-start gap-3 p-4 ${isLightMode ? "text-gray-800" : "text-gray-100"}`}>
        <div className="shrink-0 mt-0.5">
          <Icon className={config.iconColor} size={20} />
        </div>
        <p className={`flex-1 text-sm leading-relaxed ${isLightMode ? "text-gray-800 font-medium" : "text-gray-100 font-medium"}`}>
          {alert.message}
        </p>
        <button
          onClick={() => onClose(alert.id)}
          className={`shrink-0 ${isLightMode ? "text-gray-500 hover:text-gray-700" : "text-gray-300 hover:text-gray-100"} transition-colors`}
          aria-label="Close"
        >
          <X size={18} />
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
      {Object.entries(alertsByPosition).map(([pos, posAlerts]) => (
        <div
          key={pos}
          className="fixed top-5 right-5 z-[1000] w-full max-w-xs px-4"
        >
          {posAlerts.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onClose={removeAlert}
              isLightMode={isLightMode}
            />
          ))}
        </div>
      ))}
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
// DEFAULT EXPORT (For easier imports)
// ==========================================

export default coco_Alert;