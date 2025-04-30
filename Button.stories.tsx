import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { storyWithMultipleComponentsWrapper } from '../../../tools';
import { ButtonOption, ButtonType } from '../enums';
import Button from './Button';
import { testButtonNoBorder, testDefaultButton } from './Button.test';
import { Props } from './props';

type Story = StoryObj<typeof Button>


const meta = {
  title: 'Components/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    dataCy: { control: 'text' },
    onClick: {
      table: { disable: true },
    },
    selected: { control: 'boolean' },
    hiddenBorder: { control: 'boolean' },
    className: { control: 'text' },
    glyph: { control: 'text' },
    compact: { control: 'boolean' },
    options: {
      control: { type: 'check' },
    },
    style: { table: { disable: true } },
    notificationValue: { control: 'text' },
  },
  args: {
    dataCy: 'button',
    onClick: fn(),
    selected: false,
    hiddenBorder: false,
    className: '',
    glyph: '',
    notificationValue: '',
  },
} satisfies Meta<typeof Button>;
export default meta;


export const Default: Story = {
  args: {
    content: 'Button',
    options: ButtonOption.EMPHASIZED,
    compact: false,
    disabled: false,
    iconBeforeText: false,
    type: ButtonType.STANDARD,
    onClick: fn(),
  },
  play: testDefaultButton,
};

export const NoBorder: Story = {
  args: {
    glyph: 'overflow',
    type: ButtonType.STANDARD,
    hiddenBorder: true,
  },
  play: testButtonNoBorder,
};

export const Primary: Story = {
  args: {
    content: 'Button',
    options: ButtonOption.EMPHASIZED,
    compact: false,
    disabled: false,
    iconBeforeText: false,
    type: ButtonType.STANDARD,
    onClick: fn(),
  },
};

export const WithNotification: Story = {
  render: storyWithMultipleComponentsWrapper([
    <Button {...meta.args as Props} glyph="menu" notificationValue={10} />,
    <Button {...meta.args as Props} content="Button" notificationValue={15} />,
  ]),
};



/**
 * Buttons can be displayed with an icon before or after the text
 */
export const WithIcon: Story = {
  render: storyWithMultipleComponentsWrapper([
    <Button {...meta.args as Props} content="Button" glyph="edit" iconBeforeText />,
    <Button {...meta.args as Props} content="Button" glyph="edit" />,
    <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Compact" glyph="filter" className="brn--button-grey-compact" compact iconBeforeText />,
    <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Compact" glyph="filter" className="brn--button-grey-compact" compact />,
  ]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[0]);
    // detect style
    const style = getComputedStyle(buttons[0]);
    expect(style.color).toBe('rgb(8, 84, 160)');
  },
};


export const Disabled: Story = {
  render: storyWithMultipleComponentsWrapper([
    <Button {...meta.args as Props} options={ButtonOption.EMPHASIZED} disabled content="Button" />,
    <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Button" disabled />,
    <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Button" className="brn--button-grey-compact" compact disabled />,
  ]),
};

export const ButtonTypes: Story = {
  render: storyWithMultipleComponentsWrapper(
    [
      <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Standard" />,
      <Button {...meta.args as Props} type={ButtonType.NEGATIVE} content="Negative" />,
      <Button {...meta.args as Props} type={ButtonType.ATTENTION} content="Attention" />,
      <Button {...meta.args as Props} type={ButtonType.POSITIVE} content="Positive" />,
      <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Compact" className="brn--button-grey-compact" compact />,

      <Button {...meta.args as Props} options={ButtonOption.TRANSPARENT} type={ButtonType.STANDARD} content="Standard" />,
      <Button {...meta.args as Props} options={ButtonOption.TRANSPARENT} type={ButtonType.NEGATIVE} content="Negative" />,
      <Button {...meta.args as Props} options={ButtonOption.TRANSPARENT} type={ButtonType.ATTENTION} content="Attention" />,
      <Button {...meta.args as Props} options={ButtonOption.TRANSPARENT} type={ButtonType.POSITIVE} content="Positive" />,
      <Button {...meta.args as Props} options={ButtonOption.TRANSPARENT} type={ButtonType.STANDARD} content="Compact" className="brn--button-grey-compact" compact />,

      <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Standard" selected />,
      <Button {...meta.args as Props} type={ButtonType.NEGATIVE} content="Negative" selected />,
      <Button {...meta.args as Props} type={ButtonType.ATTENTION} content="Attention" selected />,
      <Button {...meta.args as Props} type={ButtonType.POSITIVE} content="Positive" selected />,
      <Button {...meta.args as Props} type={ButtonType.STANDARD} content="Compact" className="brn--button-grey-compact" compact selected />,
    ],
    { numberOfColumns: 5 },
  ),
};
