/**
 * CocoAlert - Configurable Alert System for React & Next.js
 *
 * Installation:
 * npm install coco-alert
 *
 * Usage:
 * 1. Add AlertContainer to your root component
 * 2. Configure theme and position
 * 3. Use coco_Alert anywhere in your app
 *
 * import { AlertContainer, coco_Alert } from 'coco-alert/react';
 *
 * function App() {
 *   return (
 *     <>
 *       <AlertContainer isLightMode={false} position="top-right" />
 *       <YourComponents />
 *     </>
 *   );
 * }
 *
 * // Then use anywhere:
 * coco_Alert.success('It works!');
 */

"use client";

import React, {
  useState,
  useEffect,
  CSSProperties,
  createContext,
  useContext,
} from "react";

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

interface Alert {
  id: number;
  type: Exclude<AlertType, "confirm">;
  message: string;
  duration: number;
  position?: AlertPosition;
}

interface ConfirmAlert {
  id: number;
  type: "confirm";
  message: string;
  position?: AlertPosition;
  duration: 0;
  onConfirm: () => void;
  onCancel: () => void;
}

interface AlertContainerProps {
  isLightMode?: boolean;
  position?: AlertPosition;
}

interface AlertConfig {
  isLightMode: boolean;
  defaultPosition: AlertPosition;
}

// ==========================================
// CONTEXT
// ==========================================

const AlertConfigContext = createContext<AlertConfig>({
  isLightMode: false,
  defaultPosition: "top-right",
});

// ==========================================
// ICONS
// ==========================================

const CheckCircle = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircle = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Info = ({ color, size = 20 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const AlertTriangle = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const X = ({ color, size = 18 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ==========================================
// CONFIG - DARK & LIGHT THEMES
// ==========================================

const darkTheme: Record<
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

const lightTheme: Record<
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
    bgColor: "rgba(240, 253, 244, 0.98)",
    borderColor: "rgba(34, 197, 94, 0.3)",
    textColor: "#065f46",
    icon: CheckCircle,
    iconColor: "#059669",
    progressColor: "#10b981",
  },
  error: {
    bgColor: "rgba(254, 242, 242, 0.98)",
    borderColor: "rgba(239, 68, 68, 0.3)",
    textColor: "#991b1b",
    icon: AlertCircle,
    iconColor: "#dc2626",
    progressColor: "#ef4444",
  },
  warning: {
    bgColor: "rgba(254, 252, 232, 0.98)",
    borderColor: "rgba(234, 179, 8, 0.3)",
    textColor: "#713f12",
    icon: AlertTriangle,
    iconColor: "#ca8a04",
    progressColor: "#eab308",
  },
  info: {
    bgColor: "rgba(239, 246, 255, 0.98)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    textColor: "#1e3a8a",
    icon: Info,
    iconColor: "#2563eb",
    progressColor: "#3b82f6",
  },
  confirm: {
    bgColor: "rgba(254, 252, 232, 0.98)",
    borderColor: "rgba(234, 179, 8, 0.3)",
    textColor: "#713f12",
    icon: AlertTriangle,
    iconColor: "#ca8a04",
    progressColor: "#eab308",
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
    "bottom-center": {
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };
  return positions[position];
};

// ==========================================
// INJECT STYLES
// ==========================================

const injectStyles = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("coco-alert-styles")) return;

  const style = document.createElement("style");
  style.id = "coco-alert-styles";
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

const AlertItem = ({
  alert,
  onClose,
}: {
  alert: Alert | ConfirmAlert;
  onClose: (id: number) => void;
}) => {
  const [progress, setProgress] = useState(100);
  const { isLightMode } = useContext(AlertConfigContext);
  const theme = isLightMode ? lightTheme : darkTheme;
  const config = theme[alert.type];
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
    position: "relative",
    width: "320px",
    marginBottom: "12px",
    borderRadius: "8px",
    overflow: "hidden",
    border: `1px solid ${config.borderColor}`,
    backgroundColor: config.bgColor,
    color: config.textColor,
    boxShadow: isLightMode
      ? "0 4px 12px rgba(0, 0, 0, 0.1)"
      : "0 4px 12px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(8px)",
  };

  const progressBarStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
  };

  const progressFillStyle: CSSProperties = {
    height: "100%",
    backgroundColor: config.progressColor,
    width: `${progress}%`,
    transition: "width 0.02s linear",
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
  };

  const iconStyle: CSSProperties = {
    flexShrink: 0,
    marginTop: "2px",
  };

  const messageStyle: CSSProperties = {
    flex: 1,
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: 500,
  };

  const closeButtonStyle: CSSProperties = {
    flexShrink: 0,
    background: "none",
    border: "none",
    cursor: "pointer",
    opacity: 0.7,
    transition: "opacity 0.2s",
    padding: 0,
  };

  const buttonContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "12px",
  };

  const cancelButtonStyle: CSSProperties = {
    padding: "6px 12px",
    fontSize: "12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: isLightMode ? "#e5e7eb" : "#1e293b",
    color: isLightMode ? "#374151" : "#e2e8f0",
    transition: "background-color 0.2s",
  };

  const confirmButtonStyle: CSSProperties = {
    padding: "6px 12px",
    fontSize: "12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ef4444",
    color: "white",
    transition: "background-color 0.2s",
  };

  const closeColor = isLightMode ? "#6b7280" : "#d1d5db";

  if (alert.type === "confirm") {
    const confirmAlert = alert as ConfirmAlert;
    return (
      <div className="coco-alert-animate" style={alertStyle}>
        <div style={contentStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: "100%",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
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
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmAlert.onConfirm();
                  onClose(alert.id);
                }}
                style={confirmButtonStyle}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          aria-label="Close"
        >
          <X color={closeColor} size={18} />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// ALERT CONTAINER COMPONENT
// ==========================================

const AlertContainerComponent = ({
  defaultPosition,
}: {
  defaultPosition: AlertPosition;
}) => {
  const [alerts, setAlerts] = useState<(Alert | ConfirmAlert)[]>([]);

  useEffect(() => {
    const listener = (newAlerts: (Alert | ConfirmAlert)[]) => {
      setAlerts(newAlerts);
    };
    listeners.push(listener);
    setAlerts([...alertQueue]);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const removeAlert = (id: number) => {
    alertQueue = alertQueue.filter((alert) => alert.id !== id);
    notifyListeners();
  };

  const alertsByPosition = alerts.reduce((acc, alert) => {
    const pos = alert.position || defaultPosition;
    acc[pos] = acc[pos] || [];
    acc[pos].push(alert);
    return acc;
  }, {} as Record<string, typeof alerts>);

  return (
    <>
      {Object.entries(alertsByPosition).map(([pos, posAlerts]) => {
        const containerStyle: CSSProperties = {
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          ...getPositionStyles(pos as AlertPosition),
        };

        return (
          <div key={pos} style={containerStyle}>
            <div style={{ pointerEvents: "auto" }}>
              {posAlerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} onClose={removeAlert} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

// ==========================================
// PUBLIC ALERT CONTAINER
// ==========================================

export const AlertContainer: React.FC<AlertContainerProps> = ({
  isLightMode = false,
  position = "top-right",
}) => {
  const config: AlertConfig = {
    isLightMode,
    defaultPosition: position,
  };

  return (
    <AlertConfigContext.Provider value={config}>
      <AlertContainerComponent defaultPosition={position} />
    </AlertConfigContext.Provider>
  );
};

// ==========================================
// MANAGEMENT
// ==========================================

let alertQueue: (Alert | ConfirmAlert)[] = [];
let listeners: ((alerts: (Alert | ConfirmAlert)[]) => void)[] = [];

const notifyListeners = () =>
  listeners.forEach((listener) => listener([...alertQueue]));

const addAlert = (
  type: Exclude<AlertType, "confirm">,
  message: string,
  duration = 4000,
  position?: AlertPosition
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

// ==========================================
// PUBLIC API
// ==========================================

export const coco_Alert = {
  success: (message: string, duration?: number, position?: AlertPosition) =>
    addAlert("success", message, duration || 4000, position),

  error: (message: string, duration?: number, position?: AlertPosition) =>
    addAlert("error", message, duration || 4000, position),

  warning: (message: string, duration?: number, position?: AlertPosition) =>
    addAlert("warning", message, duration || 4000, position),

  info: (message: string, duration?: number, position?: AlertPosition) =>
    addAlert("info", message, duration || 4000, position),

  confirm: (message: string, position?: AlertPosition): Promise<boolean> => {
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
  },
};

export default coco_Alert;
