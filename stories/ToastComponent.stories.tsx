import * as React from "react";
import { Meta, StoryFn } from '@storybook/react';
import { Toast, showToast } from 'shared/src/ui/toastify'; // Asegúrate de ajustar la ruta si es necesario

// Configuración de Storybook para el componente Toast
export default {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    controls: { expanded: true }
  }
} as Meta;

// Plantilla base para renderizar Toast
const Template: StoryFn = () => (
  <>
    <Toast />
    <button
      onClick={() => showToast('Hello from Storybook!', { type: 'success' })}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        margin: '10px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      Show Success Toast
    </button>
    <button
      onClick={() => showToast('Oops! Something went wrong.', { type: 'error' })}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        margin: '10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      Show Error Toast
    </button>
  </>
);

// Historia principal para probar el Toast y las notificaciones
export const Default = Template.bind({});