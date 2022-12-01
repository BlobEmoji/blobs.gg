export interface SettingsDialogProps {
    open: boolean;
    onClose: (toggle: boolean) => void;
    handleReload: (int: number) => void;
}
