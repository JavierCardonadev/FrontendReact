import * as React from "react";
import { Meta, StoryFn } from '@storybook/react';
import Icomons from 'shared/src/ui/icons/IcomonsComponent'; // Ajusta la ruta si es necesario

export default {
  title: 'Components/Icomons',
  component: Icomons,
  argTypes: {
    icon: { control: 'text' }, // Control de texto para el nombre del ícono
    size: { control: 'number' }, // Control numérico para el tamaño
    color: { control: 'color' } // Control para seleccionar el color
  }
} as Meta;

// Plantilla base para las historias
const Template: StoryFn<typeof Icomons> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
    <Icomons {...args} onClick={() => alert(`Icon clicked: ${args.icon}`)} />
  </div>
);

// Historia principal con valores predeterminados
export const Default = Template.bind({});
Default.args = {
  icon: 'home', // Nombre del icono, asumiendo que está en `selection.json`
  size: 24,
  color: 'black'
};

// Historia con variantes de tamaño, color y eventos
export const Variants = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <Icomons icon="home" size={24} color="black" />
        <Icomons icon="home" size={40} color="blue" />
        <Icomons icon="home" size={56} color="red" onClick={() => alert('Icon clicked!')} />
        <Icomons icon="search" size={32} color="green" />
        <Icomons icon="settings" size={48} color="purple" />
    </div>
);
