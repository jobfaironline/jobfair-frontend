import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const StepComponent = (props) => {
  const { isFinish, children } = props;

  return (
    <div className={'step'}>
      <div className={'status'}>
        <FontAwesomeIcon icon={faCircleCheck} color={isFinish ? 'green' : 'gray'} size={'2x'} />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};
