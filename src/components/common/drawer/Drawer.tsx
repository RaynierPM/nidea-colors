import { Drawer } from 'antd';
import React from 'react';

type DrawerProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
};

export default function DrawerComponent({
  children,
  open,
  onClose,
  title,
}: DrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} placement="right" title={title}>
      {children}
    </Drawer>
  );
}
