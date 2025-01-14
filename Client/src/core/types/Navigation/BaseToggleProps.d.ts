export interface BaseToggleProps {
  isOpen?: boolean;
  isOpenCard?: boolean;
  toggleSidebar?: () => void;
  toggleCard?: () => void;
  onClick?: () => void;
}
