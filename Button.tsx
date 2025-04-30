import classNames from 'classnames';
import { Button as FdButton } from 'fundamental-react/lib/Button';
import Counter from 'fundamental-react/lib/Counter/Counter';

import { Props } from './props';

import './Button.scss';

function Button({ onClick, dataCy, compact, className, options, glyph, selected, disabled, content, type, iconBeforeText, hiddenBorder, style, notificationValue }: Props) {
  return (
    <FdButton
      data-cy={dataCy}
      className={classNames(className, [{ 'brn--button-no-border': hiddenBorder, 'brn--button-icon': !content }])}
      option={options}
      compact={compact}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
      type={type}
      glyph={glyph}
      iconBeforeText={iconBeforeText}
      style={style}
    >
      {content}
      {!!notificationValue && (
        <Counter className="brn--button-icon-badge" notification>
          {notificationValue}
        </Counter>
      )}
    </FdButton>
  );
}

export default Button;
