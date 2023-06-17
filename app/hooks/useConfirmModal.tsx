import { create } from 'zustand';

interface ConfirmModalProps {
  isOpen: boolean,
  message: string,
  onOpen: () => void,
  isConfirm: (message: string, confirmColor?: string) => Promise<boolean>,
  onConfirm: () => void,
  onCancel: () => void,
  confirmColor: string,
}

const useConfirmModal = create<ConfirmModalProps>((set) => ({
  isOpen: false,
  message: '',
  confirmColor: '#EB5757',
  onOpen: () => set({ isOpen: true }),
  onConfirm: () => { },
  onCancel: () => { },
  isConfirm: (message: string, confirmColor?: string) => {
    return new Promise<boolean>((resolve) => {
      set({
        message: message,
        confirmColor: confirmColor || '#EB5757',
        isOpen: true,
        onCancel: () => {
          set({ isOpen: false });
          resolve(false);
        },
        onConfirm: () => {
          set({ isOpen: false });
          resolve(true);
        },
      });
    });
  },
}));

export default useConfirmModal;