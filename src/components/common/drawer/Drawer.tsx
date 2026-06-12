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
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      title={title}
      styles={{
        header: {
          borderBottom: '1px solid var(--border-subtle, #e8e2dc)',
          padding: '16px 20px',
        },
        body: {
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {children}
    </Drawer>
  );
}
