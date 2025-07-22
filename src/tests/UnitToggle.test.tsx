import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UnitToggle from '../Component/UnitToggle';

describe('UnitToggle Component', () => {
  it('renders both °C and °F buttons', () => {
    render(<UnitToggle unit="C" onToggle={() => {}} />);
    expect(screen.getByText('°C')).toBeInTheDocument();
    expect(screen.getByText('°F')).toBeInTheDocument();
  });

  it('highlights the active unit button (C)', () => {
    render(<UnitToggle unit="C" onToggle={() => {}} />);
    const cBtn = screen.getByText('°C');
    const fBtn = screen.getByText('°F');
    expect(cBtn.className).toMatch(/active/);
    expect(fBtn.className).not.toMatch(/active/);
  });

  it('highlights the active unit button (F)', () => {
    render(<UnitToggle unit="F" onToggle={() => {}} />);
    const cBtn = screen.getByText('°C');
    const fBtn = screen.getByText('°F');
    expect(fBtn.className).toMatch(/active/);
    expect(cBtn.className).not.toMatch(/active/);
  });

  it('calls onToggle with "C" when °C button is clicked', () => {
    const onToggleMock = jest.fn();
    render(<UnitToggle unit="F" onToggle={onToggleMock} />);
    fireEvent.click(screen.getByText('°C'));
    expect(onToggleMock).toHaveBeenCalledWith('C');
  });

  it('calls onToggle with "F" when °F button is clicked', () => {
    const onToggleMock = jest.fn();
    render(<UnitToggle unit="C" onToggle={onToggleMock} />);
    fireEvent.click(screen.getByText('°F'));
    expect(onToggleMock).toHaveBeenCalledWith('F');
  });
});