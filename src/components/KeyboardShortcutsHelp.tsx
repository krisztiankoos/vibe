import type { Language } from '../translations';
import type { KeyboardShortcut } from '../hooks/useKeyboardShortcuts';
import { getShortcutDisplay } from '../hooks/useKeyboardShortcuts';

interface KeyboardShortcutsHelpProps {
  language: Language;
  shortcuts: KeyboardShortcut[];
  onClose: () => void;
}

export default function KeyboardShortcutsHelp({ language, shortcuts, onClose }: KeyboardShortcutsHelpProps) {
  const t = {
    en: {
      title: 'Keyboard Shortcuts',
      close: 'Close',
      subtitle: 'Speed up your workflow with these keyboard shortcuts',
    },
    uk: {
      title: 'Клавіатурні скорочення',
      close: 'Закрити',
      subtitle: 'Прискорте свою роботу за допомогою цих клавіатурних скорочень',
    },
  }[language];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p className="shortcuts-subtitle">{t.subtitle}</p>

          <div className="shortcuts-grid">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="shortcut-item">
                <span className="shortcut-description">{shortcut.description}</span>
                <kbd className="shortcut-keys">{getShortcutDisplay(shortcut)}</kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
